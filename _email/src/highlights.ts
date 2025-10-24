import { PathLike } from "fs";
import fs from "fs/promises";
import { marked } from "marked";

import { Highlight } from "./types";

// Function to read a specific section from a Markdown file
const readMarkdownSection = async (
  filePath: string,
  sectionTitle: string
): Promise<Highlight[] | null> => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const tokens = marked.lexer(data);
    console.log(`Parsing ${filePath}: found ${tokens.length} tokens`);

    let capture = false;
    let sectionContent: Highlight[] = [];

    const bookTitle = tokens?.find(
      (token) => token.type === "heading" && token.depth === 1
    )?.text;
    console.log(`Book title: "${bookTitle}"`);

    for (const token of tokens) {
      if (
        token.type === "heading" &&
        token.depth === 2 &&
        token.text === sectionTitle
      ) {
        capture = true;
        continue;
      }
      if (capture) {
        if (token.type === "heading" && token.depth === 2) {
          break;
        }

        let highlights: Highlight[];
        if (token.items) {
          highlights = token.items?.map((item) => ({
            bookTitle,
            content: item.text,
          }));
        } else {
          highlights = [{ bookTitle, content: token.text }];
        }

        if (highlights) {
          sectionContent = [...sectionContent, ...highlights];
        }
      }
    }

    const filteredContent = sectionContent?.filter(Boolean) || null;
    console.log(`Found ${filteredContent?.length || 0} highlights in ${filePath}`);
    return filteredContent;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return null;
  }
};

const highlightsParser = async (
  path: PathLike
): Promise<Highlight[] | null> => {
  const sectionTitle = "Highlights";

  const highLights = await readMarkdownSection(path.toString(), sectionTitle);

  return highLights;
};

export const getRandomHighlight = async (
  path: PathLike
): Promise<Highlight | null> => {
  const allHighlights = await highlightsParser(path);

  if (allHighlights && allHighlights.length > 0) {
    const randomHighlightIndex = Math.floor(
      Math.random() * allHighlights.length
    );
    const selected = allHighlights[randomHighlightIndex]!;
    console.log(`Selected highlight ${randomHighlightIndex + 1}/${allHighlights.length} from ${path}`);
    return selected;
  }

  console.log(`No highlights available in ${path}`);
  return null;
};
