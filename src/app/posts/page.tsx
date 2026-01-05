import { redirect } from 'next/navigation';

export default async function Posts({
  searchParams,
}: {
  searchParams: { tags?: string };
}) {
  const { tags } = await searchParams;

  // Redirect to /writings with type=essays, preserving tags param
  const url = tags
    ? `/writings?type=essays&tags=${tags}`
    : '/writings?type=essays';

  redirect(url);
}
