'use client';

import dynamic from 'next/dynamic';
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
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-center lg:gap-4">
              {/* Published Date */}
              <time
                className="relative z-10 flex items-center gap-1 font-sans text-sm font-semibold text-zinc-600 capitalize lg:text-sm dark:text-zinc-400"
                dateTime={formatDate(post.publishedAt)}
                title="Published At"
              >
                <span>{formatDate(post.publishedAt)}</span>
              </time>

              <span className="h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-500" />

              {/* Reading Time */}
              <span className="flex min-w-20 items-center gap-1 font-sans text-sm font-semibold text-zinc-600 capitalize lg:text-sm dark:text-zinc-400">
                {post.readingTime}
              </span>
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
