import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travels',
  description: 'Read my latest travels',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
