import Link from 'next/link';
import {
  PiCalendarBlankDuotone,
  PiClockDuotone,
  PiTagDuotone,
  PiUserDuotone,
} from 'react-icons/pi';
import { formatDate } from '~/utils/format-date';
import { type PostData } from '~/utils/posts';
import { Card } from './card';

export function ReadsCard({
  post,
  showTags = true,
}: {
  post: PostData;
  showTags?: boolean;
}) {
  const { slug, subdirectory } = post;
  const {
    title,
    publishedAt,
    readingTime,
    tags,
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
          <div className="flex-shrink-0">
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
            <div className="mb-3 flex items-center gap-1 text-lg font-medium text-zinc-700 dark:text-zinc-300">
              <PiUserDuotone className="h-5 w-5 text-zinc-500" />
              <span>by {author}</span>
            </div>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 text-sm md:text-base lg:gap-3">
            {/* Reading Period or Published Date */}
            <Card.Eyebrow
              as="time"
              className="flex items-center gap-1"
              dateTime={
                readingPeriod
                  ? readingStartedAt || readingCompletedAt
                  : publishedAt &&
                      !isNaN(new Date(`${publishedAt}T00:00:00Z`).getTime())
                    ? new Date(`${publishedAt}T00:00:00Z`).toISOString()
                    : undefined
              }
            >
              <PiCalendarBlankDuotone className="h-4 w-4" />
              {readingPeriod
                ? `Read ${readingPeriod}`
                : formatDate(publishedAt)}
            </Card.Eyebrow>

            {/* Reading Time */}
            <span className="flex min-w-20 items-center gap-1 font-sans text-[0.75rem] font-bold tracking-wider text-zinc-600 uppercase lg:text-xs dark:text-zinc-400">
              <PiClockDuotone className="h-4 w-4" />
              {readingTime}
            </span>

            {/* Tags */}
            {showTags && tags && tags.length > 0 && (
              <>
                <div className="flex flex-wrap items-center gap-1">
                  <PiTagDuotone className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  {tags.map((tag, index) => (
                    <Link
                      key={tag}
                      passHref
                      href={{
                        pathname: '/reads',
                        query: {
                          tags: tag,
                        },
                      }}
                    >
                      <span className="flex items-center font-sans text-[0.75rem] font-bold tracking-wider text-zinc-600 uppercase lg:text-xs dark:text-zinc-400">
                        {tag}
                        {index < tags.length - 1 && (
                          <span className="mx-0 text-zinc-400">,</span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
