import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Elsewhere on the internet',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
