import {promises as fs} from 'fs';
import {env} from "$env/dynamic/private";
import {error} from "@sveltejs/kit";
import * as path from "path";
import sharp from "sharp";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    if (!env.UPLOAD_FOLDER) {
        throw error(500, 'UPLOAD_FOLDER not provided as an environment variable');
    }

    const folder = path.join(env.UPLOAD_FOLDER, 'thumbnails');
    const files = await fs.readdir(folder) || [];
    const imageNames = files.filter(file => /\.(jpg|jpeg|png|heic)$/i.test(file));
    const imageDetailsPromises = imageNames.map(async (file) => {
        const filePath = path.join(folder, file);
        try {
            const metadata = await sharp(filePath).metadata();
            return {
                name: file,
                width: metadata.width,
                height: metadata.height
            };
        } catch (error) {
            console.error(`Error reading metadata from ${file}: ${error}`);
            return {
                name: file
            }
        }
    });
    const imageNamesAndSizes = await Promise.all(imageDetailsPromises);

    return {
        imageNamesAndSizes
    };
}
