'use client';

import { useEffect } from 'react';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import './youtube.css';

type YouTubeProps = {
  videoId: string;
  title?: string;
};

export function YouTube({ videoId, title }: YouTubeProps) {
  useEffect(() => {
    import('lite-youtube-embed');
  }, []);

  return (
    // @ts-expect-error - lite-youtube is a custom element
    <lite-youtube videoid={videoId} playlabel={title || 'Play video'} />
  );
}
