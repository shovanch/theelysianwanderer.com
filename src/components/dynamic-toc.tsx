'use client';

import { useEffect, useState } from 'react';
import type { TocHeading } from '~/types/toc';
import type { PostData } from '~/utils/posts';
import { extractToc } from '~/utils/toc';

type DynamicTOCProps = {
  postData: PostData;
  readingTime?: string | number;
};

export function DynamicTOC({ postData, readingTime }: DynamicTOCProps) {
  // Extract TOC from postData
  const headings = extractToc(postData.content, 1, 3);
  const [activeHeading, setActiveHeading] = useState<string>('');
  // const [headingProgress, setHeadingProgress] = useState<
  //   Record<string, HeadingProgress>
  // >({});
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState(0);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  // Flatten all headings for mobile display and active detection
  const getAllHeadings = (headings: TocHeading[]): TocHeading[] => {
    const result: TocHeading[] = [];

    const flatten = (headingList: TocHeading[]) => {
      headingList.forEach((heading) => {
        result.push(heading);
        if (heading.children && heading.children.length > 0) {
          flatten(heading.children);
        }
      });
    };

    flatten(headings);
    return result;
  };

  // Use flattened headings for active detection
  const allHeadings = getAllHeadings(headings);

  useEffect(() => {
    // Show TOC after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    let timeoutId: NodeJS.Timeout;

    const calculateProgress = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined')
        return;

      // Calculate overall scroll progress
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pageProgress = Math.min((scrollTop / scrollHeight) * 100, 100);
      setScrollProgress(pageProgress);

      // Find active heading and its index - include all heading levels
      // First try to find elements by our generated slugs, then fallback to finding by text content
      const headingElements = allHeadings
        .map((h) => {
          let element = document.getElementById(h.slug);

          // If not found by slug, try to find by matching text content in actual headings
          if (!element) {
            const allHeadings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
            );
            element = allHeadings.find((heading) => {
              const text = heading.textContent
                ?.replace(/^#*\s*/, '')
                .replace(/#$/, '')
                .trim();
              return text === h.text;
            }) as HTMLElement | null;
          }

          return element;
        })
        .filter(Boolean);

      let activeHeadingId = '';
      let activeIndex = 0;

      // Find the currently active heading - include both H2 and H3 headings
      for (let index = 0; index < headingElements.length; index++) {
        const element = headingElements[index];
        if (!element) continue;
        const rect = element.getBoundingClientRect();

        // Use a smaller threshold for better accuracy with nested headings
        if (rect.top <= window.innerHeight * 0.2) {
          activeHeadingId = element.id;
          activeIndex = index;
        }
      }

      if (activeHeadingId) {
        setActiveHeading(activeHeadingId);
        setSelectedHeadingIndex(activeIndex);
      }

      ticking = false;
    };

    const debouncedCalculateProgress = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateProgress, 50); // Debounce for 50ms
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    const handleResize = () => {
      debouncedCalculateProgress();
    };

    calculateProgress();

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
    }

    return () => {
      clearTimeout(timeoutId);
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [allHeadings]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard navigation when TOC is visible and not typing in inputs
      if (
        !isVisible ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (selectedHeadingIndex > 0) {
            const newIndex = selectedHeadingIndex - 1;
            const heading = allHeadings[newIndex];
            if (heading) {
              handleHeadingClick(heading.slug);
              setSelectedHeadingIndex(newIndex);
            }
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (selectedHeadingIndex < allHeadings.length - 1) {
            const newIndex = selectedHeadingIndex + 1;
            const heading = allHeadings[newIndex];
            if (heading) {
              handleHeadingClick(heading.slug);
              setSelectedHeadingIndex(newIndex);
            }
          }
          break;
        case 'Enter': {
          event.preventDefault();
          const currentHeading = allHeadings[selectedHeadingIndex];
          if (currentHeading) {
            handleHeadingClick(currentHeading.slug);
          }
          break;
        }
        case 'Escape':
          event.preventDefault();
          if (isMobileOpen) {
            setIsMobileOpen(false);
          }
          break;
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isVisible, selectedHeadingIndex, allHeadings, isMobileOpen]);

  const handleHeadingClick = (slug: string) => {
    if (typeof document === 'undefined') return;

    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const renderHeading = (heading: TocHeading, level = 0) => {
    const isActive = activeHeading === heading.slug;

    return (
      <li key={heading.slug} className={`relative toc-level-${level}`}>
        <div className="relative">
          {/* Simple active indicator */}
          <div
            className={`absolute top-0 left-0 w-0.5 transition-all duration-300 ease-out ${
              isActive
                ? 'bg-blue-500 opacity-100'
                : 'bg-zinc-300 opacity-40 dark:bg-zinc-600'
            }`}
            style={{ height: '100%' }}
          />

          {/* Heading link */}
          <button
            className={`group block w-full rounded-r-md py-1 pr-2 pl-4 text-left text-base transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 ${
              isActive
                ? 'bg-blue-50/70 font-medium text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                : 'text-zinc-600 dark:text-zinc-400'
            } ${level > 0 ? 'ml-4' : ''}`}
            onClick={() => handleHeadingClick(heading.slug)}
          >
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              {heading.text}
            </span>
          </button>
        </div>

        {/* Child headings */}
        {heading.children && heading.children.length > 0 && (
          <ul className="mt-1">
            {heading.children.map((child) => renderHeading(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  // Only show TOC if article has 3+ headings or reading time > 5 minutes
  const shouldShowTOC = () => {
    // Show if we have 3 or more headings (including H3s)
    if (allHeadings.length >= 3) return true;

    // Or show if reading time is 5+ minutes
    if (readingTime) {
      const minutes =
        typeof readingTime === 'number'
          ? readingTime
          : parseInt(readingTime.match(/\d+/)?.[0] || '0');
      return minutes >= 5;
    }

    return false; // Don't show if neither condition is met
  };

  if (allHeadings.length === 0 || !shouldShowTOC()) return null;

  return (
    <>
      {/* Desktop TOC */}
      <nav
        aria-label="Table of contents"
        className={`fixed bottom-6 left-6 z-10 max-w-64 transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } hidden xl:block`}
      >
        <div className="max-h-[70vh] w-full overflow-x-hidden overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-xs [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb:hover]:bg-gray-500 dark:[&::-webkit-scrollbar-thumb:hover]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="mb-3 -ml-1.5 flex items-center gap-2">
            {/* Simple circular progress indicator */}
            <div className="relative h-4 w-4">
              <svg
                className="h-full w-full -rotate-90 transform"
                viewBox="0 0 32 32"
              >
                {/* Background circle */}
                <circle
                  className="text-zinc-300 dark:text-zinc-600"
                  cx="16"
                  cy="16"
                  fill="none"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  className="text-blue-500 transition-all duration-300"
                  cx="16"
                  cy="16"
                  fill="none"
                  r="14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="5"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 14}`,
                    strokeDashoffset: `${2 * Math.PI * 14 * (1 - scrollProgress / 100)}`,
                  }}
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              On this page
            </h3>
          </div>
          <ul className="space-y-1">
            {headings.map((heading) => renderHeading(heading))}
          </ul>
        </div>
      </nav>

      {/* Mobile TOC */}
      <div className="xl:hidden">
        {/* Mobile TOC Toggle Button */}
        <button
          aria-label="Toggle table of contents"
          className="fixed right-6 bottom-6 z-[40] flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 hover:opacity-80 dark:bg-zinc-100 dark:text-zinc-900"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <svg
            className="h-6 w-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileOpen ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            ) : (
              <>
                <path
                  d="M8 6h13M8 12h13M8 18h13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
                <circle cx="4" cy="6.5" fill="currentColor" r="1" />
                <circle cx="4" cy="12" fill="currentColor" r="1" />
                <circle cx="4" cy="18" fill="currentColor" r="1" />
              </>
            )}
          </svg>
        </button>

        {/* Mobile TOC Panel */}
        <div
          className={`fixed inset-0 z-40 flex items-end justify-center transition-all duration-300 ease-out ${
            isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out ${
              isMobileOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={() => setIsMobileOpen(false)}
          />

          {/* TOC Panel */}
          <div
            className={`relative w-full max-w-sm transform rounded-t-lg bg-white p-6 shadow-xl transition-transform duration-300 ease-out dark:bg-zinc-900 ${
              isMobileOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                On this page
              </h3>
              <button
                className="rounded-full p-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                onClick={() => setIsMobileOpen(false)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <ul className="space-y-2">
                {allHeadings.map((heading) => (
                  <li key={heading.slug}>
                    <button
                      className={`block w-full rounded px-3 py-2 text-left text-base transition-colors ${
                        activeHeading === heading.slug
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                      } ${heading.depth > 2 ? 'ml-4 text-sm' : ''}`}
                      onClick={() => {
                        handleHeadingClick(heading.slug);
                        setIsMobileOpen(false);
                      }}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DynamicTOC;
