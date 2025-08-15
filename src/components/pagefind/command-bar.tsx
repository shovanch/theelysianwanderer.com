'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import { SearchIcon } from '../social-icons';

// Define types for search results
type SearchResultData = {
  meta: {
    title: string;
  };
  url: string;
  sub_results: {
    excerpt: string;
  }[];
};

type SearchResult = {
  id: string;
  title?: string;
  description?: string;
  url?: string;
  data: () => Promise<SearchResultData>;
};

export function CommandBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  async function fetchResults(query: string) {
    if (window.pagefind) {
      if (query === '') {
        const search = await window.pagefind.debouncedSearch('');
        setResults(search.results);
      } else {
        const search = await window.pagefind.debouncedSearch(query);
        setResults(search.results);
      }
    }
  }

  useEffect(() => {
    fetchResults(query);
  }, [query]);

  const handleResultClick = (url: string) => {
    setQuery('');
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <button
        aria-label="Open search (Ctrl+K)"
        className="group button-press focus-ring theme-transition pointer-events-auto flex cursor-pointer items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        type="button"
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        <SearchIcon className="h-5 w-5 fill-blue-500 dark:fill-zinc-200" />
        {/* <p className="hidden text-sm md:block">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-sm border px-1.5 font-sans text-[10px] font-medium opacity-100">
            Ctrl K
          </kbd>
        </p> */}
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {!query && results.length === 0 ? (
            <CommandEmpty>
              <p>Type a search query to see results</p>
            </CommandEmpty>
          ) : null}

          {query && results.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : null}

          {results.length > 0 ? (
            <CommandGroup heading="Results">
              {results.map((result) => (
                <SearchResultItem
                  key={result.id}
                  handleClick={handleResultClick}
                  result={result}
                />
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}

function SearchResultItem({
  result,
  handleClick,
}: {
  result: SearchResult;
  handleClick: (url: string) => void;
}) {
  const [data, setData] = useState<SearchResultData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const resultData = await result.data();
      setData(resultData);

      const path = resultData.url.match(/\/([^/]+)\.html$/);
      const extractedUrl = path ? path[1] : '';
    }

    fetchData();
  }, [result]);

  const resultHtml = () => {
    if (!data) return '';
    return (
      '... ' +
      data?.sub_results?.map((sub) => sub.excerpt).join('... ') +
      ' ...'
    );
  };

  const html = resultHtml();

  const formattedUrl = useMemo(() => {
    if (!data) return '';
    // Extract the path from URLs like "/_next/static/chunks/app/server/app/stories/fairy-tales-we-wrote.html"
    // We want to get "/stories/fairy-tales-we-wrote" from this example
    const parts = data?.url?.split('/app');
    const path = parts?.length > 1 ? parts[1].split('.html')[0] : '';
    return path;
  }, [data]);

  if (!data) return null;

  return (
    <CommandItem
      value={result.id}
      onSelect={() => {
        handleClick(formattedUrl);
      }}
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">{data.meta.title}</h3>
        <p
          className="line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </CommandItem>
  );
}
