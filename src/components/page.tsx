import path from 'path';
import { notFound } from 'next/navigation';
import { baseUrl } from '~/app/sitemap';
import { PostContent } from '~/components/post-content';
import { PostLayout } from '~/components/post-layout';
import { isDevEnv } from '~/utils/is-dev-env';
import { getFilenames, getPost } from '~/utils/posts';

export async function generateStaticParams() {
  const filenames = getFilenames('posts');

  const markdownRegex = /\.md(x)?$/;

  const paths = filenames.map((filename) => {
    // Remove file extension and 'page' from the path if present
    const slugParts = filename
      .replace(markdownRegex, '')
      .replace(/\/page$/, '')
      .split(path.sep);

    // Ensure the slug does not repeat the directory name
    const slug =
      slugParts.length > 1 &&
      slugParts[slugParts.length - 1] === slugParts[slugParts.length - 2]
        ? slugParts.slice(0, -1)
        : slugParts;

    return { slug };
  });

  return paths;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const post = getPost('posts', params.slug);
  if (!post) {
    notFound();
  }

  const { title, publishedAt: publishedTime, summary: description } = post.meta;
  const ogImage = `${baseUrl}/og`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/posts/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PostBySlug(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  try {
    const post = getPost('posts', params.slug);

    // Skip published filter in development
    if (!isDevEnv && !post.meta.isPublished) {
      notFound();
    }

    return (
      <PostLayout key={post.slug} post={post.meta}>
        <PostContent post={post} />
      </PostLayout>
    );
  } catch (_error) {
    notFound();
  }
}
