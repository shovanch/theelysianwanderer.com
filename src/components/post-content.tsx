import { MDXComponents } from 'mdx/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { rehypeImageGrid } from '~/lib/rehype-image-grid';
import { remarkResolveNoteLinks } from '~/lib/remark-resolve-note-links';
import type { PostData } from '~/utils/posts';
import { ImageGrid, LandscapeImage, PotraitImage } from './image-grid';

type PostContentProps = {
  post: PostData;
  /** For notes: the relative path of the current file (e.g., "chess/index.md") */
  currentPath?: string;
};

const components: MDXComponents = {
  LandscapeImage: LandscapeImage,
  PotraitImage: PotraitImage,
  ImageGrid: ImageGrid,
};

export function PostContent({ post, currentPath }: PostContentProps) {
  // Build remark plugins list
  const remarkPlugins: unknown[] = [remarkGfm, remarkMath];

  // Add note link resolution for notes with a currentPath
  if (post.subdirectory === 'notes' && currentPath) {
    remarkPlugins.push([
      remarkResolveNoteLinks,
      { currentPath, subdirectory: 'notes' },
    ]);
  }

  const options = {
    mdxOptions: {
      remarkPlugins,
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
