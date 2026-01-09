'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { PostCard } from '~/components/post-card';
import { TagsSection } from '~/components/tags-section';
import { TypeFilter } from '~/components/type-filter';
import {
  filterPostsByTag,
  formatTag,
  getTagsFromPosts,
} from '~/utils/content-tags';
import type { PostMetaOnly } from '~/utils/posts';

type WritingsViewProps = {
  writings: PostMetaOnly[];
};

export function WritingsView({ writings }: WritingsViewProps) {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tags') || '';
  const currentType = searchParams.get('type') || '';

  // Filter by type (essays = posts, notes = notes)
  const typeFilteredWritings = useMemo(() => {
    if (currentType === 'essays') {
      return writings.filter((w) => w.subdirectory === 'posts');
    }
    if (currentType === 'notes') {
      return writings.filter((w) => w.subdirectory === 'notes');
    }
    return writings;
  }, [writings, currentType]);

  // Get tags from type-filtered writings
  const tagsData = useMemo(
    () =>
      getTagsFromPosts(typeFilteredWritings).map(([tag, count]) => ({
        tag,
        count,
      })),
    [typeFilteredWritings],
  );

  // Filter by tag
  const filteredWritings = useMemo(
    () =>
      currentTag
        ? filterPostsByTag(typeFilteredWritings, currentTag)
        : typeFilteredWritings,
    [typeFilteredWritings, currentTag],
  );

  // Determine page title
  const getTitle = () => {
    if (currentTag) return formatTag(currentTag);
    if (currentType === 'essays') return 'Essays';
    if (currentType === 'notes') return 'Notes';
    return 'Writings';
  };

  return (
    <>
      {/* Type Filter: All / Essays / Notes */}
      <TypeFilter
        currentType={currentType}
        basePath="/writings"
        currentTag={currentTag}
      />

      {/* Page Title */}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {getTitle()}{' '}
        <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
          {filteredWritings.length}
        </sup>
      </h2>

      {/* Tags Section */}
      <TagsSection
        basePath={currentType ? `/writings?type=${currentType}` : '/writings'}
        currentTag={currentTag}
        tagsData={tagsData}
      />

      {/* Posts List */}
      <div className="mt-4 divide-y divide-zinc-200/70 border-zinc-200/70 dark:divide-zinc-700/50 dark:border-zinc-700/50">
        {filteredWritings.length > 0 ? (
          filteredWritings.map((post, index) => (
            <div
              key={`${post.subdirectory}-${post.slug}`}
              className={`py-4 md:py-6 ${index === filteredWritings.length - 1 ? 'border-b-0' : ''}`}
            >
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-zinc-500">No writings found.</p>
        )}
      </div>

      {/* Clear filters */}
      {(currentTag || currentType) && (
        <div className="mt-4 text-center">
          <Link
            className="text-zinc-600 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            href="/writings"
          >
            Clear all filters
          </Link>
        </div>
      )}
    </>
  );
}
