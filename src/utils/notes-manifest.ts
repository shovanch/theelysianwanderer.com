import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import type {
  NoteEntry,
  NotesManifest,
  NoteFrontmatter,
  ManifestValidationError,
} from '~/types/notes';
import { isDevEnv } from '~/utils/is-dev-env';

const NOTES_DIR = path.join(process.cwd(), 'src/content/notes');

/**
 * Normalizes a string into a URL-safe slug
 * @example "Hello World!" -> "hello-world"
 * @example "DDIA - Chapter 1" -> "ddia-chapter-1"
 */
export function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Computes the canonical route for a note
 * @param relativePath - Path relative to notes directory (e.g., "chess/Hello World.md")
 * @param slug - Normalized slug of the filename
 * @returns Canonical route without leading slash (e.g., "chess/hello-world")
 */
export function computeCanonicalRoute(
  relativePath: string,
  slug: string,
): string {
  const dir = path.dirname(relativePath);
  const filename = path.basename(relativePath, path.extname(relativePath));

  // index.md maps to parent folder
  if (filename.toLowerCase() === 'index') {
    if (dir === '.') {
      return '';
    }
    // Normalize each directory segment
    return dir
      .split('/')
      .map((segment) => normalizeSlug(segment))
      .join('/');
  }

  // Nested file: parent-path/slug
  if (dir !== '.') {
    const normalizedDir = dir
      .split('/')
      .map((segment) => normalizeSlug(segment))
      .join('/');
    return `${normalizedDir}/${slug}`;
  }

  // Flat file: just the slug
  return slug;
}

/**
 * Validates the manifest for route collisions
 * @returns Array of validation errors (empty if valid)
 */
export function validateManifest(
  entries: NoteEntry[],
): ManifestValidationError[] {
  const errors: ManifestValidationError[] = [];

  // Check for canonical route collisions
  const canonicalRoutes = new Map<string, string[]>();
  for (const entry of entries) {
    const existing = canonicalRoutes.get(entry.canonicalRoute) || [];
    existing.push(entry.relativePath);
    canonicalRoutes.set(entry.canonicalRoute, existing);
  }

  for (const [route, files] of canonicalRoutes) {
    if (files.length > 1) {
      errors.push({
        type: 'canonical_collision',
        route,
        files,
        message: `Canonical route collision: "${route}" claimed by: ${files.join(', ')}`,
      });
    }
  }

  return errors;
}

/**
 * Scans the notes directory and builds a complete manifest
 * @throws Error if validation fails
 */
export function buildNotesManifest(): NotesManifest {
  const entries: NoteEntry[] = [];

  if (!fs.existsSync(NOTES_DIR)) {
    console.warn(`Notes directory not found: ${NOTES_DIR}`);
    return {
      entries: [],
      routeMap: new Map(),
      generatedAt: new Date().toISOString(),
    };
  }

  // Scan all .md files recursively
  const files = globSync('**/*.md', {
    cwd: NOTES_DIR,
    absolute: false,
    ignore: ['**/assets/**', '**/node_modules/**'],
  });

  for (const relativePath of files) {
    const sourcePath = path.join(NOTES_DIR, relativePath);
    const content = fs.readFileSync(sourcePath, 'utf-8');
    const { data, content: body } = matter(content);

    const frontmatter = data as NoteFrontmatter;

    // Skip files without required fields
    // In dev mode, only title is required; in prod, both title and publishedAt are required
    if (!frontmatter.title) {
      continue;
    }
    if (!isDevEnv && !frontmatter.publishedAt) {
      continue;
    }

    // Skip unpublished content in production
    if (!isDevEnv && frontmatter.isPublished !== true) {
      continue;
    }

    const filename = path.basename(relativePath, '.md');
    const isIndexFile = filename.toLowerCase() === 'index';

    // Determine slug: frontmatter.slug > normalized filename
    const slug = frontmatter.slug || normalizeSlug(filename);

    // Compute canonical route
    const canonicalRoute = computeCanonicalRoute(relativePath, slug);

    // Determine depth (number of directory separators)
    const depth = (relativePath.match(/\//g) || []).length;

    // Determine if should surface on index
    // Flat files (depth 0) always surface, nested files need surfaces: ['notes']
    const surfacesOnIndex =
      depth === 0 ||
      (Array.isArray(frontmatter.surfaces) &&
        frontmatter.surfaces.includes('notes'));

    // Create stable ID from frontmatter or canonical route
    const id = frontmatter.id || canonicalRoute;

    const entry: NoteEntry = {
      id,
      sourcePath,
      relativePath,
      title: frontmatter.title,
      slug,
      canonicalRoute,
      frontmatter,
      body,
      isIndexFile,
      depth,
      surfacesOnIndex,
    };

    entries.push(entry);
  }

  // Validate manifest
  const errors = validateManifest(entries);
  if (errors.length > 0) {
    const errorMessages = errors.map((e) => `  - ${e.message}`).join('\n');
    throw new Error(`Notes manifest validation failed:\n${errorMessages}`);
  }

  // Build lookup map
  const routeMap = new Map<string, NoteEntry>();
  for (const entry of entries) {
    routeMap.set(entry.canonicalRoute, entry);
  }

  return {
    entries,
    routeMap,
    generatedAt: new Date().toISOString(),
  };
}

// Module-level cache for production
let cachedManifest: NotesManifest | null = null;

/**
 * Gets the notes manifest, using cache in production
 */
export function getNotesManifest(): NotesManifest {
  // Always rebuild in development for hot reloading
  if (isDevEnv) {
    return buildNotesManifest();
  }

  // Use cache in production
  if (!cachedManifest) {
    cachedManifest = buildNotesManifest();
  }

  return cachedManifest;
}

/**
 * Gets a note by its canonical route
 * @returns NoteEntry or null if not found
 */
export function getNoteByRoute(route: string): NoteEntry | null {
  const manifest = getNotesManifest();
  return manifest.routeMap.get(route) || null;
}

/**
 * Gets all notes that should appear on the index page
 */
export function getIndexNotes(): NoteEntry[] {
  const manifest = getNotesManifest();
  return manifest.entries
    .filter((e) => e.surfacesOnIndex)
    .sort((a, b) => {
      const dateA = new Date(
        a.frontmatter.updatedAt || a.frontmatter.publishedAt,
      ).getTime();
      const dateB = new Date(
        b.frontmatter.updatedAt || b.frontmatter.publishedAt,
      ).getTime();
      return dateB - dateA;
    });
}

/**
 * Gets all canonical routes for generateStaticParams
 */
export function getAllNoteRoutes(): string[] {
  const manifest = getNotesManifest();
  return manifest.entries.map((e) => e.canonicalRoute);
}
