'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';

const Lightbox = dynamic(() => import('~/components/lightbox'));

// Helper function to check if caption should be hidden (contains image extensions)
function shouldHideCaption(caption?: string): boolean {
  if (!caption) return true;
  const imageExtensions = ['.png', '.webp', '.jpg', '.jpeg', '.gif', '.svg'];
  return imageExtensions.some((extension) =>
    caption.toLowerCase().includes(extension),
  );
}

type ImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  overFlow?: boolean;
};

export function LandscapeImage({ src, alt, className, caption }: ImageProps) {
  const [open, setOpen] = React.useState(false);

  // Don't use alt as caption fallback - only show if explicitly provided

  return (
    <figure className="my-8">
      <div className="lg:relative lg:right-1/2 lg:left-1/2 lg:-mr-104 lg:-ml-104 lg:w-208">
        <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
          <img
            // loading="lazy"
            alt={caption}
            className={clsx(
              'w-full rounded-md object-contain object-center',
              className,
            )}
            sizes="(min-width: 1280px) 1200px, (min-width: 1040px) 100vw, (min-width: 780px) 100vw, 800px"
            src={src}
          />
        </div>
      </div>
      {caption && !shouldHideCaption(caption) && (
        <figcaption className="mx-auto !-mt-5 max-w-3xl text-center text-sm text-zinc-600 italic sm:text-base dark:text-zinc-300">
          {caption}
        </figcaption>
      )}
      <Lightbox
        close={() => setOpen(false)}
        open={open}
        render={{
          slide: () => (
            <img
              alt={alt}
              src={src}
              style={{ maxHeight: '90vh', width: 'auto' }}
            />
          ),
        }}
        slides={[{ src, description: caption || undefined }]}
      />
    </figure>
  );
}

export function PotraitImage({ src, alt, className, caption }: ImageProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <figure className="mx-auto my-8 lg:relative lg:right-1/2 lg:left-1/2 lg:-mr-[50vw] lg:-ml-[50vw] lg:w-screen">
      <div
        className="relative mx-auto aspect-3/4 max-w-lg cursor-pointer lg:max-w-2xl"
        onClick={() => setOpen(true)}
      >
        <img
          // loading="lazy"
          alt={caption}
          className={clsx('rounded-md object-contain', className)}
          sizes="(min-width: 1280px) 672px, (min-width: 1040px) 100vw, (min-width: 780px) 100vw, 400px"
          src={src}
        />
      </div>
      {caption && !shouldHideCaption(caption) && (
        <figcaption className="mt-1 text-center text-sm text-zinc-600 italic sm:text-base dark:text-zinc-300">
          {caption}
        </figcaption>
      )}
      <Lightbox
        close={() => setOpen(false)}
        open={open}
        render={{
          slide: () => (
            <img
              alt={alt}
              src={src}
              style={{ maxHeight: '90vh', width: 'auto' }}
            />
          ),
        }}
        slides={[{ src, description: caption || undefined }]}
      />
    </figure>
  );
}

export function ImageGrid({
  images: imagesProps,
}: {
  images:
    | {
        src: string;
        alt: string;
        priority?: boolean;
        caption?: string;
      }[]
    | string;
}) {
  const [open, setOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);

  // Parse images if it's a string (from rehype plugin)
  const images =
    typeof imagesProps === 'string' ? JSON.parse(imagesProps) : imagesProps;

  // Advanced layout logic
  const getImageLayout = (index: number, totalImages: number) => {
    if (totalImages === 2) {
      return 'col-span-2'; // Side by side
    }

    if (totalImages === 3) {
      return [
        'col-span-4', // First row full
        'col-span-2', // Second row left
        'col-span-2', // Second row right
      ][index];
    }

    if (totalImages === 4) {
      return [
        'col-span-4', // First row full
        'col-span-2', // Second row left
        'col-span-2', // Second row right
        'col-span-4', // Third row full
      ][index];
    }

    // Fallback
    return 'col-span-2';
  };

  let minHeight = 'min-h-160 lg:min-h-224';

  if (images.length === 2) {
    minHeight = 'min-h-64 lg:min-h-128';
  }

  if (images.length === 3) {
    minHeight = 'min-h-96 lg:min-h-224';
  }

  if (images.length === 4) {
    minHeight = 'min-h-160 lg:min-h-288';
  }

  return (
    <figure className="my-8">
      <div className="lg:relative lg:right-1/2 lg:left-1/2 lg:-mr-104 lg:-ml-104 lg:w-208">
        <div className={`grid h-full grid-cols-4 gap-2 ${minHeight}`}>
          {images.map(
            (
              image: {
                src: string;
                alt: string;
                priority?: boolean;
                caption?: string;
              },
              index: number,
            ) => (
              <div
                key={`${image.src}-${index}`}
                className={clsx(
                  'relative cursor-pointer overflow-hidden rounded-md',
                  getImageLayout(index, images.length),
                )}
                onClick={() => {
                  setImageIndex(index);
                  setOpen(true);
                }}
              >
                <img
                  // loading="lazy"
                  alt={image.alt}
                  className="h-full w-full rounded-md object-cover object-center"
                  sizes="(min-width: 1280px) 1200px, (min-width: 1040px) 100vw, (min-width: 780px) 100vw, 800px"
                  src={image.src}
                />
              </div>
            ),
          )}
        </div>
      </div>
      {images.some(
        (img: { caption?: string }) =>
          img.caption && !shouldHideCaption(img.caption),
      ) && (
        <figcaption className="mx-auto mt-1 flex max-w-3xl flex-wrap text-center text-xs text-zinc-600 italic sm:justify-center! sm:text-base dark:text-zinc-300">
          {images
            .filter(
              (img: { caption?: string }) =>
                img.caption && !shouldHideCaption(img.caption),
            )
            .map((image: { src: string; caption?: string }, index: number) => (
              <p
                key={`caption-${image.src}`}
                className="my-0! mr-3 inline text-sm! sm:text-base!"
              >
                {index + 1}. {image.caption}
              </p>
            ))}
        </figcaption>
      )}
      <Lightbox
        close={() => setOpen(false)}
        index={imageIndex}
        open={open}
        render={{
          slide: ({ slide }) => (
            <img
              alt={slide.alt || 'Image'}
              src={slide.src}
              style={{ maxHeight: '90vh', width: 'auto' }}
            />
          ),
        }}
        slides={images.map(
          (img: {
            src: string;
            alt: string;
            priority?: boolean;
            caption?: string;
          }) => ({
            src: img.src,
            description: img.caption,
          }),
        )}
      />
    </figure>
  );
}
