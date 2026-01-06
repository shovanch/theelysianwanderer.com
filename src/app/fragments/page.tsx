import { Suspense } from 'react';
import { Container } from '~/components/container';
import { FragmentsView } from '~/components/fragments-view';
import { getFragmentCategories, getFragments } from '~/utils/fragments';

export const metadata = {
  title: 'Fragments',
  description: 'Short thoughts and notes.',
};

export default function Fragments() {
  // Fetch all fragments at build time (static)
  const allFragments = getFragments();
  const categories = getFragmentCategories(allFragments);

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <Suspense fallback={<FragmentsLoading />}>
        <FragmentsView fragments={allFragments} categories={categories} />
      </Suspense>
    </Container>
  );
}

function FragmentsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-4 flex flex-wrap gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>
    </div>
  );
}
