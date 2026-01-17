'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CountBadge } from '~/components/count-badge';
import { FragmentCard } from '~/components/fragment-card';
import { TagsSection } from '~/components/tags-section';
import type { FragmentData } from '~/types/fragments';

type FragmentsViewProps = {
  fragments: FragmentData[];
  categories: { category: string; count: number }[];
};

export function FragmentsView({ fragments, categories }: FragmentsViewProps) {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tags') || '';

  // Transform categories to tagsData format for TagsSection
  const tagsData = useMemo(
    () =>
      categories.map(({ category, count }) => ({
        tag: category,
        count,
      })),
    [categories],
  );

  // Filter by category
  const filteredFragments = useMemo(
    () =>
      currentTag
        ? fragments.filter((f) => f.fragmentCategory === currentTag)
        : fragments,
    [fragments, currentTag],
  );

  return (
    <>
      <h1 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {currentTag ? (
          <span className="capitalize">{currentTag}</span>
        ) : (
          'Fragments'
        )}{' '}
        <CountBadge count={filteredFragments.length} />
      </h1>

      <TagsSection
        basePath="/fragments"
        currentTag={currentTag}
        tagsData={tagsData}
      />

      <div className="mt-10 divide-y divide-zinc-200/70 dark:divide-zinc-700/50">
        {filteredFragments.length > 0 ? (
          filteredFragments.map((fragment) => (
            <FragmentCard fragment={fragment} key={fragment.id} />
          ))
        ) : (
          <p className="py-6 text-center text-zinc-500">No fragments yet.</p>
        )}
      </div>
    </>
  );
}
