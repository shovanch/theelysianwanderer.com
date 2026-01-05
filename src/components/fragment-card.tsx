import { PiCalendarBlankDuotone } from 'react-icons/pi';
import { MarkdownContent } from '~/components/markdown-content';
import { formatDate } from '~/utils/format-date';
import { getValidDate, type FragmentData } from '~/utils/fragments';

type FragmentCardProps = {
  fragment: FragmentData;
};

export function FragmentCard({ fragment }: FragmentCardProps) {
  const publishedAt = getValidDate(fragment.publishedAt);
  const updatedAt = getValidDate(fragment.updatedAt);
  // Display publishedAt, fallback to updatedAt
  const displayDate = publishedAt || updatedAt;

  return (
    <article className="fragment-item py-8">
      <time
        className="relative z-10 flex items-center gap-1 font-sans text-xs font-bold tracking-wider text-blue-600 uppercase lg:text-xs dark:text-zinc-400"
        dateTime={displayDate || ''}
      >
        <PiCalendarBlankDuotone className="h-4 w-4" />
        <span>{displayDate ? formatDate(displayDate) : ''}</span>
      </time>

      <div className="mt-4 text-zinc-700 dark:text-zinc-300">
        <MarkdownContent content={fragment.content} />
      </div>
    </article>
  );
}
