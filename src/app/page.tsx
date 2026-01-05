import { Container } from '~/components/container';
import { ExploreLinks } from '~/components/explore-links';
import { HomeFragments } from '~/components/home-fragments';
import { HomeListing } from '~/components/home-listing';
import { MarkdownContent } from '~/components/markdown-content';
import LoadPagefind from '~/components/pagefind/load-pagefind-wrapper';
import { PhotosCarousel } from '~/components/photos-carousel';
import { Signature } from '~/components/signature';
import {
  ChefIcon,
  GamingIcon,
  GoodreadsIcon,
  InstagramIcon,
  MailIcon,
} from '~/components/social-icons';
import { SocialLink } from '~/components/social-link';
import { getTextContent } from '~/utils/texts';

export default async function Home() {
  // Get hero text content
  const heroContent = getTextContent('hero.md');

  return (
    <>
      <LoadPagefind />
      <Container className="mt-12 md:mt-12">
        <div className="max-w-2xl">
          <div className="-ml-2 lg:-ml-8">
            <Signature className="h-16 md:h-auto" />
          </div>
          <MarkdownContent className="mt-6" content={heroContent} />
          <div className="mt-8 lg:mt-12">
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
                aria-label="Enchanted Forks"
                className="lg:w-max"
                href="https://instagram.com/enchantedforks"
                icon={ChefIcon}
              />
            </ul>
          </div>
        </div>
      </Container>
      <div className="mt-4 sm:mt-12">
        <PhotosCarousel />
      </div>
      <Container className="mt-8 md:mt-12">
        <ExploreLinks />
      </Container>
      <Container
        className="mt-8 mb-16 md:mt-16"
        innerClassName="grid grid-cols-1 md:grid-cols-1 gap-12 md:gap-18"
      >
        <HomeListing />
        <HomeFragments />
      </Container>
    </>
  );
}
