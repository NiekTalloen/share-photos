import {promises as fs} from 'fs';
import {env} from "$env/dynamic/private";
import {error} from "@sveltejs/kit";
import * as path from "path";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    if (!env.UPLOAD_FOLDER) {
        throw error(500, 'UPLOAD_FOLDER not provided as an environment variable');
    }

    const files = await fs.readdir(path.join(env.UPLOAD_FOLDER, 'thumbnails'));
    const images = files.filter(file => /\.(jpg|jpeg|png|heic)$/i.test(file));

    return {
        images
    };
}
