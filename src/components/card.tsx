//
import clsx from 'clsx';
import Link from 'next/link';

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Card<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  href,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T;
  className?: string;
  href?: string;
}) {
  const Component = as ?? 'div';

  return (
    <Component
      className={clsx(
        className,
        'group relative flex flex-col flex-wrap items-start',
      )}
    >
      {href ? (
        <Card.Link className="flex w-full flex-col flex-wrap" href={href}>
          {children}
        </Card.Link>
      ) : (
        children
      )}
    </Component>
  );
}

Card.Link = function CardLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <Link {...props} prefetch shallow={true}>
        {children}
      </Link>
    </>
  );
};

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
  as,
  href,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
  as?: T;
  href?: string;
}) {
  const Component = as ?? 'h2';

  return (
    <Component className="relative w-fit text-xl font-semibold tracking-tight text-zinc-800 transition-transform duration-300 ease-in-out group-hover:scale-[102%] md:text-2xl lg:text-3xl dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="relative z-10 text-base text-zinc-700 md:mt-2 lg:text-lg dark:text-zinc-300">
      {children}
    </p>
  );
};

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T;
  decorate?: boolean;
}) {
  const Component = as ?? 'p';

  return (
    <Component
      className={clsx(
        className,
        'relative z-10 flex min-w-28 items-center font-sans text-[0.75rem] font-bold tracking-wider text-blue-600 uppercase lg:text-xs dark:text-zinc-400',
        decorate && 'pl-3.5',
      )}
      {...props}
    >
      {decorate && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 flex items-center"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
};
