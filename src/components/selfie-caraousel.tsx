'use client';

import clsx from 'clsx';
import { LazyMotion, domMax } from 'motion/react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import { useRef } from 'react';
import image1 from '~public/images/about/image-1.webp';
import image10 from '~public/images/about/image-10.webp';
import image11 from '~public/images/about/image-11.webp';
import image12 from '~public/images/about/image-12.webp';
import image14 from '~public/images/about/image-14.webp';
import image2 from '~public/images/about/image-2.webp';
import image3 from '~public/images/about/image-3.webp';
import image4 from '~public/images/about/image-4.webp';
import image5 from '~public/images/about/image-5.webp';
import image6 from '~public/images/about/image-6.webp';
import image7 from '~public/images/about/image-7.webp';
import image8 from '~public/images/about/image-8.webp';
import image9 from '~public/images/about/image-9.webp';

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let index = shuffledArray.length - 1; index > 0; index--) {
    const index_ = Math.floor(Math.random() * (index + 1));
    [shuffledArray[index], shuffledArray[index_]] = [
      shuffledArray[index_],
      shuffledArray[index],
    ];
  }
  return shuffledArray;
}

export function SelfieCarousel() {
  const containerReference = useRef<HTMLDivElement>(null);
  const scrollReference = useRef<HTMLDivElement>(null);

  const firstImages = shuffleArray([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    // image13,
    image14,
  ]);

  const allImages = [...firstImages];

  const rotations = [
    'rotate-1',
    '-rotate-1',
    'rotate-1',
    'rotate-1',
    '-rotate-1',
    'rotate-1',
  ];

  return (
    <LazyMotion features={domMax}>
      <m.div
        ref={containerReference}
        className="mt-16 w-full overflow-hidden sm:mt-20"
      >
        <m.div
          ref={scrollReference}
          className="lg:scrollbar-hide -ml-4 flex w-[calc(100%+0rem)] gap-5 py-4 will-change-transform sm:gap-8 md:-ml-0 lg:overflow-x-scroll"
          drag="x"
          dragConstraints={{ left: -2150, right: 0 }}
          dragElastic={0.45}
          dragMomentum={true}
          dragTransition={{
            // Add smooth drag transition
            bounceStiffness: 600,
            bounceDamping: 30,
          }}
          onDragEnd={(event, info) => {
            // If dragged left beyond a threshold, loop to the start
            if (info.offset.x < -200) {
              info.point.x = 0;
            }
          }}
        >
          {[...allImages].map((image, imageIndex) => (
            <m.div
              key={`${image.src}-${imageIndex}`}
              animate={{ opacity: 1, x: 0 }}
              className={clsx(
                'relative aspect-4/5 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                rotations[imageIndex % rotations.length],
              )}
              initial={{ opacity: 0, x: 50 }}
              style={{
                rotate:
                  rotations[imageIndex % rotations.length].replace(
                    'rotate-',
                    '',
                  ) + 'deg',
              }}
              transition={{
                delay: (imageIndex % allImages.length) * 0.1, // Reduced delay for faster initial animation
                type: 'spring',
                stiffness: 150, // Increased stiffness
                damping: 15, // Added damping for smoother motion
                mass: 1, // Added mass for more natural physics
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                alt={`Photo Carousel Image Number: ${imageIndex + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                placeholder="blur"
                priority={imageIndex % allImages.length < 4} // priority load first 4 images
                sizes="(max-width: 640px) 10rem, (max-width: 768px) 15rem, 18rem"
                src={image}
              />
            </m.div>
          ))}
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
