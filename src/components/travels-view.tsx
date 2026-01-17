'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CountBadge } from '~/components/count-badge';
import { PostCard } from '~/components/post-card';
import { TagsSection } from '~/components/tags-section';
import {
  filterPostsByTag,
  formatTag,
  getTagsFromPosts,
} from '~/utils/content-tags';
import type { PostMetaOnly } from '~/utils/posts';

type TravelsViewProps = {
  posts: PostMetaOnly[];
};

export function TravelsView({ posts }: TravelsViewProps) {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tags') || '';

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

  return (
    <>
      <TagsSection
        basePath="/travels"
        currentTag={currentTag}
        tagsData={tagsData}
      />

      {currentTag ? (
        <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {`${formatTag(currentTag)}`}{' '}
          <CountBadge count={filteredPosts.length} />
        </h2>
      ) : (
        <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Travels <CountBadge count={posts.length} />
        </h2>
      )}

      {/* Filtered Posts */}
      <div className="mt-4 divide-y divide-zinc-200/70 border-t border-b border-zinc-200/70 dark:divide-zinc-700/50 dark:border-zinc-700/50">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={post.slug}
              className={`py-4 md:py-6 ${index === filteredPosts.length - 1 ? 'border-b-0' : ''}`}
            >
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-zinc-500">
            No posts found for this tag, YET. The writer is still exploring the
            world and will update this page soon.
          </p>
        )}
      </div>

      {/* Clear tag filter */}
      {currentTag && (
        <div className="mt-4 text-center">
          <Link
            className="text-zinc-600 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            href="/travels"
          >
            Clear tag filter
          </Link>
        </div>
      )}
    </>
  );
}
