import { redirect } from 'next/navigation';

export default function Posts() {
  // Static redirect to /writings with type=essays
  // Tag filtering is handled client-side on /writings
  redirect('/writings?type=essays');
}
