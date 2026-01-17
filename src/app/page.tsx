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
        </div>
      </Container>
      <div className="mt-4 sm:mt-12">
        <PhotosCarousel />
      </div>
      <Container
        className="mt-4 mb-16 md:mt-8"
        innerClassName="grid grid-cols-1 md:grid-cols-1 gap-12 md:gap-12"
      >
        <ExploreLinks />
        <HomeListing />
        <HomeFragments />
      </Container>
    </>
  );
}
