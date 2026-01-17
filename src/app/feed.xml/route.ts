import { getPosts } from '~/utils/posts';
import { baseUrl } from '../sitemap';

export async function GET() {
  const allPosts = getPosts('posts');
  const allTravels = getPosts('travels');
  const allNotes = getPosts('notes');

  // Combine all content with correct URL prefixes
  const allItems = [
    ...allPosts.map((post) => ({ post, urlPrefix: 'posts' })),
    ...allTravels.map((post) => ({ post, urlPrefix: 'travels' })),
    ...allNotes.map((post) => ({ post, urlPrefix: 'notes' })),
  ];

  const itemsXml = allItems
    .sort((a, b) => {
      if (
        new Date(a.post.meta.publishedAt) > new Date(b.post.meta.publishedAt)
      ) {
        return -1;
      }
      return 1;
    })
    .map(
      ({ post, urlPrefix }) =>
        `<item>
          <title>${post.meta.title}</title>
          <link>${baseUrl}/${urlPrefix}/${post.slug}</link>
          <description>${post.meta.summary || ''}</description>
          <pubDate>${new Date(post.meta.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>The Elysian Wanderer</title>
        <link>${baseUrl}</link>
        <description>Tales of a Wanderer</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
