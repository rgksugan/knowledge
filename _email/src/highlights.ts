import { PathLike } from "fs";
import fs from 'fs/promises';
import { marked } from 'marked';

import { Highlight } from "./types";

// Function to read a specific section from a Markdown file
const readMarkdownSection = async (filePath: string, sectionTitle: string): Promise<Highlight[] | null> => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const tokens = marked.lexer(data);

        let capture = false;
        let sectionContent: Highlight[] = [];

        const bookTitle = tokens?.find((token) => token.type === "heading" && token.depth === 1)?.text;

        for (const token of tokens) {
            if (token.type === 'heading' && token.depth === 2 && token.text === sectionTitle) {
                capture = true;
                continue;
            }
            if (capture) {
                if (token.type === 'heading' && token.depth === 2) {
                    break;
                }
                const highlights = token.items?.map(item => ({ bookTitle: bookTitle, content: item.text }));
                if (highlights) {
                    sectionContent = [...sectionContent, ...highlights];
                }
            }
        }

        return sectionContent?.filter(Boolean) || null;
    } catch (err) {
        console.error('Error reading the markdown file:', err);
        return null;
    }
}

const highlightsParser = async (
    path: PathLike
): Promise<Highlight[] | null> => {
    const sectionTitle = 'Highlights';

    const highLights = await readMarkdownSection(path.toString(), sectionTitle);

    return highLights;
};

export const getRandomHighlight = async (path: PathLike): Promise<Highlight | null> => {
    const allHighlights = await highlightsParser(path);

    if (allHighlights && allHighlights.length > 0) {
        const randomHighlightIndex = Math.floor(Math.random() * allHighlights.length);
        return allHighlights[randomHighlightIndex]!;
    }

    return null;
};
