import Link from 'next/link';

type TypeFilterProps = {
  currentType: string;
  basePath: string;
  currentTag?: string;
};

const types = [
  { value: '', label: 'All' },
  { value: 'essays', label: 'Essays' },
  { value: 'notes', label: 'Notes' },
  { value: 'travels', label: 'Travels' },
];

export function TypeFilter({
  currentType,
  basePath,
  currentTag,
}: TypeFilterProps) {
  return (
    <div className="mb-6 flex items-center gap-1 text-lg">
      {types.map(({ value, label }, index) => {
        const isActive = currentType === value;
        // Preserve tag param when switching type
        const href = value
          ? currentTag
            ? `${basePath}?type=${value}&tags=${currentTag}`
            : `${basePath}?type=${value}`
          : currentTag
            ? `${basePath}?tags=${currentTag}`
            : basePath;

        return (
          <span key={value} className="flex items-center">
            <Link
              href={href}
              className={`transition-opacity hover:opacity-100 ${
                isActive
                  ? 'font-semibold text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-500 opacity-60 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
              }`}
            >
              {label}
            </Link>
            {index < types.length - 1 && (
              <span className="mx-2 text-zinc-300 dark:text-zinc-600">/</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
