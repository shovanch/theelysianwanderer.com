import Link from 'next/link';
import { Container } from '~/components/container';
import { PostCard } from '~/components/post-card';
import { TagsSection } from '~/components/tags-section';
import { TypeFilter } from '~/components/type-filter';
import {
  filterPostsByTag,
  formatTag,
  getTagsFromPosts,
} from '~/utils/content-tags';
import { getPosts, sortPostsByDate, type Subdirectory } from '~/utils/posts';

export default async function Writings({
  searchParams,
}: {
  searchParams: { tags?: string; type?: string };
}) {
  const { tags, type } = await searchParams;
  const currentTag = tags || '';
  const currentType = type || ''; // '' = all, 'essays' = posts, 'notes' = notes

  // Fetch based on type filter
  let allWritings;
  if (currentType === 'essays') {
    allWritings = getPosts('posts');
  } else if (currentType === 'notes') {
    allWritings = getPosts('notes');
  } else {
    // All: combine posts and notes
    allWritings = (['posts', 'notes'] as Subdirectory[])
      .flatMap((t) => getPosts(t))
      .sort(sortPostsByDate);
  }

  // Get tags and handle tag filtering
  const tagsData = getTagsFromPosts(allWritings).map(([tag, count]) => ({
    tag,
    count,
  }));
  const filteredWritings = currentTag
    ? filterPostsByTag(allWritings, currentTag)
    : allWritings;

  // Determine page title
  const getTitle = () => {
    if (currentTag) return formatTag(currentTag);
    if (currentType === 'essays') return 'Essays';
    if (currentType === 'notes') return 'Notes';
    return 'Writings';
  };

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      {/* Type Filter: All / Essays / Notes */}
      <TypeFilter
        currentType={currentType}
        basePath="/writings"
        currentTag={currentTag}
      />

      {/* Tags Section */}
      <TagsSection
        basePath={currentType ? `/writings?type=${currentType}` : '/writings'}
        currentTag={currentTag}
        tagsData={tagsData}
      />

      {/* Page Title */}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {getTitle()}{' '}
        <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
          {filteredWritings.length}
        </sup>
      </h2>

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
    </Container>
  );
}
