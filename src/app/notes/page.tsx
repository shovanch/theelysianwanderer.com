import { redirect } from 'next/navigation';

export default function Notes() {
  // Static redirect to /writings with type=notes
  // Tag filtering is handled client-side on /writings
  redirect('/writings?type=notes');
}
