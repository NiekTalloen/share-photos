import {error, fail, json} from '@sveltejs/kit';
import * as fs from 'fs';
import {unlinkSync} from 'fs';
import * as path from "path";
import {env} from '$env/dynamic/private';
import sharp from "sharp";

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    if (!env.UPLOAD_FOLDER) {
        throw error(500, 'UPLOAD_FOLDER not provided as an environment variable');
    }

    const formData = Object.fromEntries(await request.formData());
    console.debug("Received image: ", formData);

    if (fileNotProvided()) {
        return fail(400, {
            error: true,
            message: 'You must provide a file to upload'
        });
    }

    let saveName = await saveFileWithUniqueName(env.UPLOAD_FOLDER, formData.filepond);
    await transformAndSaveThumbnail(env.UPLOAD_FOLDER, "thumbnails", saveName);

    return json({
        name: saveName
    });

    function fileNotProvided() {
        return !(formData.filepond as File).name ||
            (formData.filepond as File).name === 'undefined';
    }
}

async function saveFileWithUniqueName(directory, fileToUpload) {
    let baseName = path.basename(fileToUpload.name, path.extname(fileToUpload.name));
    let extension = path.extname(fileToUpload.name);
    let newName = fileToUpload.name;
    let fullPath = path.join(directory, fileToUpload.name);
    let counter = 0;

    // Check if the file exists, and if so, find a new name
    while (fs.existsSync(fullPath)) {
        counter++;
        newName = `${baseName}_${counter}${extension}`;
        fullPath = path.join(directory, newName);
    }

    // Once a unique name is found (or if original didn't exist), write the file
    fs.writeFileSync(fullPath, Buffer.from(await fileToUpload.arrayBuffer()));

    console.log(`File saved as ${fullPath}`);

    return newName;
}

async function transformAndSaveThumbnail(originalImagesFolder, thumbnailFolderName, fileToTransformToThumbnail) {
    const maxWidth = 1024;
    const maxHeight = 1024;
    const outputDirectory = path.join(originalImagesFolder, thumbnailFolderName);

    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
    }

    sharp(path.join(originalImagesFolder, fileToTransformToThumbnail))
        .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
        })
        .rotate()
        .withMetadata()
        .jpeg({quality: 50, progressive: true})
        .webp({quality: 50})
        .toFile(path.join(outputDirectory, fileToTransformToThumbnail), err => {
            if (err) {
                console.error(`Error processing ${fileToTransformToThumbnail}: ${err}`);
            } else {
                console.debug(`Thumbnail created for ${fileToTransformToThumbnail}`);
            }
        });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}) {
    if (!env.UPLOAD_FOLDER) {
        throw error(500, 'UPLOAD_FOLDER not provided as an environment variable');
    }

    const fileName = (await request.json()).name;
    console.debug("DELETE", fileName)
    unlinkSync(`${env.UPLOAD_FOLDER}/${await fileName}`)
    return json({
        success: true
    });
}
