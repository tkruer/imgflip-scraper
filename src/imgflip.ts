import { ImgFlipResponse, Data, Meme  } from "../types/types";
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { ImgFlipMemes, imgFlipMemes } from '../db/schema';

export async function getImageFlipData(): Promise<ImgFlipResponse> {
    const req = await fetch("https://api.imgflip.com/get_memes");
    const data = await req.json();
    return data as ImgFlipResponse;
}

export async function insertImageFlipData(): Promise<boolean> {
    const data = await getImageFlipData() as ImgFlipResponse;
    const memes = data.data.memes;

    let allSuccessful = true;
    const client = createClient({
        url: process.env.TURSO_DB_URL!,
        authToken: process.env.TURSO_DB_TOKEN!,
    });
    
    const db = drizzle(client);

    for (const meme of memes) {        
        try {
            const insertImageFlipMeme = await db.insert(imgFlipMemes).values({
                memeID: meme.id,
                name: meme.name,
                url: meme.url,
                width: meme.width,
                height: meme.height,
                box_count: meme.box_count,
                captions: meme.captions
            }).execute();
        
            if (!insertImageFlipMeme) {
                allSuccessful = false;
                console.error('Failed to insert:', meme.id, meme.name, meme.url, meme.width, meme.height, meme.box_count, meme.captions);
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            allSuccessful = false;
        }
    }

    return allSuccessful;
}