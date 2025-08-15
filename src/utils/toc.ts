import type { TocHeading } from '~/types/toc';

/**
 * Extracts headings from markdown content string
 * @param content - The markdown content
 * @returns Array of flat heading objects
 */
export function extractHeadings(
  content: string,
): Pick<TocHeading, 'depth' | 'text' | 'slug'>[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Pick<TocHeading, 'depth' | 'text' | 'slug'>[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();

    // Generate slug similar to rehype-slug
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

    headings.push({ depth, slug, text });
  }

  return headings;
}

/**
 * Generates hierarchical TOC structure from flat headings array
 */
export function generateToc(
  headings: readonly Pick<TocHeading, 'depth' | 'text' | 'slug'>[],
  minLevel = 1,
  maxLevel = 3,
): TocHeading[] {
  // Filter headings within specified levels
  const filteredHeadings = headings.filter(
    (heading) => heading.depth >= minLevel && heading.depth <= maxLevel,
  );

  if (filteredHeadings.length === 0) {
    return [];
  }

  const stack: TocHeading[] = [];
  const result: TocHeading[] = [];

  for (const heading of filteredHeadings) {
    const newHeading: TocHeading = {
      depth: heading.depth,
      slug: heading.slug,
      text: heading.text,
      children: [],
    };

    // Remove items from stack that are at same or deeper level
    while (
      stack.length > 0 &&
      stack[stack.length - 1].depth >= newHeading.depth
    ) {
      stack.pop();
    }

    // If stack is empty, add to root level
    if (stack.length === 0) {
      result.push(newHeading);
    } else {
      // Add as child to the last item in stack
      const parent = stack[stack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(newHeading);
    }

    stack.push(newHeading);
  }

  return result;
}

/**
 * Extracts TOC from markdown content and returns hierarchical structure
 * @param content - The markdown content
 * @param minLevel - Minimum heading level (default: 1)
 * @param maxLevel - Maximum heading level (default: 3)
 * @returns Nested TOC structure
 */
export function extractToc(
  content: string,
  minLevel = 1,
  maxLevel = 3,
): TocHeading[] {
  const headings = extractHeadings(content);
  return generateToc(headings, minLevel, maxLevel);
}
