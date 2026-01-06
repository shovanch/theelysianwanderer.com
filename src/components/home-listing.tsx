import Link from 'next/link';
import { PostCard } from '~/components/post-card';
import { ArrowRightIcon } from '~/components/social-icons';
import { getPosts, sortPostsByDate, type PostData } from '~/utils/posts';

type HomeListingProps = {
  title?: string;
  posts?: PostData[];
  maxItems?: number;
};

export function HomeListing({
  title = 'Writings',
  posts,
  maxItems = 5,
}: HomeListingProps) {
  // If no posts provided, fetch default writings
  const allWritings =
    posts ??
    (['posts', 'travels', 'notes'] as const)
      .flatMap((type) => getPosts(type))
      .sort(sortPostsByDate)
      .slice(0, maxItems);

  if (allWritings.length === 0) return null;

  return (
    <div className="col-span-1">
      <Link
        href="/writings"
        className="group flex w-max items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <h2 className="font-sans! text-lg font-semibold text-zinc-500 group-hover:text-blue-600 sm:text-lg dark:text-zinc-400 dark:group-hover:text-blue-400">
          {title}
        </h2>
        <ArrowRightIcon className="h-4 w-4 fill-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:fill-blue-600 dark:fill-zinc-400 dark:group-hover:fill-blue-400" />
      </Link>
      <div className="mt-2 divide-y divide-zinc-200/70 dark:divide-zinc-700/50">
        {allWritings.map((post, index) => (
          <div
            key={`${post.subdirectory}-${post.slug}`}
            className={`py-4 md:py-4 ${index === allWritings.length - 1 ? 'border-b-0' : ''}`}
          >
            <PostCard post={post} showTags={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
