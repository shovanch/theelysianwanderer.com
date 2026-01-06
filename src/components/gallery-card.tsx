import Link from 'next/link';
import { PiMapPinDuotone, PiImagesDuotone } from 'react-icons/pi';
import { formatDate } from '~/utils/format-date';
import { type PhotoGallery } from '~/utils/photos';

type GalleryCardProps = {
  gallery: PhotoGallery;
};

export function GalleryCard({ gallery }: GalleryCardProps) {
  return (
    <Link
      href={`/photos/${gallery.slug}`}
      className="group relative overflow-hidden rounded-lg"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={gallery.coverSrc}
          alt={gallery.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute right-0 bottom-0 left-0 p-4">
        <h3 className="font-sans! text-base font-semibold text-white">
          {gallery.title}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
          {gallery.date && <time>{formatDate(gallery.date, 'short')}</time>}
          {/* {gallery.location && (
            <span className="flex items-center gap-1">
              <PiMapPinDuotone className="h-4 w-4" />
              {gallery.location}
            </span>
          )} */}
          <span className="flex items-center gap-1">
            <PiImagesDuotone className="h-4 w-4" />
            {gallery.images.length}
          </span>
        </div>
      </div>
    </Link>
  );
}
