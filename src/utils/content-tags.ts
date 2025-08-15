import { PostData } from './posts';

// Get unique tags and counts from posts
export function getTagsFromPosts(posts: PostData[]): [string, number][] {
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.meta.tags) {
      post.meta.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => [tag, count] as [string, number])
    .sort((a, b) => b[1] - a[1]); // Sort by count descending
}

// Filter posts by tag
export function filterPostsByTag(posts: PostData[], tag: string): PostData[] {
  return posts.filter((post) => post.meta.tags && post.meta.tags.includes(tag));
}

// Utility function to convert tag to readable format
export function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
