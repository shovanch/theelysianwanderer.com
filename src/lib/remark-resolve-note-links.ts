import path from 'path';
import type { Root, Link } from 'mdast';
import { visit } from 'unist-util-visit';
import { getNotesManifest } from '~/utils/notes-manifest';

type ResolveNoteLinksOptions = {
  currentPath: string; // e.g., "chess/index.md"
  subdirectory: string; // e.g., "notes"
};

/**
 * Remark plugin that transforms relative .md links to canonical routes
 * [Hello World 2](Hello%20World%202.md) → [Hello World 2](/notes/chess/music-theory-notes-2)
 */
export function remarkResolveNoteLinks(options: ResolveNoteLinksOptions) {
  const { currentPath, subdirectory } = options;

  return (tree: Root) => {
    const manifest = getNotesManifest();

    // Get the directory of the current file
    const currentDir = path.dirname(currentPath);

    visit(tree, 'link', (node: Link) => {
      const url = node.url;

      // Only process .md links (could be URL-encoded)
      if (!url.endsWith('.md') && !url.includes('.md')) {
        return;
      }

      // Decode URL encoding (Hello%20World%202.md → Hello World 2.md)
      let decodedUrl: string;
      try {
        decodedUrl = decodeURIComponent(url);
      } catch {
        decodedUrl = url;
      }

      // Only process if it ends with .md
      if (!decodedUrl.endsWith('.md')) {
        return;
      }

      // Resolve relative path
      // If currentPath is "chess/index.md" and link is "Hello World 2.md"
      // Result should be "chess/Hello World 2.md"
      let targetRelativePath: string;
      if (decodedUrl.startsWith('./')) {
        targetRelativePath = path.join(currentDir, decodedUrl.slice(2));
      } else if (decodedUrl.startsWith('../')) {
        targetRelativePath = path.join(currentDir, decodedUrl);
      } else if (!decodedUrl.includes('/')) {
        // Simple filename in same directory
        targetRelativePath =
          currentDir === '.' ? decodedUrl : path.join(currentDir, decodedUrl);
      } else {
        // Already has path
        targetRelativePath = decodedUrl;
      }

      // Normalize path separators
      targetRelativePath = targetRelativePath.replace(/\\/g, '/');

      // Find the note in the manifest by relativePath
      const targetEntry = manifest.entries.find(
        (entry) => entry.relativePath === targetRelativePath,
      );

      if (targetEntry) {
        // Replace with canonical route
        node.url = `/${subdirectory}/${targetEntry.canonicalRoute}`;
      }
    });
  };
}
