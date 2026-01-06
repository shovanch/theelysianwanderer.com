import Link from 'next/link';
import { type PostData, type PostMetaOnly } from '~/utils/posts';

export function ReadsGridCard({ post }: { post: PostData | PostMetaOnly }) {
  const { slug, subdirectory } = post;
  const { title, coverImage } = post.meta;

  const coverSrc = coverImage
    ? coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2]
      ? `/images/content/reads/${coverImage.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2].replace('assets/', '')}`
      : coverImage
    : null;

  return (
    <Link
      href={`/${subdirectory}/${slug}`}
      className="group flex flex-col items-center"
    >
      {/* Book Cover with inverted hover effect */}
      <div className="relative cursor-pointer p-4">
        <div className="relative">
          {/* Book Inside - Creates the depth/page effect (hidden by default, shown on hover) */}
          <div className="absolute top-[1%] left-4 h-[96%] w-[90%] rounded-r-md border border-gray-400 bg-white opacity-0 shadow-[10px_40px_40px_-10px_rgba(0,0,0,0.19),_-2px_0px_0px_inset_gray,_-3px_0px_0px_inset_#dbdbdb,_-4px_0px_0px_inset_white,_-5px_0px_0px_inset_#dbdbdb,_-6px_0px_0px_inset_white,_-7px_0px_0px_inset_#dbdbdb,_-8px_0px_0px_inset_white,_-9px_0px_0px_inset_#dbdbdb] transition-opacity duration-300 group-hover:opacity-100" />

          {/* Main Book Cover - starts flat, rotates on hover */}
          <div className="relative cursor-pointer rounded-md leading-none shadow-[6px_6px_16px_-2px_rgba(0,0,0,0.2),_12px_12px_24px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out perspective-[2000px] group-hover:-translate-x-2.5 group-hover:scale-x-[0.94] group-hover:-rotate-y-[15deg] group-hover:rounded-r-md group-hover:shadow-[6px_6px_18px_-2px_rgba(0,0,0,0.2),_24px_28px_40px_-6px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_12px_-2px_rgba(255,255,255,0.1)] dark:group-hover:shadow-[6px_6px_18px_-2px_rgba(255,255,255,0.15),_24px_28px_40px_-6px_rgba(255,255,255,0.08)]">
            <div className="relative cursor-pointer rounded-md leading-none group-hover:rounded-r-md">
              {/* Container for the cover image */}
              <div className="relative h-40 w-28 overflow-hidden rounded-md group-hover:rounded-r-md md:h-60 md:w-40">
                {coverSrc ? (
                  <img
                    alt={`Cover of ${title}`}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    src={coverSrc}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-700">
                    <span className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                      No cover
                    </span>
                  </div>
                )}

                {/* Light overlay (shown on hover) */}
                <div className="absolute top-0 right-0 z-4 h-full w-[90%] rounded-sm bg-linear-to-r from-white/0 to-white/20 opacity-0 transition-all duration-300 group-hover:opacity-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-2 line-clamp-2 max-w-40 text-center font-serif text-sm font-medium text-zinc-800 capitalize transition-colors group-hover:text-teal-600 md:text-base dark:text-zinc-100 dark:group-hover:text-teal-400">
        {title}
      </h3>
    </Link>
  );
}
