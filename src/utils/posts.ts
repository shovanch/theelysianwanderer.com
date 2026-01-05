import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import readingDuration from 'reading-duration';
import { isDevEnv } from '~/utils/is-dev-env';

// Function to rewrite relative image paths to use public directory
function processMarkdownImages(content: string, subdirectory: string): string {
  // Replace relative image paths with public URLs
  return content
    .replace(
      /!\[([^\]]*)\]\(\.\/assets\/([^)]+)\)/g,
      `![$1](/images/content/${subdirectory}/$2)`,
    )
    .replace(
      /!\[([^\]]*)\]\(assets\/([^)]+)\)/g,
      `![$1](/images/content/${subdirectory}/$2)`,
    )
    .replace(
      /!\[([^\]]*)\]\(([^/]+)\/assets\/([^)]+)\)/g,
      `![$1](/images/content/$2/$3)`,
    );
}

/** Available post paths in file system and navigation. Add additional post paths here. */
export type Subdirectory = 'posts' | 'travels' | 'stories' | 'reads' | 'notes';

/** Categories available to the filterPostsByCategory function. */
export type PostCategory = 'posts' | 'stories' | 'travels' | 'reads' | 'notes';

export type PostMeta = {
  publishedAt: string;
  updatedAt?: string;
  title: string;
  summary?: string;
  tags: string[];
  coverImage?: string;
  category: PostCategory;
  isPublished?: boolean;
  published?: boolean;
  readingTime: string;
  showToc?: boolean;
  slug?: string;
  type?: string;
  author?: string;
  readingStartedAt?: string;
  readingCompletedAt?: string;
};

export type PostData = {
  meta: PostMeta;
  slug: string;
  subdirectory: Subdirectory;
  content: string;
};

function getPostsDirectory(subdirectory: Subdirectory) {
  const root = process.cwd();
  return path.join(root, `src/content/${subdirectory}`);
}

export function getFilenames(subdirectory: Subdirectory) {
  const postsDirectory = getPostsDirectory(subdirectory);
  // return globSync([postsDirectory + '/**/*.md', postsDirectory + '/**/*.mdx'], {
  //   absolute: false,
  //   cwd: postsDirectory,
  // })

  return globSync(
    [
      postsDirectory + '/**/*.md',
      postsDirectory + '/**/*.mdx',
      postsDirectory + '/**/page.mdx',
    ],
    {
      absolute: false,
      cwd: postsDirectory,
    },
  );
}

export function sortPostsByDate(post1: PostData, post2: PostData): number {
  // Get the most recent date for each post (updatedAt takes priority over publishedAt)
  const getRecentDate = (post: PostData) => {
    const updatedAt = post.meta.updatedAt;
    const publishedAt = post.meta.publishedAt;

    // Use updatedAt if available, otherwise fall back to publishedAt
    const dateToUse = updatedAt || publishedAt;
    return new Date(dateToUse).getTime();
  };

  const date1 = getRecentDate(post1);
  const date2 = getRecentDate(post2);

  // Sort in descending order (most recent first)
  return date2 - date1;
}

export function getPosts(
  subdirectory: Subdirectory,
  maxItems?: number,
): PostData[] {
  const postsDirectory = getPostsDirectory(subdirectory);

  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Directory not found: ${postsDirectory}`);
    return [];
  }

  const allFiles = globSync([path.join(postsDirectory, '*.md')]);

  // First pass: Read only frontmatter for sorting
  const fileInfos: {
    filePath: string;
    publishedAt: string;
    updatedAt?: string;
  }[] = [];

  for (const filePath of allFiles) {
    try {
      const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(markdownWithMeta);

      // Validate required fields
      if (!data.title || !data.publishedAt) {
        continue;
      }

      // Skip unpublished content in production - requires explicit isPublished: true
      if (!isDevEnv && data.isPublished !== true) {
        continue;
      }

      fileInfos.push({
        filePath,
        publishedAt:
          data.publishedAt instanceof Date
            ? data.publishedAt.toISOString().split('T')[0]
            : data.publishedAt,
        updatedAt: data.updatedAt,
      });
    } catch (error) {
      console.warn(`Error reading frontmatter from ${filePath}:`, error);
      continue;
    }
  }

  // Sort by date (updatedAt takes priority over publishedAt) and limit if needed
  const sortedFileInfos = fileInfos.sort((a, b) => {
    const getRecentDate = (item: {
      publishedAt: string;
      updatedAt?: string;
    }) => {
      const dateToUse = item.updatedAt || item.publishedAt;
      return new Date(dateToUse).getTime();
    };

    return getRecentDate(b) - getRecentDate(a);
  });

  const filesToProcess = maxItems
    ? sortedFileInfos.slice(0, maxItems)
    : sortedFileInfos;

  // Second pass: Fully process only the files we need
  const posts: PostData[] = [];

  for (const { filePath } of filesToProcess) {
    try {
      const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(markdownWithMeta);

      // Process markdown to fix image paths
      const processedContent = processMarkdownImages(content, subdirectory);

      const readingTime = readingDuration(processedContent, {
        emoji: false,
      });

      const fileSlug =
        data.slug || path.basename(filePath, path.extname(filePath));

      const postMeta: PostMeta = {
        publishedAt:
          data.publishedAt instanceof Date
            ? data.publishedAt.toISOString().split('T')[0]
            : data.publishedAt,
        updatedAt: data?.updatedAt,
        title: data.title,
        summary: data.summary || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage,
        category: data.category ?? data.type ?? subdirectory,
        isPublished: data.isPublished ?? data.published ?? true,
        published: data.published ?? data.isPublished ?? true,
        readingTime,
        slug: fileSlug,
        type: data.type,
        showToc: data.showToc,
        author: data.author,
        readingStartedAt: data.readingStartedAt,
        readingCompletedAt: data.readingCompletedAt,
      };

      posts.push({
        meta: postMeta,
        content: processedContent,
        slug: fileSlug,
        subdirectory,
      });
    } catch (error) {
      console.warn(`Error processing file ${filePath}:`, error);
      continue;
    }
  }

  return posts.sort(sortPostsByDate);
}

export function getPost(
  subdirectory: Subdirectory,
  slugOrFilePath: string[],
): PostData {
  const slug = slugOrFilePath.join('/');
  const postsDirectory = getPostsDirectory(subdirectory);

  // For the new vault structure, try to find files by slug in frontmatter
  const allFiles = globSync([
    path.join(postsDirectory, '*.md'),
    path.join(postsDirectory, '*.mdx'),
    path.join(postsDirectory, '**/page.mdx'), // Keep support for old structure
  ]);

  for (const filePath of allFiles) {
    try {
      const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(markdownWithMeta);

      // Check if this file matches the requested slug
      const fileSlug =
        data.slug || path.basename(filePath, path.extname(filePath));

      if (fileSlug === slug) {
        // Process markdown to fix image paths
        const processedContent = processMarkdownImages(content, subdirectory);

        const readingTime = readingDuration(processedContent, {
          emoji: false,
        });

        const postMeta: PostMeta = {
          publishedAt:
            data.publishedAt instanceof Date
              ? data.publishedAt.toISOString().split('T')[0]
              : data.publishedAt,
          updatedAt: data?.updatedAt,
          title: data.title,
          summary: data.summary || '',
          tags: data.tags || [],
          coverImage: data.coverImage,
          // You can default these data imports to ensure they are always defined
          category: data.category ?? data.type ?? subdirectory,
          isPublished: data.isPublished ?? data.published ?? true,
          published: data.published ?? data.isPublished ?? true,
          readingTime,
          slug: fileSlug,
          type: data.type,
          showToc: data.showToc,
          author: data.author,
          readingStartedAt: data.readingStartedAt,
          readingCompletedAt: data.readingCompletedAt,
        };

        return {
          meta: postMeta,
          content: processedContent,
          slug: fileSlug,
          subdirectory,
        };
      }
    } catch (error) {
      console.warn(`Error processing file ${filePath}:`, error);
      continue;
    }
  }

  throw new Error(`No content file found for slug: ${slug} in ${subdirectory}`);
}

export function filterPostsByCategory(
  posts: PostData[],
  category: PostCategory,
): PostData[] {
  return posts.filter((post) => {
    return post.meta.category === category;
  });
}
