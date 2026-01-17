'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CountBadge } from '~/components/count-badge';
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

  // Filter by type (essays = posts, notes = notes, travels = travels)
  const typeFilteredWritings = useMemo(() => {
    if (currentType === 'essays') {
      return writings.filter((w) => w.subdirectory === 'posts');
    }
    if (currentType === 'notes') {
      return writings.filter((w) => w.subdirectory === 'notes');
    }
    if (currentType === 'travels') {
      return writings.filter((w) => w.subdirectory === 'travels');
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
    if (currentType === 'travels') return 'Travels';
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
      <h2 className="text-text-primary font-serif text-3xl font-medium tracking-tight sm:text-5xl">
        {getTitle()} <CountBadge count={filteredWritings.length} />
      </h2>

      {/* Tags Section */}
      <TagsSection
        basePath={currentType ? `/writings?type=${currentType}` : '/writings'}
        currentTag={currentTag}
        tagsData={tagsData}
      />

      {/* Posts List */}
      <div className="divide-border-muted/80 border-border-muted/80 mt-4 divide-y">
        {filteredWritings.length > 0 ? (
          filteredWritings.map((post, index) => (
            <div
              key={`${post.subdirectory}-${post.slug}`}
              className={`py-4 md:py-5 ${index === filteredWritings.length - 1 ? 'border-b-0' : ''}`}
            >
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p className="text-text-muted py-6 text-center">No writings found.</p>
        )}
      </div>

      {/* Clear filters */}
      {(currentTag || currentType) && (
        <div className="mt-4 text-center">
          <Link
            className="text-text-tertiary hover:text-text-primary underline"
            href="/writings"
          >
            Clear all filters
          </Link>
        </div>
      )}
    </>
  );
}
