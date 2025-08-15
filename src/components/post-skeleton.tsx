export const PostSkeleton = () => {
  return (
    <article>
      {/* Header Skeleton */}
      <header className="mb-4 flex items-center gap-4">
        <div className="h-6 w-20 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
          <div className="h-5 w-24 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
        </div>
      </header>

      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
        <div className="h-4 w-5/6 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
        <div className="h-4 w-4/5 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
        <div className="h-4 w-3/4 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
        <div className="h-4 w-2/3 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-700"></div>
      </div>
    </article>
  );
};
