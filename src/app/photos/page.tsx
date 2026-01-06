import { Container } from '~/components/container';
import { GalleryCard } from '~/components/gallery-card';
import { getPhotoGalleries } from '~/utils/photos';

export const metadata = {
  title: 'Photos',
  description: 'Photo collections from my travels and explorations.',
};

export default function PhotosPage() {
  const galleries = getPhotoGalleries();

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        Photos{' '}
        <sup className="-top-3 -mt-4 text-base text-zinc-500 md:-top-5 md:text-base">
          {galleries.length}
        </sup>
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.length > 0 ? (
          galleries.map((gallery) => (
            <GalleryCard key={gallery.slug} gallery={gallery} />
          ))
        ) : (
          <p className="col-span-full py-6 text-center text-zinc-500">
            No galleries yet.
          </p>
        )}
      </div>
    </Container>
  );
}
