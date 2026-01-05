import Link from 'next/link';
import { FragmentCard } from '~/components/fragment-card';
import { ArrowRightIcon } from '~/components/social-icons';
import { getFragments, type FragmentData } from '~/utils/fragments';

type HomeFragmentsProps = {
  title?: string;
  fragments?: FragmentData[];
  maxFragments?: number;
};

export function HomeFragments({
  title = 'Fragments',
  fragments,
  maxFragments = 3,
}: HomeFragmentsProps) {
  const allFragments = fragments ?? getFragments().slice(0, maxFragments);

  if (allFragments.length === 0) return null;

  return (
    <div className="col-span-1">
      <Link
        href="/fragments"
        className="group flex w-max items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <h2 className="font-sans! text-lg font-semibold text-zinc-500 group-hover:text-blue-600 sm:text-lg dark:text-zinc-100 dark:group-hover:text-blue-400">
          {title}
        </h2>
        <ArrowRightIcon className="h-4 w-4 fill-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:fill-blue-600 dark:fill-zinc-400 dark:group-hover:fill-blue-400" />
      </Link>
      <div className="mt-2 divide-y divide-zinc-200/70 border-b border-zinc-200/70 dark:divide-zinc-700/50 dark:border-zinc-700/50">
        {allFragments.map((fragment) => (
          <FragmentCard key={fragment.id} fragment={fragment} />
        ))}
      </div>
    </div>
  );
}
