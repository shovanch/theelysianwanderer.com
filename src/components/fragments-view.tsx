'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { PiX } from 'react-icons/pi';
import { FragmentCard } from '~/components/fragment-card';
import type { FragmentData } from '~/types/fragments';

type FragmentsViewProps = {
  fragments: FragmentData[];
  categories: { category: string; count: number }[];
};

export function FragmentsView({ fragments, categories }: FragmentsViewProps) {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tags') || '';

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
        Fragments{' '}
        <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
          {filteredFragments.length}
        </sup>
      </h1>

      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {categories.map(({ category, count }) => {
            const isActive = currentTag === category;
            return (
              <Link
                key={category}
                href={isActive ? '/fragments' : `/fragments?tags=${category}`}
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors lg:text-sm ${
                  isActive
                    ? 'bg-blue-200 text-blue-800 dark:bg-amber-800/70 dark:text-amber-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800/50'
                }`}
              >
                {category}
                <sup className="ml-0.5 text-xs opacity-60">{count}</sup>
                {isActive && <PiX className="ml-1 h-3 w-3" />}
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-4 divide-y divide-zinc-200/70 dark:divide-zinc-700/50">
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
