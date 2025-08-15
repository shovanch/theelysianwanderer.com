import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Read my latest posts',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
