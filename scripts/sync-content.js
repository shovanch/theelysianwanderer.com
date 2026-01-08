#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const CONTENT_DIR = 'src/content';
const PUBLIC_CONTENT_DIR = 'public/images/content';

async function syncContent() {
  console.log('🔄 Syncing content from Obsidian vault...');
  
  try {
    // Update git submodule
    console.log('📥 Pulling latest content...');
    execSync('git submodule update --remote src/content', { stdio: 'inherit' });
    
    // Sync assets to public directory
    console.log('🖼️  Syncing assets...');
    await syncAssets();
    
    console.log('✅ Content sync completed successfully!');
  } catch (error) {
    console.error('❌ Error syncing content:', error.message);
    process.exit(1);
  }
}

async function syncAssets() {
  const contentTypes = ['posts', 'notes', 'reads', 'travels'];

  // Ensure public content directory exists
  if (!fs.existsSync(PUBLIC_CONTENT_DIR)) {
    fs.mkdirSync(PUBLIC_CONTENT_DIR, { recursive: true });
  }

  for (const contentType of contentTypes) {
    const contentTypeDir = path.join(CONTENT_DIR, contentType);
    const publicDir = path.join(PUBLIC_CONTENT_DIR, contentType);

    // Ensure target directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Sync top-level assets directory
    const assetsDir = path.join(contentTypeDir, 'assets');
    if (fs.existsSync(assetsDir)) {
      execSync(`cp -r "${assetsDir}/"* "${publicDir}/" 2>/dev/null || true`);
    }

    // Sync nested assets directories (e.g., notes/music-theory/assets/)
    await syncNestedAssets(contentTypeDir, publicDir);

    console.log(`   📁 Synced ${contentType} assets`);
  }

  // Sync photos (different structure - images are in folder root, not assets/)
  await syncPhotos();
}

async function syncNestedAssets(contentTypeDir, publicDir) {
  if (!fs.existsSync(contentTypeDir)) return;

  const entries = fs.readdirSync(contentTypeDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'assets' && !entry.name.startsWith('.')) {
      const subDir = path.join(contentTypeDir, entry.name);
      const nestedAssetsDir = path.join(subDir, 'assets');

      if (fs.existsSync(nestedAssetsDir)) {
        // Copy nested assets to public directory
        execSync(`cp -r "${nestedAssetsDir}/"* "${publicDir}/" 2>/dev/null || true`);
      }

      // Recursively check for deeper nested assets
      await syncNestedAssets(subDir, publicDir);
    }
  }
}

async function syncPhotos() {
  const photosDir = path.join(CONTENT_DIR, 'photos');
  const publicPhotosDir = path.join(PUBLIC_CONTENT_DIR, 'photos');

  if (!fs.existsSync(photosDir)) return;

  const folders = fs.readdirSync(photosDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const folder of folders) {
    const srcDir = path.join(photosDir, folder);
    const destDir = path.join(publicPhotosDir, folder);

    fs.mkdirSync(destDir, { recursive: true });

    // Copy only image files (not index.md)
    const files = fs.readdirSync(srcDir)
      .filter(f => /\.(webp|jpg|jpeg|png|gif)$/i.test(f));

    for (const file of files) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    }
  }

  if (folders.length > 0) {
    console.log(`   📷 Synced photos (${folders.length} galleries)`);
  }
}

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  syncContent();
}

export { syncContent, syncAssets };