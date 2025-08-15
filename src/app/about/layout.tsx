import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About me',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
