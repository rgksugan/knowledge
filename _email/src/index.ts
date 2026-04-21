import fs from "fs/promises";
import path from "path";
import slugify from "slugify";

import { NO_OF_HIGHLIGHTS } from "./env";
import { getRandomHighlight } from "./highlights";
import { email } from "./mail";
import { Highlight } from "./types";

const SITE_BASE_URL = "https://rgksugan.github.io/knowledge";

const run = async () => {
  console.log(`[${new Date().toISOString()}] Starting email script`);

  // Directory to look for book notes
  const directoryPath = "../3-resources/books/";

  // Collect all markdown files from all subdirectories
  const fileList: { file: string; subdir: string }[] = [];

  const items = await fs.readdir(directoryPath);
  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stat = await fs.stat(itemPath);
    if (stat.isDirectory()) {
      try {
        const files = await fs.readdir(itemPath);
        for (const file of files) {
          const filePath = path.join(itemPath, file);
          const fileStat = await fs.stat(filePath);
          if (
            fileStat.isFile() &&
            file.endsWith(".md") &&
            file !== "Index.md"
          ) {
            fileList.push({ file, subdir: item });
          }
        }
      } catch (error) {
        console.log(`Could not read subdirectory ${item}:`, error);
      }
    }
  }

  if (fileList.length === 0) {
    console.log("No markdown files found in subdirectories.");
    return;
  }

  console.log(
    `Processing ${fileList.length} markdown files from subdirectories`
  );

  const highLightsToMail: Highlight[] = [];
  const maxAttempts = fileList.length * 2; // Prevent infinite loop
  let attempts = 0;

  while (highLightsToMail.length < NO_OF_HIGHLIGHTS && attempts < maxAttempts) {
    attempts++;

    // Select a quote from a random file
    const randomFileIndex = Math.floor(Math.random() * fileList.length);
    const { file: randomFile, subdir } = fileList[randomFileIndex]!;
    const filePath = path.join(directoryPath, subdir, randomFile);
    console.log(`Attempting to get highlight from: ${subdir}/${randomFile}`);

    const highLight = await getRandomHighlight(filePath);

    if (highLight && highLight.content) {
      const slugifiedName = slugify(path.parse(randomFile).name);
      const bookLink = `${SITE_BASE_URL}/3-resources/books/${subdir}/${slugifiedName}`;
      console.log(
        `✓ Got highlight from ${subdir}/${randomFile}: "${highLight.content?.substring(
          0,
          50
        )}..."`
      );
      highLightsToMail.push({ ...highLight, bookLink });
    } else {
      console.log(`✗ No highlight found in ${subdir}/${randomFile}`);
    }
  }

  if (attempts >= maxAttempts) {
    console.log(
      `Reached maximum attempts (${maxAttempts}). Proceeding with ${highLightsToMail.length} highlights.`
    );
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
