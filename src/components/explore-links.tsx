import Link from 'next/link';

// {
//   title: 'Travels',
//   description: 'Stories from my wanderings',
//   url: '/travels',
// },

const exploreLinks = [
  { title: 'About', description: 'A bit about me', url: '/about' },
  {
    title: 'Writings',
    description: 'Essays and notes',
    url: '/writings',
  },
  {
    title: 'Reads',
    description: 'Books that shaped my thinking',
    url: '/reads',
  },
  {
    title: 'Photos',
    description: 'A visual travel journal',
    url: '/photos',
  },
  {
    title: 'Fragments',
    description: 'Stray thoughts, tiny updates',
    url: '/fragments',
  },
];

export function ExploreLinks() {
  return (
    <section className="mt-8 flex flex-col gap-4 md:gap-4" id="explore">
      <h2 className="font-sans! text-base font-semibold text-zinc-500 sm:text-lg dark:text-zinc-400">
        Explore
      </h2>
      <ul className="flex flex-col gap-2">
        {exploreLinks.map((link) => (
          <li
            className="text:xl flex flex-col md:flex-row md:items-baseline md:gap-2 md:text-2xl"
            key={link.url}
          >
            <Link
              className="w-max shrink-0 font-semibold text-zinc-800 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
              href={link.url}
            >
              {link.title}
            </Link>
            <span className="-mt-1 text-base text-zinc-500 md:mt-0 md:text-xl dark:text-zinc-400">
              {link.description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
