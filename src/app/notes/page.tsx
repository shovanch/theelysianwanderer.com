import readingDuration from 'reading-duration';
import { Container } from '~/components/container';
import { PostCard } from '~/components/post-card';
import { getIndexNotes } from '~/utils/notes-manifest';
import type { PostMetaOnly } from '~/utils/posts';
import type { NoteEntry } from '~/types/notes';

export const metadata = {
  title: 'Notes',
  description: 'Rough notes from my studies and explorations.',
};

function noteEntryToPostMeta(entry: NoteEntry): PostMetaOnly {
  const readingTime = readingDuration(entry.body, { emoji: false });

  return {
    meta: {
      publishedAt: entry.frontmatter.publishedAt,
      updatedAt: entry.frontmatter.updatedAt,
      title: entry.title,
      summary: entry.frontmatter.summary || '',
      tags: entry.frontmatter.tags || [],
      coverImage: entry.frontmatter.coverImage,
      category: 'notes',
      isPublished: entry.frontmatter.isPublished,
      published: entry.frontmatter.isPublished,
      readingTime,
      slug: entry.canonicalRoute,
      showToc: entry.frontmatter.showToc,
    },
    slug: entry.canonicalRoute,
    subdirectory: 'notes',
  };
}

export default function Notes() {
  const notes = getIndexNotes();
  const postMetaList = notes.map(noteEntryToPostMeta);

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        Notes{' '}
        <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
          {postMetaList.length}
        </sup>
      </h2>

      <div className="mt-4 divide-y divide-zinc-200/70 border-zinc-200/70 dark:divide-zinc-700/50 dark:border-zinc-700/50">
        {postMetaList.length > 0 ? (
          postMetaList.map((post, index) => (
            <div
              key={post.slug}
              className={`py-4 md:py-6 ${index === postMetaList.length - 1 ? 'border-b-0' : ''}`}
            >
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-zinc-500">No notes found.</p>
        )}
      </div>
    </Container>
  );
}
