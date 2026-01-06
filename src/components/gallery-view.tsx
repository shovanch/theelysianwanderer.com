'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { type PhotoImage } from '~/utils/photos';

const Lightbox = dynamic(() => import('~/components/lightbox'));

type GalleryViewProps = {
  images: PhotoImage[];
};

export function GalleryView({ images }: GalleryViewProps) {
  const [open, setOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);

  return (
    <>
      <div className="columns-2 gap-2 sm:columns-3 lg:columns-4">
        {images.map((image, index) => (
          <div
            key={image.src}
            className="group relative mb-2 cursor-pointer break-inside-avoid overflow-hidden rounded-md"
            onClick={() => {
              setImageIndex(index);
              setOpen(true);
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={imageIndex}
        slides={images.map((img) => ({
          src: img.src,
          alt: img.alt,
          description: img.caption,
        }))}
        render={{
          slide: ({ slide }) => (
            <img
              alt={slide.alt || 'Image'}
              src={slide.src}
              style={{ maxHeight: '90vh', width: 'auto' }}
            />
          ),
        }}
      />
    </>
  );
}
