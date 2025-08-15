/* eslint-disable */
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

// Plugin to group consecutive images into image grids
export function rehypeImageGrid() {
  return (tree: Root) => {
    // Process the tree to find consecutive images
    visit(
      tree,
      'element',
      (node: any, index: number | undefined, parent: any) => {
        if (
          node.tagName === 'p' &&
          parent &&
          typeof index === 'number' &&
          'children' in node
        ) {
          // Check if this paragraph contains only images
          const images = node.children.filter(
            (child: any) => child.type === 'element' && child.tagName === 'img',
          );

          // If paragraph contains only images (and possibly whitespace), collect them
          const isImageOnlyParagraph = node.children.every(
            (child: any) =>
              (child.type === 'element' && child.tagName === 'img') ||
              (child.type === 'text' && /^\s*$/.test(child.value)),
          );

          if (images.length > 0 && isImageOnlyParagraph) {
            if (images.length === 1) {
              // Single image - keep as is (standard img tag)
              // No special handling needed
            } else if (images.length > 1) {
              // Multiple images in same paragraph - convert directly to ImageGrid
              const imagesData = images.map((img: any) => ({
                src: img.properties?.src || '',
                alt: img.properties?.alt || '',
                caption:
                  img.properties?.alt &&
                  img.properties?.alt !== img.properties?.src
                    ? img.properties?.alt
                    : undefined,
              }));

              const imageGridNode: any = {
                type: 'element',
                tagName: 'ImageGrid',
                properties: {
                  images: JSON.stringify(imagesData),
                },
                children: [],
              };

              // Replace the paragraph with ImageGrid
              if ('children' in parent) {
                parent.children[index] = imageGridNode;
              }
            }
          }
        }
      },
    );

    // Second pass: look for consecutive img elements and group them

    // Process the entire tree to find groups of consecutive image elements
    const processConsecutiveImages = (parent: any) => {
      if (!parent.children) return;

      const children = parent.children;
      let index = 0;

      while (index < children.length) {
        const child = children[index];

        // Check if this is a paragraph with single img element
        if (
          child.type === 'element' &&
          child.tagName === 'p' &&
          child.children?.length === 1
        ) {
          const innerChild = child.children[0];
          if (innerChild.type === 'element' && innerChild.tagName === 'img') {
            // Look for consecutive paragraphs with single images
            const consecutiveImageParagraphs = [child];
            let index_ = index + 1;

            while (
              index_ < children.length &&
              children[index_].type === 'element' &&
              children[index_].tagName === 'p' &&
              children[index_].children?.length === 1 &&
              children[index_].children[0].type === 'element' &&
              children[index_].children[0].tagName === 'img'
            ) {
              consecutiveImageParagraphs.push(children[index_]);
              index_++;
            }

            // If we found multiple consecutive image paragraphs, create ImageGrid
            if (consecutiveImageParagraphs.length > 1) {
              const imagesData = consecutiveImageParagraphs.map(
                (paragraph: any) => {
                  const img = paragraph.children[0];
                  return {
                    src: img.properties?.src || '',
                    alt: img.properties?.alt || '',
                    caption:
                      img.properties?.alt &&
                      img.properties?.alt !== img.properties?.src
                        ? img.properties?.alt
                        : undefined,
                  };
                },
              );

              const imageGridNode: any = {
                type: 'element',
                tagName: 'ImageGrid',
                properties: {
                  images: JSON.stringify(imagesData),
                },
                children: [],
              };

              // Replace all consecutive image paragraphs with single ImageGrid
              children.splice(
                index,
                consecutiveImageParagraphs.length,
                imageGridNode,
              );
            }
          }
        }

        // Recursively process children
        if (child.children) {
          processConsecutiveImages(child);
        }

        index++;
      }
    };

    processConsecutiveImages(tree);
  };
}
