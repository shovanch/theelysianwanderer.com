import type { PostData } from './posts';

export const sortEntries = (entries: PostData[]) => {
  return entries.sort((a, b) => {
    return (
      new Date(b.meta.updatedAt || b.meta.publishedAt).getTime() -
      new Date(a.meta.updatedAt || a.meta.publishedAt).getTime()
    );
  });
};
