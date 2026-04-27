import fs from "fs/promises";
import path from "path";
import slugify from "slugify";

import { NO_OF_HIGHLIGHTS } from "./env";
import { getRandomHighlight } from "./highlights";
import { email } from "./mail";
import { Highlight } from "./types";

const SITE_BASE_URL = "https://rgksugan.github.io/knowledge";

const parseTags = async (filePath: string): Promise<string[]> => {
  const content = await fs.readFile(filePath, "utf8");
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];
  const tagsLine = fmMatch[1]!
    .split("\n")
    .find((line) => line.startsWith("tags:"));
  if (!tagsLine) return [];
  return tagsLine
    .replace("tags:", "")
    .split(",")
    .map((t) => t.trim().toLowerCase());
};

const run = async () => {
  console.log(`[${new Date().toISOString()}] Starting email script`);

  // Directory to look for book notes
  const directoryPath = "../3-resources/books/";

  // Collect all markdown files (both flat and in subdirectories)
  const fileList: { file: string; subdir: string; tags: string[] }[] = [];

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
            const tags = await parseTags(filePath);
            fileList.push({ file, subdir: item, tags });
          }
        }
      } catch (error) {
        console.log(`Could not read subdirectory ${item}:`, error);
      }
    } else if (stat.isFile() && item.endsWith(".md") && item !== "Index.md") {
      const tags = await parseTags(itemPath);
      fileList.push({ file: item, subdir: "", tags });
    }
  }

  if (fileList.length === 0) {
    console.log("No markdown files found.");
    return;
  }

  const techFiles = fileList.filter((f) => f.tags.includes("technology"));
  console.log(
    `Processing ${fileList.length} markdown files (${techFiles.length} with technology tag)`
  );

  const highLightsToMail: Highlight[] = [];
  const maxAttempts = fileList.length * 2; // Prevent infinite loop
  let attempts = 0;

  const pickHighlight = async (
    pool: typeof fileList
  ): Promise<Highlight | null> => {
    const randomFileIndex = Math.floor(Math.random() * pool.length);
    const { file: randomFile, subdir } = pool[randomFileIndex]!;
    const filePath = subdir
      ? path.join(directoryPath, subdir, randomFile)
      : path.join(directoryPath, randomFile);
    const displayName = subdir ? `${subdir}/${randomFile}` : randomFile;
    console.log(`Attempting to get highlight from: ${displayName}`);

    const highLight = await getRandomHighlight(filePath);

    if (highLight && highLight.content) {
      const slugifiedName = slugify(path.parse(randomFile).name);
      const bookLink = subdir
        ? `${SITE_BASE_URL}/3-resources/books/${subdir}/${slugifiedName}`
        : `${SITE_BASE_URL}/3-resources/books/${slugifiedName}`;
      console.log(
        `✓ Got highlight from ${displayName}: "${highLight.content?.substring(
          0,
          50
        )}..."`
      );
      return { ...highLight, bookLink };
    }
    console.log(`✗ No highlight found in ${displayName}`);
    return null;
  };

  // Guarantee at least one technology highlight
  if (techFiles.length > 0) {
    let techAttempts = 0;
    while (highLightsToMail.length === 0 && techAttempts < techFiles.length * 2) {
      techAttempts++;
      const highlight = await pickHighlight(techFiles);
      if (highlight) highLightsToMail.push(highlight);
    }
    if (highLightsToMail.length === 0) {
      console.log("Could not find a technology highlight, continuing with random picks.");
    }
  } else {
    console.log("No technology-tagged books found, skipping technology guarantee.");
  }

  // Fill remaining slots from all books
  while (highLightsToMail.length < NO_OF_HIGHLIGHTS && attempts < maxAttempts) {
    attempts++;
    const highlight = await pickHighlight(fileList);
    if (highlight) highLightsToMail.push(highlight);
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
