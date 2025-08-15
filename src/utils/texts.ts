import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getTextsDirectory() {
  const root = process.cwd();
  return path.join(root, 'src/content/texts');
}

export function getTextContent(filename: string): string {
  const textsDirectory = getTextsDirectory();
  const filePath = path.join(textsDirectory, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Text file not found: ${filePath}`);
  }

  const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(markdownWithMeta);

  return content.trim();
}
