import { MDXComponents } from 'mdx/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { rehypeImageGrid } from '~/lib/rehype-image-grid';
import type { PostData } from '~/utils/posts';
import { ImageGrid, LandscapeImage, PotraitImage } from './image-grid';

type PostContentProps = {
  post: PostData;
};

const components: MDXComponents = {
  LandscapeImage: LandscapeImage,
  PotraitImage: PotraitImage,
  ImageGrid: ImageGrid,
};

export function PostContent({ post }: PostContentProps) {
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        rehypeImageGrid,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            content: {
              type: 'text',
              value: '#',
            },
            properties: {
              ariaHidden: true,
              tabIndex: -1,
              className: ['header-anchor'],
            },
          },
        ],
      ] as unknown[],
    },
  };

  return (
    <MDXRemote
      components={components}
      // @ts-expect-error - MDX plugin types are complex
      options={options}
      source={post.content}
    />
  );
}
