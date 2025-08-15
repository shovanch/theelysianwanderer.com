# The Elysian Wanderer

This is the source code for my personal website and blog at [theelysianwanderer.com](https://theelysianwanderer.com/). A modern, performant personal blog built with Next.js 15, featuring unified content management through Obsidian and advanced developer tooling.

**Note**: All content, posts, and notes in this repository are my personal work. Feel free to use the codebase as a template, but please replace all content with your own.

## Features

### Content Management

- **Unified Content System**: All content types (posts, notes, reads, travels) and static site copy stored in Obsidian vault
- **Git Submodule Integration**: Content synced from external Obsidian vault repository
- **Automatic Asset Management**: Images and assets automatically copied during build
- **Full-text Search**: Static site search powered by Pagefind

### Modern Web Technologies

- **Next.js 15**: Latest App Router with React 19
- **TailwindCSS v4**: Modern CSS framework with minimal configuration
- **TypeScript**: Full type safety throughout the application
- **Turbo**: Enhanced development and build performance
- **Motion**: Smooth animations and transitions
- **Dark Mode**: System-aware theme switching

### Developer Experience

- **Modern Tooling**: ESLint 9, Prettier, TypeScript, Husky
- **Code Quality**: Pre-commit hooks, automated formatting, and linting
- **Performance**: Optimized builds with console log removal and image optimization
- **Search**: Static site search with no external dependencies

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/theelysianwanderer.com
cd theelysianwanderer.com

# Install dependencies
pnpm install

# Initialize git submodules (for content)
git submodule update --init --recursive

# Start development server
pnpm dev
```

### Development Commands

```bash
# Development
pnpm dev                 # Start development server with Turbo
pnpm build:local         # Build for production locally
pnpm build               # Production build via Vercel script
pnpm start               # Start production server

# Code Quality
pnpm lint                # Run ESLint
pnpm lint:fix            # Run ESLint with auto-fix
pnpm format              # Format code with Prettier
pnpm typecheck           # Run TypeScript type checking

# Content Management
pnpm sync-content        # Sync content from Obsidian vault
pnpm generate-pagefind   # Generate search index
```

## Architecture

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── content/            # Obsidian vault (Git submodule)
├── lib/                # Utility libraries and configurations
├── types/              # TypeScript type definitions
└── utils/              # Content processing utilities

public/
└── images/             # Static images organized by content type
```

### Content System

Content is managed through an Obsidian vault stored as a Git submodule. Each piece of content includes frontmatter with metadata:

```yaml
---
category: notes
isPublished: true
publishedAt: 2025-03-17
showToc: true
slug: wesleyan-social-psychology-notes
status: Not started
tags:
  - psychology
title: Notes from Wesleyan's Social Psychology
---
```

### Key Technologies

**Frontend**

- Next.js 15 with App Router
- React 19
- TailwindCSS v4
- TypeScript
- Motion for animations

**Content Processing**

- next-mdx-remote for server-side MDX rendering
- gray-matter for frontmatter parsing
- Rehype/Remark plugins for enhanced markdown processing
- reading-duration for automatic reading time calculation

**Developer Tools**

- ESLint 9 with flat config
- Prettier with TailwindCSS plugin
- Husky for git hooks
- lint-staged for pre-commit formatting
- TypeScript for type safety

**Search & Performance**

- Pagefind for static site search
- Sharp for image optimization
- Turbo for faster builds
- WebP image format optimization

## Content Management Workflow

1. **Create Content**: Write in Obsidian with frontmatter metadata (blog content) or plain markdown (site copy)
2. **Sync Content**: Content automatically synced during build process via Git submodule
3. **Asset Management**: Images copied from content directories to public folder
4. **Build Process**: Content processed, site built, search index generated
5. **Deploy**: Static site deployed to Vercel or similar platform

### Obsidian Integration

All content, including blog posts and static site copy (hero text, about page), is managed through Obsidian:

- **Blog Content**: Stored in respective directories with frontmatter
- **Site Copy**: Stored in `/src/content/texts/` as plain markdown files
- **Real-time Updates**: Changes in development are reflected immediately
- **Production Updates**: Require submodule update and rebuild/redeploy

## Customization

### Styling

- Modify TailwindCSS configuration in `tailwind.config.ts`
- Customize fonts and colors in CSS files
- Adjust component styles in respective component files

### Content Types

- Add new content types by extending the content processing utilities
- Update TypeScript types in `src/types/content.ts`
- Modify content fetching logic in `src/utils/posts.ts`

### Build Process

- Customize build scripts in `scripts/` directory
- Modify content synchronization in `scripts/sync-content.js`
- Adjust Vercel build process in `scripts/vercel-build.sh`

## Deployment

The site is optimized for deployment on Vercel with automatic builds triggered by repository updates. The build process:

1. Syncs content from Git submodule
2. Copies assets to public directory
3. Builds Next.js application with Turbo
4. Generates search index with Pagefind
5. Deploys static assets and API routes

## Performance Features

- **Static Generation**: All content pages pre-rendered at build time
- **Image Optimization**: Automatic WebP conversion and responsive sizing
- **Code Splitting**: Automatic code splitting with Next.js
- **Search Optimization**: Client-side search with static index
- **Caching**: Optimized caching strategies for static assets

## License

The codebase is open source and available under the MIT License. All content, including blog posts, notes, and site copy, is the intellectual property of Shovan Chatterjee.

## Contact

- **Website**: [shovanch.com](https://shovanch.com)
- **GitHub**: [@shovanch](https://github.com/shovanch)
- **Email**: [hello@shovanch.com](mailto:hello@shovanch.com)

---

Built with ❤️using modern web standards and optimized for performance, accessibility, and developer experience.
