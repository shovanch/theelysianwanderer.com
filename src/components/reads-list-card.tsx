import Link from 'next/link';
import { formatDate } from '~/utils/format-date';
import { type PostData } from '~/utils/posts';

export function ReadsListCard({ post }: { post: PostData }) {
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
    <Link
      href={`/${subdirectory}/${slug}`}
      className="group flex w-full flex-col gap-4 md:flex-row md:items-start"
    >
      {/* Cover Image */}
      {coverImage && (
        <div className="shrink-0">
          <div className="relative p-2">
            <div className="relative">
              {/* Book Inside - Creates the depth/page effect (hidden by default, shown on hover) */}
              <div className="absolute top-[1%] left-2 h-[96%] w-[90%] rounded-r-md border border-gray-400 bg-white opacity-0 shadow-[6px_20px_20px_-6px_rgba(0,0,0,0.15),_-2px_0px_0px_inset_gray,_-3px_0px_0px_inset_#dbdbdb,_-4px_0px_0px_inset_white,_-5px_0px_0px_inset_#dbdbdb,_-6px_0px_0px_inset_white] transition-opacity duration-300 group-hover:opacity-100" />

              {/* Main Book Cover - starts flat, rotates on hover */}
              <div className="relative cursor-pointer rounded-md leading-none shadow-[4px_4px_12px_-2px_rgba(0,0,0,0.2),_8px_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out perspective-[2000px] group-hover:-translate-x-1.5 group-hover:scale-x-[0.94] group-hover:-rotate-y-[15deg] group-hover:rounded-r-md group-hover:shadow-[4px_4px_12px_-2px_rgba(0,0,0,0.2),_16px_20px_28px_-4px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_12px_-2px_rgba(255,255,255,0.1)] dark:group-hover:shadow-[4px_4px_12px_-2px_rgba(255,255,255,0.12),_16px_20px_28px_-4px_rgba(255,255,255,0.06)]">
                <div className="relative h-24 w-16 overflow-hidden rounded-md group-hover:rounded-r-md md:h-36 md:w-24">
                  <img
                    alt={`Cover of ${title}`}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    src={
                      coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2]
                        ? `/images/content/reads/${coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2].replace('assets/', '')}`
                        : coverImage
                    }
                  />
                  {/* Light overlay (shown on hover) */}
                  <div className="absolute top-0 right-0 z-4 h-full w-[90%] rounded-sm bg-linear-to-r from-white/0 to-white/20 opacity-0 transition-all duration-300 group-hover:opacity-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-xl font-semibold text-zinc-800 capitalize transition-colors group-hover:text-teal-600 md:text-2xl dark:text-zinc-100 dark:group-hover:text-teal-400">
          {title}
        </h3>

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
    </Link>
  );
}
