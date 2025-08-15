import Link from 'next/link';
import { Container } from '~/components/container';
import { PostCard } from '~/components/post-card';
import { TagsSection } from '~/components/tags-section';
import {
  filterPostsByTag,
  formatTag,
  getTagsFromPosts,
} from '~/utils/content-tags';
import { getPosts } from '~/utils/posts';

export default async function Topics({
  searchParams,
}: {
  searchParams: { tags?: string };
}) {
  const { tags } = await searchParams;
  // Get the tags value early
  const currentTag = tags || '';

  // Fetch posts using the existing utility
  const allPosts = getPosts('posts');

  // Get tags and handle filtering
  const tagsData = getTagsFromPosts(allPosts).map(([tag, count]) => ({
    tag,
    count,
  }));
  const filteredPosts = currentTag
    ? filterPostsByTag(allPosts, currentTag)
    : allPosts;

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <TagsSection
        basePath="/posts"
        currentTag={currentTag}
        tagsData={tagsData}
      />

      {currentTag ? (
        <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {`${formatTag(currentTag)}`}{' '}
          <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
            {filteredPosts.length}
          </sup>
        </h2>
      ) : (
        <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Posts{' '}
          <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
            {allPosts.length}
          </sup>
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
            No posts found for this tag.
          </p>
        )}
      </div>

      {/* Clear tag filter */}
      {currentTag && (
        <div className="mt-4 text-center">
          <Link
            className="text-zinc-600 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            href="/posts"
          >
            Clear tag filter
          </Link>
        </div>
      )}
    </Container>
  );
}
