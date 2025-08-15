'use client';

import clsx from 'clsx';
import { LazyMotion, domMax } from 'motion/react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import { useRef } from 'react';
import image1 from '~public/images/home/image-1.webp';
import image10 from '~public/images/home/image-10.webp';
import image11 from '~public/images/home/image-11.webp';
import image12 from '~public/images/home/image-12.webp';
import image13 from '~public/images/home/image-13.webp';
import image14 from '~public/images/home/image-14.webp';
import image15 from '~public/images/home/image-15.webp';
import image16 from '~public/images/home/image-16.webp';
import image17 from '~public/images/home/image-17.webp';
import image18 from '~public/images/home/image-18.webp';
import image19 from '~public/images/home/image-19.webp';
import image2 from '~public/images/home/image-2.webp';
import image20 from '~public/images/home/image-20.webp';
import image21 from '~public/images/home/image-21.webp';
import image22 from '~public/images/home/image-22.webp';
import image23 from '~public/images/home/image-23.webp';
import image24 from '~public/images/home/image-24.webp';
import image25 from '~public/images/home/image-25.webp';
import image26 from '~public/images/home/image-26.webp';
import image27 from '~public/images/home/image-27.webp';
import image28 from '~public/images/home/image-28.webp';
import image29 from '~public/images/home/image-29.webp';
import image3 from '~public/images/home/image-3.webp';
import image30 from '~public/images/home/image-30.webp';
import image31 from '~public/images/home/image-31.webp';
import image32 from '~public/images/home/image-32.webp';
import image33 from '~public/images/home/image-33.webp';
import image34 from '~public/images/home/image-34.webp';
import image35 from '~public/images/home/image-35.webp';
import image5 from '~public/images/home/image-5.webp';
import image6 from '~public/images/home/image-6.webp';
import image7 from '~public/images/home/image-7.webp';
import image8 from '~public/images/home/image-8.webp';
import image9 from '~public/images/home/image-9.webp';

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

export function PhotosCarousel() {
  const containerReference = useRef<HTMLDivElement>(null);
  const scrollReference = useRef<HTMLDivElement>(null);

  const firstImages = shuffleArray([
    image1,
    image2,
    image3,
    image5,
    image6,
    image26,
    image7,
    image8,
    image18,
  ]);

  const images = [
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
    image27,
    image28,
    image29,
    image30,
    image31,
    image32,
    image33,
    image34,
    image35,
  ].sort(() => Math.random() - 0.5);

  const allImages = [...firstImages, ...images];

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
      <m.div ref={containerReference} className="w-full overflow-hidden">
        <m.div
          ref={scrollReference}
          className="lg:scrollbar-hide -ml-24 flex w-[calc(100%+20rem)] gap-5 py-4 will-change-transform sm:gap-8 md:-ml-0 lg:overflow-x-scroll"
          drag="x"
          dragConstraints={{ left: -6200, right: 0 }}
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
                delay: (imageIndex % images.length) * 0.1, // Reduced delay for faster initial animation
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
                priority={imageIndex % images.length < 4} // priority load first 4 images
                sizes="(max-width: 640px) 8rem, (max-width: 768px) 15rem, 18rem"
                src={image}
              />
            </m.div>
          ))}
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
