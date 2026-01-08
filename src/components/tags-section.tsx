'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PiX } from 'react-icons/pi';
import { formatTag } from '~/utils/content-tags';

type TagsData = {
  tag: string;
  count: number;
};

type TagsSectionProps = {
  tagsData: TagsData[];
  currentTag: string;
  basePath: string;
};

export function TagsSection({
  tagsData,
  currentTag,
  basePath,
}: TagsSectionProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  if (tagsData.length === 0) return null;

  // On mobile, show only 7 tags by default. On desktop, show all tags.
  const visibleTags = showAllTags ? tagsData : tagsData.slice(0, 7);
  const hasMoreTags = tagsData.length > 7;

  return (
    <div className="mt-4 mb-8">
      <h3 className="mb-2 text-xl font-semibold md:text-2xl">Topics</h3>
      <div className="flex flex-wrap gap-2">
        {/* Desktop: show all tags, Mobile: show limited tags */}
        <div className="hidden md:contents">
          {tagsData.map(({ tag, count }) => {
            const isActive = currentTag === tag;

            return (
              <Link
                key={tag}
                prefetch
                className={`flex items-center gap-1 rounded-full bg-zinc-200/50 px-3 py-2 text-xs font-medium transition-all duration-300 hover:bg-zinc-300/50 md:py-1 md:text-base dark:bg-zinc-800 dark:hover:bg-zinc-700 ${
                  isActive ? 'bg-zinc-400/80 dark:bg-zinc-500/80' : ''
                }`}
                href={
                  isActive
                    ? basePath
                    : `${basePath}${basePath.includes('?') ? '&' : '?'}tags=${tag}`
                }
              >
                {formatTag(tag)}
                <sup className="mt-1 ml-1 text-sm opacity-50 md:text-sm">
                  {count}
                </sup>
                {isActive && <PiX className="ml-1 h-3 w-3 md:h-4 md:w-4" />}
              </Link>
            );
          })}
        </div>

        {/* Mobile: show limited tags with expand functionality */}
        <div className="contents md:hidden">
          {visibleTags.map(({ tag, count }, index) => {
            const isActive = currentTag === tag;

            return (
              <Link
                key={tag}
                prefetch
                className={`flex items-center gap-1 rounded-full bg-zinc-200/50 px-3 py-2 text-xs font-medium transition-all duration-300 hover:bg-zinc-300/50 md:py-1 md:text-base dark:bg-zinc-800 dark:hover:bg-zinc-700 ${
                  isActive ? 'bg-zinc-400/80 dark:bg-zinc-500/80' : ''
                }`}
                href={
                  isActive
                    ? basePath
                    : `${basePath}${basePath.includes('?') ? '&' : '?'}tags=${tag}`
                }
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {formatTag(tag)}
                <sup className="-mt-0.5 ml-1 text-xs opacity-50 md:text-sm">
                  {count}
                </sup>
                {isActive && <PiX className="ml-1 h-3 w-3 md:h-4 md:w-4" />}
              </Link>
            );
          })}
        </div>

        {/* Show all/Show less button - only show on mobile when there are more than 7 tags */}
        {hasMoreTags && (
          <button
            className="rounded-full bg-zinc-200/70 px-3 py-2 text-xs font-medium text-zinc-700 transition-all duration-300 hover:scale-105 hover:bg-zinc-300/70 md:hidden dark:bg-zinc-700/50 dark:text-zinc-300 dark:hover:bg-zinc-600/50"
            onClick={() => setShowAllTags(!showAllTags)}
          >
            {showAllTags ? 'Show less' : `Show all (${tagsData.length})`}
          </button>
        )}
      </div>
    </div>
  );
}
