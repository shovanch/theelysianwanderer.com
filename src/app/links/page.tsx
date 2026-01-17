import Link from 'next/link';
import { Container } from '~/components/container';
import {
  ChefIcon,
  GamingIcon,
  GoodreadsIcon,
  InstagramIcon,
  LetterboxdIcon,
  MailIcon,
  RssIcon,
} from '~/components/social-icons';

const links = [
  {
    label: 'Email',
    handle: 'hi@theelysianwanderer.com',
    href: 'mailto:hi@theelysianwanderer.com',
    icon: MailIcon,
    rotation: -3,
  },
  {
    label: 'Instagram',
    handle: '@theelysianwanderer',
    href: 'https://www.instagram.com/theelysianwanderer/',
    icon: InstagramIcon,
    rotation: 4,
  },
  {
    label: 'Steam',
    handle: 'ElysianSpectre',
    href: 'https://steamcommunity.com/id/ElysianSpectre/',
    icon: GamingIcon,
    rotation: -2,
  },
  {
    label: 'Goodreads',
    handle: 'shovanch',
    href: 'https://www.goodreads.com/shovanch',
    icon: GoodreadsIcon,
    rotation: 5,
  },
  {
    label: 'Letterboxd',
    handle: 'shovanch',
    href: 'https://letterboxd.com/shovanch/',
    icon: LetterboxdIcon,
    rotation: 3,
  },
  {
    label: 'Enchanted Forks',
    handle: '@enchantedforks',
    href: 'https://instagram.com/enchantedforks',
    icon: ChefIcon,
    rotation: -4,
  },
  {
    label: 'RSS',
    handle: '/feed.xml',
    href: '/feed.xml',
    icon: RssIcon,
    rotation: 2,
  },
];

export default function LinksPage() {
  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        Links
      </h1>
      <ul className="mt-6 flex flex-col gap-5 md:mt-8 md:gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="group flex items-center gap-4 text-zinc-800 transition-colors hover:text-blue-600 md:gap-2 md:text-2xl dark:text-zinc-100 dark:hover:text-blue-400"
              href={link.href}
              target="_blank"
            >
              <link.icon
                className="h-10 w-10 flex-none fill-zinc-800 transition group-hover:fill-blue-500 md:h-8 md:w-8 dark:fill-zinc-100"
                style={{ transform: `rotate(${link.rotation}deg)` }}
              />
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <span className="font-semibold">{link.label}</span>
                <span className="text-sm text-zinc-500 group-hover:text-blue-600 md:text-xl dark:text-zinc-400 dark:group-hover:text-blue-400">
                  {link.handle}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
