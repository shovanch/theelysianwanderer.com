import Link from 'next/link';
import { Container } from '~/components/container';
import { ReadsView } from '~/components/reads-view';
import { TagsSection } from '~/components/tags-section';
import {
  filterPostsByTag,
  formatTag,
  getTagsFromPosts,
} from '~/utils/content-tags';
import { getPosts } from '~/utils/posts';

export default async function Reads({
  searchParams,
}: {
  searchParams: { tags?: string; view?: string };
}) {
  const { tags, view } = await searchParams;
  // Get the tags and view values early
  const currentTag = tags || '';
  const currentView = view === 'list' ? 'list' : 'grid'; // default to grid

  // Fetch reads using the existing utility
  const allPosts = getPosts('reads');

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
        basePath="/reads"
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
          Reads{' '}
          <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
            {allPosts.length}
          </sup>
        </h2>
      )}

      {/* Posts with View Toggle */}
      <div className="mt-4">
        <ReadsView
          posts={filteredPosts}
          currentTag={currentTag}
          currentView={currentView}
        />
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
    </Container>
  );
}
