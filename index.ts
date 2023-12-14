import { insertImageFlipData } from "./src/imgflip";
import { ImgFlipResponse } from "./types/types";
import { sendSlackMessage } from "./src/slack";

async function main(): Promise<void> {
    try {
        const sucessfulInsert = await insertImageFlipData();
        
        if (!sucessfulInsert) {
            sendSlackMessage({ logString: "Failed to insert data!", status: "Failure", failure: true });
        }

        sendSlackMessage({ logString: "Completed Scraper!", status: "Success", failure: false });

    } catch (error) {
        console.error('Error inserting data:', error);
        sendSlackMessage({ logString: "Failed to insert data!", status: "Failure", failure: true });
    }
}

main().catch(
    err => console.error(err)
);