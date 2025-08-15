/* eslint-disable */
declare global {
  interface Window {
    pagefind?: {
      init?: () => Promise<void>;
      search: (query: string) => Promise<{
        results: {
          id: string;
          data: () => Promise<{
            meta: {
              title: string;
            };
            url: string;
            sub_results: {
              excerpt: string;
            }[];
          }>;
        }[];
      }>;
      debouncedSearch: (
        query: string,
        options?: Record<string, unknown>,
      ) => Promise<{
        results: {
          id: string;
          data: () => Promise<{
            meta: {
              title: string;
            };
            url: string;
            sub_results: {
              excerpt: string;
            }[];
          }>;
        }[];
      }>;
    };
  }
}

export {};
