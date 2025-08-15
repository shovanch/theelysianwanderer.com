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
    const assetsDir = path.join(CONTENT_DIR, contentType, 'assets');
    const publicDir = path.join(PUBLIC_CONTENT_DIR, contentType);
    
    if (fs.existsSync(assetsDir)) {
      // Ensure target directory exists
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      // Copy assets
      execSync(`cp -r "${assetsDir}/"* "${publicDir}/" 2>/dev/null || true`);
      console.log(`   📁 Synced ${contentType} assets`);
    }
  }
}

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  syncContent();
}

export { syncContent, syncAssets };