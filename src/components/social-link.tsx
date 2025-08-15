import clsx from 'clsx';
//
import Link from 'next/link';

export function SocialLink({
  className,
  href,
  icon: Icon,
  'aria-label': ariaLabel,
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  'aria-label': string;
}) {
  // Generate random rotation between -5 and -1 OR 1 and 5 degrees (avoiding 0)
  const randomRotation =
    Math.random() < 0.5
      ? Math.floor(Math.random() * 4) - 5 // -5 to -2
      : Math.floor(Math.random() * 4) + 2; // 2 to 5

  return (
    <li className={clsx(className, 'flex')}>
      <Link
        aria-label={ariaLabel}
        className="group flex transform items-center text-base font-medium text-zinc-800 transition hover:scale-110 hover:text-blue-500 dark:text-zinc-100 dark:hover:text-blue-500"
        href={href}
        style={{ transform: `rotate(${randomRotation}deg)` }}
        target="_blank"
      >
        <Icon className="h-8 w-8 flex-none fill-zinc-900 transition group-hover:fill-blue-500 lg:h-10 lg:w-10 dark:fill-zinc-400 dark:stroke-zinc-400 dark:text-zinc-200" />
        <span className="sr-only">{ariaLabel}</span>
      </Link>
    </li>
  );
}
