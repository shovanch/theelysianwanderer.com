import Image from 'next/image';
import { Container } from '~/components/container';
import { MarkdownContent } from '~/components/markdown-content';
import { SelfieCarousel } from '~/components/selfie-caraousel';
import {
  ChefIcon,
  GamingIcon,
  GoodreadsIcon,
  InstagramIcon,
  MailIcon,
} from '~/components/social-icons';
import { SocialLink } from '~/components/social-link';
import { getTextContent } from '~/utils/texts';
import meImage from '~public/images/about/me.webp';

export default function About() {
  // Get about text content
  const aboutContent = getTextContent('about.md');
  return (
    <>
      <Container className="mt-16 mb-4 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-2">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                alt="Shovan standing in front of blue lake"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                placeholder="blur"
                sizes="(min-width: 1024px) 32rem, 20rem"
                src={meImage}
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="!font-serif text-4xl font-semibold text-blue-700 italic sm:text-5xl dark:text-zinc-100">
              Hi, I&apos;m Shovan
            </h1>
            <MarkdownContent className="mt-6" content={aboutContent} />
          </div>
          <div className="mt-4 lg:mt-8 lg:pl-24">
            <ul
              className="flex items-center gap-5 lg:items-start lg:gap-6"
              role="list"
            >
              <SocialLink
                aria-label="Email"
                className="lg:w-max"
                href="mailto:hello@shovanch.com"
                icon={MailIcon}
              />
              <SocialLink
                aria-label="Instagram"
                className="lg:w-max"
                href="https://www.instagram.com/theelysianwanderer/"
                icon={InstagramIcon}
              />
              <SocialLink
                aria-label="Steam"
                className="lg:w-max"
                href="https://steamcommunity.com/id/ElysianSpectre/"
                icon={GamingIcon}
              />
              <SocialLink
                aria-label="Goodreads"
                className="lg:w-max"
                href="https://www.goodreads.com/shovanch"
                icon={GoodreadsIcon}
              />
              <SocialLink
                aria-label="Instagram"
                className="lg:w-max"
                href="https://instagram.com/enchantedforks"
                icon={ChefIcon}
              />
              {/* <SocialLink
                href="https://www.pinterest.com/theelysianwanderer/"
                icon={PinterestIcon}
                className="lg:w-max"
              ></SocialLink> */}
              {/* <SocialLink
                href="https://www.chess.com/stats/overview/shovanc"
                icon={ChessIcon}
                className="lg:w-max"
              >
              </SocialLink> */}
            </ul>
          </div>
        </div>
      </Container>
      <div className="relative -mt-2 mb-20">
        <SelfieCarousel />
      </div>
    </>
  );
}
