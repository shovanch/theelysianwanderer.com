import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reads',
  description: 'Read my latest reads',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
