import fs from "fs/promises";
import path from "path";

import { NO_OF_HIGHLIGHTS } from "./env";
import { getRandomHighlight } from "./highlights";
import { email } from "./mail";
import { Highlight } from "./types";

const run = async () => {
  console.log(`[${new Date().toISOString()}] Starting email script`);

  // Directory to look for book notes
  const directoryPath = "../3-resources/books/";
  const files = await fs.readdir(directoryPath);
  console.log(`Found ${files.length} items in directory`);

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
    console.log("No files found in the directory.");
    return;
  }

  console.log(`Processing ${fileList.length} markdown files`);

  const highLightsToMail: Highlight[] = [];

  while (highLightsToMail.length < NO_OF_HIGHLIGHTS) {
    // Select a quote from a random file
    const randomFileIndex = Math.floor(Math.random() * fileList.length);
    const randomFile = fileList[randomFileIndex];
    const filePath = path.join(directoryPath, randomFile!);
    console.log(`Attempting to get highlight from: ${randomFile}`);

    const highLight = await getRandomHighlight(filePath);

    if (highLight && highLight.content) {
      console.log(
        `✓ Got highlight from ${randomFile}: "${highLight.content?.substring(
          0,
          50
        )}..."`
      );
      highLightsToMail.push(highLight);
    } else {
      console.log(`✗ No highlight found in ${randomFile}`);
    }
  }

  console.log(`Collected ${highLightsToMail.length} highlights for email`);
  highLightsToMail.forEach((h, i) => {
    console.log(
      `Highlight ${i + 1}: Book="${
        h.bookTitle
      }", Content="${h.content?.substring(0, 30)}..."`
    );
  });

  await email(highLightsToMail);
};

run();
