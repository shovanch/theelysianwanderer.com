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
                  ? 'text-text-primary font-semibold'
                  : 'text-text-muted hover:text-text-secondary opacity-60'
              }`}
            >
              {label}
            </Link>
            {index < types.length - 1 && (
              <span className="text-separator mx-2">/</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
