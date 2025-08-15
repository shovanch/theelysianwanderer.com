import { Container } from '~/components/container';
import { MarkdownContent } from '~/components/markdown-content';
import LoadPagefind from '~/components/pagefind/load-pagefind-wrapper';
import { PhotosCarousel } from '~/components/photos-carousel';
import { PostCard } from '~/components/post-card';
import { Signature } from '~/components/signature';
import {
  ChefIcon,
  GamingIcon,
  GoodreadsIcon,
  InstagramIcon,
  MailIcon,
} from '~/components/social-icons';
import { SocialLink } from '~/components/social-link';
import { getPosts, sortPostsByDate } from '~/utils/posts';
import { getTextContent } from '~/utils/texts';

export default async function Home() {
  // Fetch all content from each category
  const allContentTypes = ['posts', 'travels', 'notes', 'reads'] as const;
  const allWritings = allContentTypes
    .flatMap((type) => getPosts(type, type === 'reads' ? 3 : undefined))
    .sort(sortPostsByDate)
    .slice(0, 15);

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
      <Container
        className="mt-8 mb-16 md:mt-16"
        innerClassName="grid grid-cols-1 md:grid-cols-1 gap-12 md:gap-18"
      >
        {allWritings.length > 0 && (
          <div className="col-span-1">
            <h2 className="text-2xl font-medium tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
              Writings
            </h2>
            <div className="mt-2 divide-y divide-zinc-200/70 border-t border-b border-zinc-200/70 dark:divide-zinc-700/50 dark:border-zinc-700/50">
              {allWritings.map((post, index) => (
                <div
                  key={`${post.subdirectory}-${post.slug}`}
                  className={`py-5 md:py-6 ${index === allWritings.length - 1 ? 'border-b-0' : ''}`}
                >
                  <PostCard
                    key={`${post.subdirectory}-${post.slug}`}
                    post={post}
                    showPill={true}
                    showTags={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
