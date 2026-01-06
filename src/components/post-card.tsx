import {
  PiBookDuotone,
  PiCalendarBlankDuotone,
  PiClockDuotone,
  PiFileTextDuotone,
  PiMapPinDuotone,
  PiNoteDuotone,
  PiTagDuotone,
} from 'react-icons/pi';
import { formatDate } from '~/utils/format-date';
import { type PostData } from '~/utils/posts';
import { Card } from './card';

export function PostCard({
  post,
  showPill = false,
  showTags = true,
}: {
  post: PostData;
  showPill?: boolean;
  showTags?: boolean;
}) {
  const { slug, subdirectory } = post;
  const { title, publishedAt, readingTime, tags, category } = post.meta;

  // If there are tags, use the first tag, otherwise use the category
  const tag = tags?.at(0) ?? category;

  // Map subdirectory to display name, color, and icon
  const getTypeInfo = (subdirectory: string) => {
    switch (subdirectory) {
      case 'posts':
        return {
          label: 'Post',
          color: 'text-zinc-600 dark:text-zinc-400',
          icon: PiFileTextDuotone,
        };
      case 'travels':
        return {
          label: 'Travel',
          color: 'text-zinc-600 dark:text-zinc-400',
          icon: PiMapPinDuotone,
        };
      case 'reads':
        return {
          label: 'Read',
          color: 'text-zinc-600 dark:text-zinc-400',
          icon: PiBookDuotone,
        };
      case 'notes':
        return {
          label: 'Note',
          color: 'text-zinc-600 dark:text-zinc-400',
          icon: PiNoteDuotone,
        };
      default:
        return {
          label: subdirectory,
          color: 'text-zinc-600 dark:text-zinc-400',
          icon: PiFileTextDuotone,
        };
    }
  };

  const typeInfo = getTypeInfo(subdirectory);

  return (
    <Card as="article" className="group flex" href={`/${subdirectory}/${slug}`}>
      <Card.Title className="">{title}</Card.Title>
      <div className="mt-0.5 mb-1 flex w-max flex-wrap items-center gap-2 text-sm md:mt-1 md:text-base lg:gap-3">
        {showPill && (
          <>
            <span
              className={`z-10 flex items-center gap-1 font-sans text-[0.75rem] font-bold capitalize lg:text-xs ${typeInfo.color}`}
            >
              <typeInfo.icon className="h-4 w-4" />
              {typeInfo.label}
            </span>
          </>
        )}
        <Card.Eyebrow
          as="time"
          className="flex items-center"
          dateTime={
            publishedAt &&
            !isNaN(new Date(`${publishedAt}T00:00:00Z`).getTime())
              ? new Date(`${publishedAt}T00:00:00Z`).toISOString()
              : undefined
          }
        >
          {formatDate(publishedAt)}
        </Card.Eyebrow>

        <span className="h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-500" />
        <span className="flex min-w-20 items-center gap-1 font-sans text-sm font-semibold text-zinc-600 lg:text-sm dark:text-zinc-400">
          {readingTime}
        </span>
        {/* {showTags && (
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center font-sans text-[0.75rem] font-bold tracking-wider text-zinc-600 uppercase lg:text-xs dark:text-zinc-400 ${showPill ? 'hidden md:flex' : ''}`}
            >
              {tag}
            </span>
          </div>
        )} */}
      </div>
    </Card>
  );
}
