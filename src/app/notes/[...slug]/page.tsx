import { notFound } from 'next/navigation';
import readingDuration from 'reading-duration';
import { baseUrl } from '~/app/sitemap';
import { PostContent } from '~/components/post-content';
import { PostLayout } from '~/components/post-layout';
import { isDevEnv } from '~/utils/is-dev-env';
import { getAllNoteRoutes, getNoteByRoute } from '~/utils/notes-manifest';
import { processMarkdownImages } from '~/utils/posts';

export async function generateStaticParams() {
  const routes = getAllNoteRoutes();

  return routes.map((route) => ({
    slug: route ? route.split('/') : [],
  }));
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

  const entry = getNoteByRoute(slug);
  if (!entry) {
    notFound();
  }

  const { title, publishedAt: publishedTime, category } = entry.frontmatter;

  const ogUrl = new URL(`${baseUrl}/og`);
  ogUrl.searchParams.set('title', title || 'Note');
  const ogImage = ogUrl.toString();

  return {
    title: title || 'Note',
    description: `Notes on ${category || 'notes'} - ${title}`,
    openGraph: {
      title: title || 'Note',
      description: `Notes on ${category || 'notes'} - ${title}`,
      type: 'article',
      siteName: 'The Elysian Wanderer',
      publishedTime,
      url: `${baseUrl}/notes/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Note',
      description: `Notes on ${category || 'notes'} - ${title}`,
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

    const entry = getNoteByRoute(slug);

    if (!entry) {
      notFound();
    }

    // Skip unpublished in production
    if (!isDevEnv && !entry.frontmatter.isPublished) {
      notFound();
    }

    // Process content for rendering
    const processedContent = processMarkdownImages(entry.body, 'notes');
    const readingTime = readingDuration(processedContent, { emoji: false });

    // Convert to PostData format for existing components
    const post = {
      meta: {
        publishedAt: entry.frontmatter.publishedAt,
        updatedAt: entry.frontmatter.updatedAt,
        title: entry.title,
        summary: entry.frontmatter.summary || '',
        tags: entry.frontmatter.tags || [],
        coverImage: entry.frontmatter.coverImage,
        category: (entry.frontmatter.category || 'notes') as
          | 'posts'
          | 'stories'
          | 'travels'
          | 'reads'
          | 'notes',
        isPublished: entry.frontmatter.isPublished,
        published: entry.frontmatter.isPublished,
        readingTime,
        slug: entry.canonicalRoute,
        showToc: entry.frontmatter.showToc,
      },
      content: processedContent,
      slug: entry.canonicalRoute,
      subdirectory: 'notes' as const,
    };

    return (
      <PostLayout key={post.slug} post={post.meta} postData={post}>
        <PostContent post={post} currentPath={entry.relativePath} />
      </PostLayout>
    );
  } catch {
    notFound();
  }
}
