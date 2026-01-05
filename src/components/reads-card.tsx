import { formatDate } from '~/utils/format-date';
import { type PostData } from '~/utils/posts';
import { Card } from './card';

export function ReadsCard({ post }: { post: PostData }) {
  const { slug, subdirectory } = post;
  const {
    title,
    publishedAt,
    readingTime,
    author,
    readingStartedAt,
    readingCompletedAt,
    coverImage,
  } = post.meta;

  // Format reading period
  const getReadingPeriod = () => {
    if (readingStartedAt && readingCompletedAt) {
      return `${formatDate(readingStartedAt)} - ${formatDate(readingCompletedAt)}`;
    }
    if (readingStartedAt) {
      return `Started ${formatDate(readingStartedAt)}`;
    }
    if (readingCompletedAt) {
      return `Completed ${formatDate(readingCompletedAt)}`;
    }
    return null;
  };

  const readingPeriod = getReadingPeriod();

  return (
    <Card as="article" className="group flex" href={`/${subdirectory}/${slug}`}>
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
        {/* Cover Image */}
        {coverImage && (
          <div className="shrink-0">
            <div className="relative h-24 w-16 overflow-hidden rounded-md shadow-sm md:h-32 md:w-20">
              <img
                alt={`Cover of ${title}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                src={
                  coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2]
                    ? `/images/content/reads/${coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2].replace('assets/', '')}`
                    : coverImage
                }
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="min-w-0 flex-1">
          <Card.Title className="mb-2">{title}</Card.Title>

          {/* Author */}
          {author && (
            <div className="mb-3 text-lg font-medium text-zinc-700 dark:text-zinc-300">
              by <span className="italic">{author}</span>
            </div>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 text-sm md:text-base lg:gap-3">
            {/* Reading Period or Published Date */}
            <time
              className="relative z-10 flex items-center gap-1 font-sans text-sm font-semibold text-zinc-600 capitalize lg:text-sm dark:text-zinc-400"
              dateTime={
                readingPeriod
                  ? readingStartedAt || readingCompletedAt
                  : publishedAt &&
                      !isNaN(new Date(`${publishedAt}T00:00:00Z`).getTime())
                    ? new Date(`${publishedAt}T00:00:00Z`).toISOString()
                    : undefined
              }
            >
              <span>
                {readingPeriod
                  ? `Read ${readingPeriod}`
                  : formatDate(publishedAt)}
              </span>
            </time>

            <span className="h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-500" />

            {/* Reading Time */}
            <span className="flex min-w-20 items-center gap-1 font-sans text-xs font-semibold text-zinc-600 capitalize lg:text-sm dark:text-zinc-400">
              {readingTime}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
