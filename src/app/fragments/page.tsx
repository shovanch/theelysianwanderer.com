import { Container } from '~/components/container';
import { FragmentCard } from '~/components/fragment-card';
import { getFragments } from '~/utils/fragments';

export default async function Fragments() {
  const fragments = getFragments();

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        Fragments{' '}
        <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
          {fragments.length}
        </sup>
      </h1>

      <div className="mt-4 divide-y divide-zinc-200/70 dark:divide-zinc-700/50">
        {fragments.length > 0 ? (
          fragments.map((fragment) => (
            <FragmentCard fragment={fragment} key={fragment.id} />
          ))
        ) : (
          <p className="py-6 text-center text-zinc-500">No fragments yet.</p>
        )}
      </div>
    </Container>
  );
}
