import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Rough Notes from my studies',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
