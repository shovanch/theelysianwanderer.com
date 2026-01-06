import { Suspense } from 'react';
import { Container } from '~/components/container';
import { ReadsView } from '~/components/reads-view';
import { getPosts } from '~/utils/posts';

export const metadata = {
  title: 'Reads',
  description: 'Books and articles I have read.',
};

export default function Reads() {
  // Fetch all reads at build time (static) - no content needed for listing
  const allReads = getPosts('reads', { includeContent: false });

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <Suspense fallback={<ReadsLoading />}>
        <ReadsView posts={allReads} />
      </Suspense>
    </Container>
  );
}

function ReadsLoading() {
  return (
    <div className="animate-pulse">
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
