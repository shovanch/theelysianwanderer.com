'use client';

import dynamic from 'next/dynamic';

const LoadPagefind = dynamic(
  () => import('~/components/pagefind/load-pagefind'),
  {
    ssr: false,
  },
);

export default function LoadPagefindWrapper() {
  return <LoadPagefind />;
}
