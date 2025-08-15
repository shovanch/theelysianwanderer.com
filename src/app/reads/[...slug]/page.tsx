import { notFound } from 'next/navigation';
import { baseUrl } from '~/app/sitemap';
import { PostContent } from '~/components/post-content';
import { ReadsLayout } from '~/components/reads-layout';
import { isDevEnv } from '~/utils/is-dev-env';
import { getPost, getPosts } from '~/utils/posts';

export async function generateStaticParams() {
  // Get all published reads
  const posts = getPosts('reads');

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

  const post = getPost('reads', [slug]);
  if (!post) {
    notFound();
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    coverImage,
  } = post.meta;

  const ogUrl = new URL(`${baseUrl}/og`);

  ogUrl.searchParams.set('title', title);
  if (coverImage) {
    ogUrl.searchParams.set('coverImage', coverImage);
  }

  const ogImage = ogUrl.toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/reads/${post.slug}`,
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
    const slug = params.slug.join('/');

    // Skip asset files
    if (slug.match(/\.(webp|jpg|jpeg|png|gif|svg|pdf|mp4|mp3)$/i)) {
      notFound();
    }

    const post = getPost('reads', [slug]);

    if (!post) {
      notFound();
    }

    // Skip published filter in development
    if (!isDevEnv && !(post.meta.isPublished || post.meta.published)) {
      notFound();
    }

    return (
      <ReadsLayout key={post.slug} post={post.meta} postData={post}>
        <PostContent post={post} />
      </ReadsLayout>
    );
  } catch {
    notFound();
  }
}
