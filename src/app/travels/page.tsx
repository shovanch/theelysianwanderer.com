import { Suspense } from 'react';
import { Container } from '~/components/container';
import { TravelsView } from '~/components/travels-view';
import { getPosts } from '~/utils/posts';

export const metadata = {
  title: 'Travels',
  description: 'Travel stories and adventures.',
};

export default function Travels() {
  // Fetch all travels at build time (static) - no content needed for listing
  const allTravels = getPosts('travels', { includeContent: false });

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <Suspense fallback={<TravelsLoading />}>
        <TravelsView posts={allTravels} />
      </Suspense>
    </Container>
  );
}

function TravelsLoading() {
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
