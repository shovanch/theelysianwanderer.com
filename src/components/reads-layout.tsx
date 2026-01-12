'use client';

import dynamic from 'next/dynamic';
import {
  PiCalendarBlankDuotone,
  PiClockDuotone,
  PiTagDuotone,
  PiUserDuotone,
} from 'react-icons/pi';
import { Container } from '~/components/container';
import { Prose } from '~/components/prose';
import { formatDate } from '~/utils/format-date';
import type { PostData, PostMeta } from '~/utils/posts';
import { BookCover } from './book-cover';
import { PostDivider } from './post-divider';

const DynamicTOC = dynamic(() => import('./dynamic-toc'), {
  ssr: false,
});

export function ReadsLayout({
  post,
  postData,
  children,
}: {
  post: PostMeta;
  postData?: PostData;
  children: React.ReactNode;
}) {
  const { author, readingStartedAt, readingCompletedAt, coverImage } = post;

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
    <>
      {/* Dynamic TOC - fixed positioned with auto-hide */}
      {postData && post.showToc !== false && (
        <DynamicTOC postData={postData} readingTime={post.readingTime} />
      )}

      <Container className="mt-16 lg:mt-24" innerClassName="max-w-4xl">
        {/* Main Content - centered as normal */}
        <article className="mx-auto flex max-w-3xl flex-col items-center">
          <header className="flex w-full flex-col items-start md:items-center">
            {/* Cover Image */}
            {coverImage && (
              <div className="mb-6 self-center">
                <BookCover
                  alt={`Cover of ${post.title}`}
                  size="large"
                  src={
                    coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2]
                      ? `/images/content/reads/${coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2].replace('assets/', '')}`
                      : coverImage
                  }
                />
              </div>
            )}

            {/* Title */}
            <h1
              data-pagefind-body
              className="font-serif-title mb-4 text-left text-3xl font-medium tracking-tight text-zinc-800 md:text-center lg:text-5xl dark:text-zinc-100"
            >
              {post.title}
            </h1>

            {/* Author */}
            {author && (
              <div className="mb-4 flex items-center gap-2 self-start md:self-center">
                <span className="text-lg font-medium text-zinc-700 md:text-2xl dark:text-zinc-300">
                  by <span className="italic">{author}</span>
                </span>
              </div>
            )}

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-center lg:gap-4">
              {/* Reading Period or Published Date */}
              <time
                className="relative z-10 flex items-center gap-1 font-sans text-sm font-semibold text-zinc-600 capitalize lg:text-sm dark:text-zinc-400"
                dateTime={
                  readingPeriod
                    ? readingStartedAt || readingCompletedAt || post.publishedAt
                    : post.publishedAt
                }
                title="Published At"
              >
                <span>
                  {readingPeriod
                    ? `Read ${readingPeriod}`
                    : formatDate(post.publishedAt)}
                </span>
              </time>

              <span className="h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-500" />
              <span className="flex min-w-20 items-center gap-1 font-sans text-xs font-semibold text-zinc-600 capitalize lg:text-sm dark:text-zinc-400">
                {post.readingTime}
              </span>

              {/* Tags */}
              {/* {post.tags && post.tags.length > 0 && (
                <>
                  <div className="flex flex-wrap items-center gap-1">
                    <PiTagDuotone className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    {post.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className="flex items-center font-sans text-xs font-semibold text-zinc-600 capitalize lg:text-sm dark:text-zinc-400"
                      >
                        {tag}
                        {index < post.tags.length - 1 && (
                          <span className="mx-0 text-zinc-400">,</span>
                        )}
                      </span>
                    ))}
                  </div>
                </>
              )} */}
            </div>
          </header>

          <Prose
            data-mdx-content
            data-pagefind-body
            className="read-only-prose mt-12 w-full pb-2 text-left md:mt-24"
          >
            {!!post.updatedAt && (
              <time
                className="relative z-10 -mb-4 flex self-start font-serif text-lg text-neutral-800 italic dark:text-zinc-300"
                dateTime={post.updatedAt}
              >
                <span className="font-medium">
                  <b>Last Updated:</b> {formatDate(post.updatedAt)}
                </span>
              </time>
            )}
            {children}
          </Prose>
          <PostDivider className="mx-auto mb-32 h-24 md:h-auto" />
        </article>
      </Container>
    </>
  );
}
