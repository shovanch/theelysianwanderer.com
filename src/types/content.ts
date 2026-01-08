// Content Types for Obsidian-based Content Management

/** Available content types matching Obsidian frontmatter */
export type ContentType = 'posts' | 'travels' | 'reads' | 'notes';

/** Content status options from Obsidian */
export type ContentStatus = 'Not started' | 'In progress' | 'Complete';

/** Surfaces where content can appear */
export type ContentSurface = 'notes' | 'home' | 'search';

/** Content metadata matching Obsidian frontmatter format */
export type ContentMeta = {
  title: string;
  slug: string;
  category: ContentType;
  isPublished: boolean;
  publishedAt: string;
  showToc: boolean;
  tags: string[];
  status?: ContentStatus;
  summary?: string;
  coverImage?: string;
  readingTime?: string;
  author?: string;
  readingStartedAt?: string;
  readingCompletedAt?: string;
  surfaces?: ContentSurface[];
};

/** Tag interface for tag listings */
export type ContentTag = {
  tag: string;
  count: number;
};

/** Content data structure used throughout the application */
export type PostData = {
  meta: ContentMeta;
  slug: string;
  subdirectory: string;
  content: string;
};
