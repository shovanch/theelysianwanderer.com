/** Surfaces where a note can appear */
export type NoteSurface = 'notes' | 'home' | 'search';

/** Extended frontmatter for notes with nesting support */
export type NoteFrontmatter = {
  title: string;
  slug?: string;
  id?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt: string;
  updatedAt?: string;
  showToc?: boolean;
  surfaces?: NoteSurface[];
  summary?: string;
  coverImage?: string;
  category?: string;
  status?: 'Not started' | 'In progress' | 'Complete';
};

/** A processed note entry in the manifest */
export type NoteEntry = {
  id: string;
  sourcePath: string;
  relativePath: string;
  title: string;
  slug: string;
  canonicalRoute: string;
  frontmatter: NoteFrontmatter;
  body: string;
  isIndexFile: boolean;
  depth: number;
  surfacesOnIndex: boolean;
};

/** The complete notes manifest */
export type NotesManifest = {
  entries: NoteEntry[];
  routeMap: Map<string, NoteEntry>;
  generatedAt: string;
};

/** Validation error types */
export type ManifestValidationError = {
  type: 'canonical_collision';
  route: string;
  files: string[];
  message: string;
};
