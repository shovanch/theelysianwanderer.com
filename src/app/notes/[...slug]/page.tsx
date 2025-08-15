import { notFound } from 'next/navigation';
import { baseUrl } from '~/app/sitemap';
import { PostContent } from '~/components/post-content';
import { PostLayout } from '~/components/post-layout';
import { isDevEnv } from '~/utils/is-dev-env';
import { getPost, getPosts } from '~/utils/posts';

export async function generateStaticParams() {
  // Get all published notes
  const posts = getPosts('notes');

  const paths = posts
    .filter((post) => post.slug) // Only include posts with slugs
    .map((post) => ({
      slug: post.slug.split('/'), // Split slug into array for Next.js dynamic routes
    }));

  return paths;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug.join('/');

  // Skip asset files
  if (slug.match(/\.(webp|jpg|jpeg|png|gif|svg|pdf|mp4|mp3)$/i)) {
    notFound();
  }

  const post = getPost('notes', [slug]);
  if (!post) {
    notFound();
  }

  const { title, publishedAt: publishedTime, category } = post.meta;

  const ogUrl = new URL(`${baseUrl}/og`);

  ogUrl.searchParams.set('title', title || 'Note');

  const ogImage = ogUrl.toString();

  return {
    title: title || 'Note',
    description: `Notes on ${category} - ${title}`,
    openGraph: {
      title: title || 'Note',
      description: `Notes on ${category} - ${title}`,
      type: 'article',
      siteName: 'The Elysian Wanderer',
      publishedTime,
      url: `${baseUrl}/notes/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Note',
      description: `Notes on ${category} - ${title}`,
      images: [ogImage],
    },
  };
}

export default async function NoteBySlug(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  try {
    const slug = params.slug.join('/');

    // Skip asset files
    if (slug.match(/\.(webp|jpg|jpeg|png|gif|svg|pdf|mp4|mp3)$/i)) {
      notFound();
    }

    const post = getPost('notes', [slug]);

    if (!post) {
      notFound();
    }

    // Skip published filter in development
    if (!isDevEnv && !(post.meta.isPublished || post.meta.published)) {
      notFound();
    }

    return (
      <PostLayout key={post.slug} post={post.meta} postData={post}>
        <PostContent post={post} />
      </PostLayout>
    );
  } catch {
    notFound();
  }
}
