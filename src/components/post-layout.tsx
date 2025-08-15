'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  PiCalendarBlankDuotone,
  PiClockDuotone,
  PiTagDuotone,
} from 'react-icons/pi';
import { Container } from '~/components/container';
import { Prose } from '~/components/prose';
import { formatDate } from '~/utils/format-date';
import type { PostData, PostMeta } from '~/utils/posts';
import { PostDivider } from './post-divider';

const DynamicTOC = dynamic(() => import('./dynamic-toc'), {
  ssr: false,
});

export function PostLayout({
  post,
  postData,
  children,
}: {
  post: PostMeta;
  postData?: PostData;
  children: React.ReactNode;
}) {
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
            <div className="flex items-center gap-2.5 self-start md:self-center lg:gap-3">
              {/* Reading Period or Published Date */}
              <time
                className="relative z-10 flex items-center gap-1 font-sans text-xs font-bold tracking-wider text-blue-600 uppercase lg:text-xs dark:text-zinc-400"
                dateTime={formatDate(post.publishedAt)}
                title="Published At"
              >
                <PiCalendarBlankDuotone className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </time>

              <span className="flex min-w-20 items-center gap-1 font-sans text-xs font-bold tracking-wider text-zinc-600 uppercase lg:text-xs dark:text-zinc-400">
                <PiClockDuotone className="h-4 w-4" />
                {post.readingTime}
              </span>

              {post.tags && post.tags.length > 0 && (
                <>
                  <div className="flex flex-wrap items-center gap-1">
                    <PiTagDuotone className="h-3 w-3 text-zinc-600 md:h-4 md:w-4 dark:text-zinc-400" />
                    {post.tags.map((tag, index) => (
                      <Link
                        key={tag}
                        passHref
                        href={{
                          pathname: '/posts',
                          query: {
                            tags: tag,
                          },
                        }}
                      >
                        <span
                          key={tag}
                          className="flex items-center font-sans text-xs font-bold tracking-wider text-zinc-600 uppercase lg:text-xs dark:text-zinc-400"
                        >
                          {tag}
                          {index < post.tags.length - 1 && (
                            <span className="mx-0 text-zinc-400">,</span>
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h1
              data-pagefind-body
              className="font-serif-title mt-2 mb-8 text-left text-3xl font-bold tracking-tight text-zinc-800 md:mt-4 md:text-center lg:text-5xl dark:text-zinc-100"
            >
              {post.title}
            </h1>
          </header>

          <Prose
            data-mdx-content
            data-pagefind-body
            className="mt-0 w-full pb-2 text-left lg:mt-6"
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
