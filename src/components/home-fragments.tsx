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
    <div className="flex flex-col gap-4 md:gap-6">
      <Link
        href="/fragments"
        className="group hover:text-accent flex w-max items-center gap-1 transition-colors"
      >
        <h2 className="text-text-muted group-hover:text-accent font-sans! text-base font-semibold sm:text-lg">
          {title}
        </h2>
        <ArrowRightIcon className="fill-icon-muted group-hover:fill-accent h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <div className="divide-border-muted divide-y">
        {allFragments.map((fragment) => (
          <div key={fragment.id} className="py-6 first:pt-0 last:pb-0">
            <FragmentCard fragment={fragment} />
          </div>
        ))}
      </div>
      <Link
        href="/fragments"
        className="text-text-muted hover:text-accent text-base italic"
      >
        View more
      </Link>
    </div>
  );
}
