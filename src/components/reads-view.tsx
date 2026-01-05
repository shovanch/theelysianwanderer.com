'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { PostData } from '~/utils/posts';
import { ReadsGridCard } from './reads-grid-card';
import { ReadsListCard } from './reads-list-card';
import { ViewToggle } from './view-toggle';

type ViewMode = 'list' | 'grid';

type ReadsViewProps = {
  posts: PostData[];
  currentTag: string;
  currentView: ViewMode;
};

export function ReadsView({ posts, currentTag, currentView }: ReadsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewChange = useCallback(
    (newView: ViewMode) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newView === 'grid') {
        params.delete('view'); // grid is default, no need to show in URL
      } else {
        params.set('view', newView);
      }
      const query = params.toString();
      router.push(`/reads${query ? `?${query}` : ''}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <>
      {/* View Toggle */}
      <div className="mb-6 flex justify-end">
        <ViewToggle view={currentView} onViewChange={handleViewChange} />
      </div>

      {/* Posts Display */}
      {currentView === 'list' ? (
        <div className="divide-y divide-zinc-200/70 border-zinc-200/70 dark:divide-zinc-700/50 dark:border-zinc-700/50">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={post.slug}
                className={`py-5 md:py-6 ${index === posts.length - 1 ? 'border-b-0' : ''}`}
              >
                <ReadsListCard post={post} />
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-zinc-500">
              No reads found{currentTag ? ' for this tag' : ''}.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {posts.length > 0 ? (
            posts.map((post) => <ReadsGridCard key={post.slug} post={post} />)
          ) : (
            <p className="col-span-full py-6 text-center text-zinc-500">
              No reads found{currentTag ? ' for this tag' : ''}.
            </p>
          )}
        </div>
      )}
    </>
  );
}
