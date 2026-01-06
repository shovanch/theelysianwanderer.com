import { Suspense } from 'react';
import { Container } from '~/components/container';
import { WritingsView } from '~/components/writings-view';
import { getPosts, sortPostsByDate, type Subdirectory } from '~/utils/posts';

export const metadata = {
  title: 'Writings',
  description: 'Essays, notes, and thoughts on various topics.',
};

export default function Writings() {
  // Fetch all writings at build time (static) - no content needed for listing
  const allWritings = (['posts', 'notes'] as Subdirectory[])
    .flatMap((t) => getPosts(t, { includeContent: false }))
    .sort(sortPostsByDate);

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <Suspense fallback={<WritingsLoading />}>
        <WritingsView writings={allWritings} />
      </Suspense>
    </Container>
  );
}

function WritingsLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 w-8 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="mb-8">
        <div className="mb-2 h-6 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700"
            />
          ))}
        </div>
      </div>
      <div className="h-10 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}
