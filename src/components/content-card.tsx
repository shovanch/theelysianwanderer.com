import {
  PiAirplaneDuotone,
  PiCalendarBlankDuotone,
  PiChatCircleDuotone,
  PiCpuDuotone,
  PiFlaskDuotone,
  PiMountainsDuotone,
  PiSoccerBallDuotone,
} from 'react-icons/pi';
import { type PostMeta } from '~/utils/posts';
import { MarkdownContent } from './markdown-content';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Musings':
      return <PiChatCircleDuotone className="h-5 w-5" />;

    case 'Science':
      return <PiFlaskDuotone className="h-5 w-5" />;

    case 'Sports':
      return <PiSoccerBallDuotone className="h-5 w-5" />;

    case 'Technology':
      return <PiCpuDuotone className="h-5 w-5" />;

    case 'Travel':
      return <PiAirplaneDuotone className="h-5 w-5" />;

    case 'Mountains':
      return <PiMountainsDuotone className="h-5 w-5" />;

    default:
      return <PiChatCircleDuotone className="h-5 w-5" />;
  }
};

type ContentCardProps = {
  post: {
    slug: string;
    category?: string;
    meta: PostMeta;
    content: string;
    markdown?: string;
  };
};

export const ContentCard = ({ post }: ContentCardProps) => {
  const formattedDate = new Date(post.meta.publishedAt).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
  );

  return (
    <article>
      {/* Header with Category and Date */}
      <header className="mb-4 flex items-center gap-4">
        {/* Category */}
        {post.category && (
          <span className="flex items-center gap-1 font-sans text-base font-semibold text-blue-600 md:text-lg dark:text-blue-400">
            {getCategoryIcon(post.category || '')}
            {post.category}
          </span>
        )}

        {/* Date with Calendar Icon */}
        <div className="flex items-center gap-1">
          <PiCalendarBlankDuotone className="h-5 w-5 text-zinc-800 dark:text-zinc-400" />

          <time
            className="text-lg text-zinc-800 dark:text-zinc-400"
            dateTime={post.meta.publishedAt}
          >
            {formattedDate}
          </time>
        </div>

        {/* Reading Time */}
        {post.meta.readingTime && (
          <div className="flex items-center gap-1">
            <span className="text-lg text-zinc-600 dark:text-zinc-500">
              {post.meta.readingTime}
            </span>
          </div>
        )}
      </header>

      {/* Debug Info */}
      {/* <div className="mb-4 rounded-sm bg-yellow-100 p-2 text-xs dark:bg-yellow-900">
        <p>Debug: Has markdown: {post.markdown ? "Yes" : "No"}</p>
        <p>Debug: Markdown length: {post.markdown?.length || 0}</p>
        <p>Debug: Has content: {post.content ? "Yes" : "No"}</p>
        <p>Debug: Content blocks: {post.content?.length || 0}</p>
        {post.markdown && (
          <p>Debug: Markdown preview: {post.markdown.substring(0, 100)}...</p>
        )}
      </div> */}

      {/* Markdown Content */}
      {post.markdown && <MarkdownContent content={post.markdown} />}

      {/* Fallback: Show content if no markdown but has content */}
      {!post.markdown && post.content && (
        <MarkdownContent content={post.content} />
      )}

      {/* Fallback: Show summary if no markdown or content */}
      {!post.markdown && !post.content && post.meta.summary && (
        <div className="text-zinc-700 dark:text-zinc-300">
          <p>{post.meta.summary}</p>
        </div>
      )}

      {/* No content at all */}
      {!post.markdown && !post.content && !post.meta.summary && (
        <div className="text-zinc-500 dark:text-zinc-400">
          <p>No content available for this post.</p>
        </div>
      )}

      {/* Cover Image */}
      {post.meta.coverImage && (
        <div className="mt-4">
          <img
            alt="Cover image"
            className="w-full rounded-lg"
            src={post.meta.coverImage}
          />
        </div>
      )}
    </article>
  );
};
