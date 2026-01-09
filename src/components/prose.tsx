import clsx from 'clsx';

export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'prose-xl md:prose-xl prose dark:prose-invert prose-headings:scroll-mt-16 prose-headings:text-2xl md:prose-headings:text-3xl lg:scrollbar-hide prose-table:overflow-x-auto prose-table:block prose-table:w-full prose-th:text-lg prose-p:text-black prose-li:text-black prose-strong:text-black dark:prose-p:text-zinc-300 dark:prose-li:text-zinc-300 dark:prose-strong:text-zinc-300',
      )}
      {...props}
    />
  );
}
