import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { cn } from '~/utils/utils';

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export const MarkdownContent = ({
  content,
  className,
}: MarkdownContentProps) => {
  return (
    <div className={cn('', className)}>
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="mt-6 mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {children}
            </h3>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed font-normal">{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="mb-4 ml-4 list-disc space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-4 list-decimal space-y-1">{children}</ol>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-4 border-zinc-300 pl-4 text-zinc-600 italic dark:border-zinc-600 dark:text-zinc-400">
              {children}
            </blockquote>
          ),

          // Code blocks
          pre: ({ children }) => (
            <pre className="mb-4 overflow-x-auto rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
              {children}
            </pre>
          ),

          // Inline code
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  {children}
                </code>
              );
            }
            return <code className={className}>{children}</code>;
          },

          // Links
          a: ({ href, children }) => (
            <a
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {children}
            </a>
          ),

          // Images
          img: ({ src, alt }) => (
            <figure className="mb-4">
              <img alt={alt} className="rounded-lg" src={src} />
              {alt && (
                <figcaption className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),

          // Horizontal rule
          hr: () => (
            <hr className="my-6 border-zinc-200 dark:border-zinc-700" />
          ),
        }}
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
