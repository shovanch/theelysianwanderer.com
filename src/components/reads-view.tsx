'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { TagsSection } from '~/components/tags-section';
import {
  filterPostsByTag,
  formatTag,
  getTagsFromPosts,
} from '~/utils/content-tags';
import type { PostMetaOnly } from '~/utils/posts';
import { ReadsGridCard } from './reads-grid-card';
import { ReadsListCard } from './reads-list-card';
import { ViewToggle } from './view-toggle';

type ViewMode = 'list' | 'grid';

type ReadsViewProps = {
  posts: PostMetaOnly[];
};

export function ReadsView({ posts }: ReadsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tags') || '';
  const currentView: ViewMode =
    searchParams.get('view') === 'list' ? 'list' : 'grid';

  // Get tags from all posts
  const tagsData = useMemo(
    () =>
      getTagsFromPosts(posts).map(([tag, count]) => ({
        tag,
        count,
      })),
    [posts],
  );

  // Filter by tag
  const filteredPosts = useMemo(
    () => (currentTag ? filterPostsByTag(posts, currentTag) : posts),
    [posts, currentTag],
  );

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
      {/* Page Title */}
      {currentTag ? (
        <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {`${formatTag(currentTag)}`}{' '}
          <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
            {filteredPosts.length}
          </sup>
        </h2>
      ) : (
        <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Reads{' '}
          <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
            {posts.length}
          </sup>
        </h2>
      )}

      {/* Tags Section */}
      <TagsSection
        basePath="/reads"
        currentTag={currentTag}
        tagsData={tagsData}
      />

      {/* Posts with View Toggle */}
      <div className="mt-4">
        {/* View Toggle */}
        <div className="mb-6 flex justify-end">
          <ViewToggle view={currentView} onViewChange={handleViewChange} />
        </div>

        {/* Posts Display */}
        {currentView === 'list' ? (
          <div className="divide-y divide-zinc-200/70 border-zinc-200/70 dark:divide-zinc-700/50 dark:border-zinc-700/50">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <div
                  key={post.slug}
                  className={`py-5 md:py-6 ${index === filteredPosts.length - 1 ? 'border-b-0' : ''}`}
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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <ReadsGridCard key={post.slug} post={post} />
              ))
            ) : (
              <p className="col-span-full py-6 text-center text-zinc-500">
                No reads found{currentTag ? ' for this tag' : ''}.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Clear tag filter */}
      {currentTag && (
        <div className="mt-4 text-center">
          <Link
            className="text-zinc-600 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            href="/reads"
          >
            Clear tag filter
          </Link>
        </div>
      )}
    </>
  );
}
