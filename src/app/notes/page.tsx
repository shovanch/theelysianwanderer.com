import { redirect } from 'next/navigation';

export default async function Notes({
  searchParams,
}: {
  searchParams: { tags?: string };
}) {
  const { tags } = await searchParams;

  // Redirect to /writings with type=notes, preserving tags param
  const url = tags
    ? `/writings?type=notes&tags=${tags}`
    : '/writings?type=notes';

  redirect(url);
}
