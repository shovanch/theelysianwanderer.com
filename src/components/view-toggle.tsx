'use client';

import { PiGridFourDuotone, PiListDuotone } from 'react-icons/pi';

type ViewMode = 'list' | 'grid';

type ViewToggleProps = {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-700">
      <button
        type="button"
        onClick={() => onViewChange('list')}
        className={`rounded-md p-1.5 transition-colors ${
          view === 'list'
            ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
            : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
        }`}
        aria-label="List view"
        title="List view"
      >
        <PiListDuotone className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => onViewChange('grid')}
        className={`rounded-md p-1.5 transition-colors ${
          view === 'grid'
            ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
            : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
        }`}
        aria-label="Grid view"
        title="Grid view"
      >
        <PiGridFourDuotone className="h-5 w-5" />
      </button>
    </div>
  );
}
