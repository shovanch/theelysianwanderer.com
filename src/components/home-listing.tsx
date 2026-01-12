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
    <div className="flex flex-col gap-4 md:gap-4">
      <Link
        href="/writings"
        className="group hover:text-accent flex w-max items-center gap-1 transition-colors"
      >
        <h2 className="text-text-muted group-hover:text-accent font-sans! text-base font-semibold sm:text-lg">
          {title}
        </h2>
        <ArrowRightIcon className="fill-icon-muted group-hover:fill-accent h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <div className="divide-border-muted/80 divide-y md:divide-y-0">
        {allWritings.map((post) => (
          <div
            key={`${post.subdirectory}-${post.slug}`}
            className="py-4 first:pt-0 last:pb-0 md:py-2"
          >
            <PostCard post={post} showTags={false} showMetadata={false} />
          </div>
        ))}
      </div>
      <Link
        href="/writings"
        className="text-text-muted hover:text-accent text-base italic"
      >
        View more
      </Link>
    </div>
  );
}
