import { getPosts } from '~/utils/posts';

export const baseUrl = 'https://theelysianwanderer.com';

export default async function sitemap() {
  const posts = getPosts('posts').map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.meta.publishedAt,
  }));

  const travels = getPosts('travels').map((post) => ({
    url: `${baseUrl}/travels/${post.slug}`,
    lastModified: post.meta.publishedAt,
  }));

  const routes = ['', '/posts', '/travels'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts, ...travels];
}
