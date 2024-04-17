import fs from 'fs/promises';
import path from 'path';
import {env} from "$env/dynamic/private";
import {error} from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({params}) {
    if (!env.UPLOAD_FOLDER) {
        throw error(500, 'UPLOAD_FOLDER not provided as an environment variable');
    }

    const {imageName} = params;
    const filePath = path.resolve(path.join(env.UPLOAD_FOLDER, 'thumbnails'), imageName);

    try {
        const fileBuffer = await fs.readFile(filePath);
        return new Response(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });
    } catch (e) {
        console.warn(`Could not retrieve image ${imageName} for gallery`, e);
        throw error(404, 'Image not found');
    }
}
