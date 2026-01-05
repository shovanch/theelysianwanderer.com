import { type Metadata } from 'next';
import { Crimson_Pro, Inter, Newsreader } from 'next/font/google';
import Script from 'next/script';
import { Providers } from '~/app/providers';
import { Layout } from '~/components/layout';
import '../styles/index.css';
import '../styles/toc.css';
import { baseUrl } from './sitemap';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  preload: true,
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  style: ['italic', 'normal'],
  preload: true,
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['normal'],
  weight: ['600', '700'],
  preload: true,
});

export const metadata: Metadata = {
  robots: {
    noarchive: true,
  },
  title: {
    template: '%s • The Elysian Wanderer',
    default: 'The Elysian Wanderer',
  },
  // metadataBase: new URL(baseUrl),
  description: 'Tales of a Wanderer',
  alternates: {
    types: {
      'application/rss+xml': `${baseUrl}/feed.xml`,
    },
  },
  openGraph: {
    title: 'The Elysian Wanderer',
    description: 'Tales of a Wanderer',
    url: baseUrl,
    siteName: 'The Elysian Wanderer',
    images: [
      {
        url: `${baseUrl}/og`,
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${crimsonPro.variable} ${inter.variable} ${newsreader.variable} h-full antialiased`}
      lang="en"
    >
      <head>
        <link
          crossOrigin="anonymous"
          fetchPriority="low"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib"
          rel="stylesheet"
        />
      </head>

      <body className="flex h-full bg-zinc-50 dark:bg-[#111110]">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              data-website-id="bd7f3375-928e-40a7-a1cf-dd5a11e26cf4"
              src="/umami/script.js"
              strategy="afterInteractive"
            />
            <Script id="umami-outbound-tags" strategy="afterInteractive">
              {`
    (() => {
      const name = 'outbound-link-click';
      const isExternal = (a) => {
        try {
          return a.host !== window.location.host;
        } catch { return false; }
      };
      document.querySelectorAll('a').forEach(a => {
        if (isExternal(a) && !a.getAttribute('data-umami-event')) {
          a.setAttribute('data-umami-event', name);
          a.setAttribute('data-umami-event-url', a.href);
        }
      });
    })();
  `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
