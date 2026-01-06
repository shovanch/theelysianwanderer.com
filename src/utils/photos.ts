import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { isDevEnv } from '~/utils/is-dev-env';

export type PhotoImage = {
  src: string;
  filename: string;
  caption?: string;
  alt?: string;
};

export type PhotoGallery = {
  slug: string;
  title: string;
  date: string;
  location?: string;
  cover: string;
  coverSrc: string;
  description?: string;
  images: PhotoImage[];
  isPublished: boolean;
};

function getPhotosDirectory() {
  const root = process.cwd();
  return path.join(root, 'src/content/photos');
}

function parseGalleryImages(content: string, slug: string): PhotoImage[] {
  // Matches: ![alt](file.webp) or ![alt](file.webp "caption")
  const imageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
  const images: PhotoImage[] = [];

  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const [, alt, rawPath, caption] = match;
    const filename = rawPath.replace(/^\.\//, '').replace(/^assets\//, '');

    images.push({
      src: `/images/content/photos/${slug}/${filename}`,
      filename,
      caption: caption || undefined,
      alt: alt || caption || filename,
    });
  }

  return images;
}

function autoDiscoverImages(slug: string): PhotoImage[] {
  const dir = path.join(getPhotosDirectory(), slug);

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|gif)$/i.test(f))
    .sort();

  return files.map((filename) => ({
    src: `/images/content/photos/${slug}/${filename}`,
    filename,
    alt: filename,
  }));
}

export function getPhotoGalleries(): PhotoGallery[] {
  const photosDirectory = getPhotosDirectory();

  if (!fs.existsSync(photosDirectory)) {
    console.warn(`Directory not found: ${photosDirectory}`);
    return [];
  }

  const allFiles = globSync([path.join(photosDirectory, '*/index.md')]);

  const galleries: PhotoGallery[] = [];

  for (const filePath of allFiles) {
    try {
      const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(markdownWithMeta);

      const slug = path.basename(path.dirname(filePath));
      const isPublished = data.isPublished === true;

      // In production, only show published galleries
      if (!isDevEnv && !isPublished) {
        continue;
      }

      // Parse images from markdown content, or auto-discover if none listed
      let images = parseGalleryImages(content, slug);
      if (images.length === 0) {
        images = autoDiscoverImages(slug);
      }

      // Extract description (text before image list)
      const descriptionMatch = content.match(/^([^!]+)/);
      const description = descriptionMatch
        ? descriptionMatch[1].trim()
        : undefined;

      const cover = data.cover || (images.length > 0 ? images[0].filename : '');

      galleries.push({
        slug,
        title: data.title || slug,
        date: data.photoTaken ? String(data.photoTaken).trim() : '',
        location: data.location ? String(data.location).trim() : undefined,
        cover,
        coverSrc: `/images/content/photos/${slug}/${cover}`,
        description: description || undefined,
        images,
        isPublished,
      });
    } catch (error) {
      console.warn(`Error reading gallery from ${filePath}:`, error);
      continue;
    }
  }

  // Sort by date, newest first
  return galleries.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPhotoGallery(slug: string): PhotoGallery | null {
  const galleries = getPhotoGalleries();
  return galleries.find((g) => g.slug === slug) || null;
}
