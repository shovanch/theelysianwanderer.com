import Link from 'next/link';
import { MarkdownContent } from '~/components/markdown-content';
import { AsterikIcon } from '~/components/social-icons';
import { getValidDate } from '~/utils/date-utils';
import { formatDate } from '~/utils/format-date';
import type { FragmentData } from '~/types/fragments';

type FragmentCardProps = {
  fragment: FragmentData;
};

export function FragmentCard({ fragment }: FragmentCardProps) {
  const publishedAt = getValidDate(fragment.publishedAt);
  const updatedAt = getValidDate(fragment.updatedAt);
  // Display publishedAt, fallback to updatedAt
  const displayDate = publishedAt || updatedAt;

  return (
    <article className="fragment-item">
      <div className="relative z-10 flex items-center gap-3 font-sans text-sm font-semibold capitalize lg:text-sm">
        {fragment.fragmentCategory && (
          <Link
            href={`/fragments?tags=${fragment.fragmentCategory}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <AsterikIcon className="h-4 w-4 fill-current" />
            <span>{fragment.fragmentCategory}</span>
          </Link>
        )}
        {fragment.fragmentCategory && displayDate && (
          <span className="h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-500" />
        )}
        <time
          className="text-zinc-600 dark:text-zinc-400"
          dateTime={displayDate || ''}
        >
          {displayDate ? formatDate(displayDate) : ''}
        </time>
      </div>

      <div className="mt-2 text-zinc-700 dark:text-zinc-300 [&>div>*:last-child]:mb-0">
        <MarkdownContent content={fragment.content} />
      </div>
    </article>
  );
}
