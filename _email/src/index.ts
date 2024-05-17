import fs from "fs/promises";
import path from "path";

import { NO_OF_HIGHLIGHTS } from "./env";
import { getRandomHighlight } from "./highlights";
import { email } from "./mail";
import { Highlight } from "./types";

const run = async () => {
    // Directory to look for book notes
    const directoryPath = "../3-resources/books/";
    const files = await fs.readdir(directoryPath);

    // Filter out non-files (like directories)
    const fileList = [];
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
            fileList.push(file);
        }
    }

    if (fileList.length === 0) {
        console.log('No files found in the directory.');
        return;
    }

    const highLightsToMail: Highlight[] = [];

    while (highLightsToMail.length < NO_OF_HIGHLIGHTS) {
        // Select a quote from a random file
        const randomFileIndex = Math.floor(Math.random() * fileList.length);
        const randomFile = fileList[randomFileIndex];
        const filePath = path.join(directoryPath, randomFile!);
        const highLight = await getRandomHighlight(filePath);

        if (highLight) {
            highLightsToMail.push(highLight);
        }
    }

    await email(highLightsToMail);
};

run();
