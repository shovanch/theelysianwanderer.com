import { notFound } from 'next/navigation';
import { Container } from '~/components/container';
import { GalleryView } from '~/components/gallery-view';
import { getPhotoGallery, getPhotoGalleries } from '~/utils/photos';
import { formatDate } from '~/utils/format-date';
import { PiMapPinDuotone } from 'react-icons/pi';

export async function generateStaticParams() {
  const galleries = getPhotoGalleries();
  return galleries.map((gallery) => ({
    slug: gallery.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const gallery = getPhotoGallery(params.slug);

  if (!gallery) return {};

  return {
    title: gallery.title,
    description: gallery.description || `Photo gallery: ${gallery.title}`,
    openGraph: {
      title: gallery.title,
      images: [{ url: gallery.coverSrc }],
    },
  };
}

export default async function PhotoGalleryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const gallery = getPhotoGallery(params.slug);

  if (!gallery) {
    notFound();
  }

  return (
    <Container className="mt-16 pb-8 lg:mt-20">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {gallery.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-600 dark:text-zinc-400">
          {gallery.date && <time>{formatDate(gallery.date, 'short')}</time>}
          {/* {gallery.location && (
            <>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <PiMapPinDuotone className="h-4 w-4" />
                {gallery.location}
              </span>
            </>
          )} */}
        </div>
        {gallery.description && (
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            {gallery.description}
          </p>
        )}
      </header>

      <GalleryView images={gallery.images} />
    </Container>
  );
}
