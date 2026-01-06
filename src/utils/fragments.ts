import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { isDevEnv } from '~/utils/is-dev-env';

export type FragmentData = {
  id: string;
  content: string;
  publishedAt?: string;
  updatedAt?: string;
  isPublished: boolean;
  fragmentCategory?: string;
};

function getFragmentsDirectory() {
  const root = process.cwd();
  return path.join(root, 'src/content/fragments');
}

export function getValidDate(
  dateValue: string | undefined,
): string | undefined {
  if (!dateValue) return undefined;

  // Check if it's a malformed date
  if (dateValue.startsWith('0002-') || dateValue.length < 8) {
    return undefined;
  }

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return undefined;
    }
    return date.toISOString();
  } catch {
    return undefined;
  }
}

export function getFragments(): FragmentData[] {
  const fragmentsDirectory = getFragmentsDirectory();

  if (!fs.existsSync(fragmentsDirectory)) {
    console.warn(`Directory not found: ${fragmentsDirectory}`);
    return [];
  }

  const allFiles = globSync([path.join(fragmentsDirectory, '*.md')]);

  const fragments: FragmentData[] = [];

  for (const filePath of allFiles) {
    try {
      const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(markdownWithMeta);

      // Filter out system/hidden files
      const fileName = path.basename(filePath);
      if (fileName.startsWith('.')) {
        continue;
      }

      const isPublished = data.isPublished === true;

      // In production, only show published fragments - requires explicit isPublished: true
      if (!isDevEnv && !isPublished) {
        continue;
      }

      const id = path.basename(filePath, path.extname(filePath));

      fragments.push({
        id,
        content: content.trim(),
        publishedAt: data.publishedAt
          ? String(data.publishedAt).trim()
          : undefined,
        updatedAt: data.updatedAt ? String(data.updatedAt).trim() : undefined,
        isPublished,
        fragmentCategory: data.fragmentCategory
          ? String(data.fragmentCategory).trim()
          : undefined,
      });
    } catch (error) {
      console.warn(`Error reading fragment from ${filePath}:`, error);
      continue;
    }
  }

  // Sort by updatedAt or publishedAt, newest first
  return fragments.sort((a, b) => {
    const dateA = getValidDate(a.updatedAt) || getValidDate(a.publishedAt);
    const dateB = getValidDate(b.updatedAt) || getValidDate(b.publishedAt);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}

export function getFragmentCategories(
  fragments: FragmentData[],
): { category: string; count: number }[] {
  const categoryMap = new Map<string, number>();
  for (const f of fragments) {
    if (f.fragmentCategory) {
      categoryMap.set(
        f.fragmentCategory,
        (categoryMap.get(f.fragmentCategory) || 0) + 1,
      );
    }
  }
  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
