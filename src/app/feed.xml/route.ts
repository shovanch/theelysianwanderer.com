import { getPosts } from '~/utils/posts';
import { baseUrl } from '../sitemap';

export async function GET() {
  const allPosts = getPosts('posts');
  const allTravels = getPosts('travels');

  const itemsXml = [...allPosts, ...allTravels]
    .sort((a, b) => {
      if (new Date(a.meta.publishedAt) > new Date(b.meta.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.meta.title}</title>
          <link>${baseUrl}/posts/${post.slug}</link>
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
