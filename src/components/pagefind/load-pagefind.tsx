'use client';

import { useEffect } from 'react';

export default function LoadPagefind() {
  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === 'undefined') {
        try {
          window.pagefind = await import(
            // @ts-expect-error pagefind generated after build
            /* webpackIgnore: true */ '/_next/static/chunks/pagefind/pagefind.js'
          );
        } catch (_error) {
          window.pagefind = {
            search: () =>
              Promise.resolve({
                results: [
                  {
                    id: 'pretzels',
                    data: async () => ({
                      meta: {
                        title: 'These pretzels are making me thirsty',
                      },
                      url: '/pretzels.html',
                      sub_results: [
                        {
                          excerpt:
                            'these <mark>pretzels</mark> are making me thirsty',
                        },
                      ],
                    }),
                  },
                ],
              }),
            debouncedSearch: () =>
              Promise.resolve({
                results: [
                  {
                    id: 'pretzels',
                    data: async () => ({
                      meta: {
                        title: 'These pretzels are making me thirsty',
                      },
                      url: '/pretzels.html',
                      sub_results: [
                        {
                          excerpt:
                            'these <mark>pretzels</mark> are making me thirsty',
                        },
                      ],
                    }),
                  },
                ],
              }),
          };
        }
      }
    }
    loadPagefind();
  }, []);

  return null;
}
