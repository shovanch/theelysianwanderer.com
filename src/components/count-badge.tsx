type CountBadgeProps = {
  count: number;
  variant?: 'title' | 'tag' | 'tag-mobile';
};

export function CountBadge({ count, variant = 'title' }: CountBadgeProps) {
  const styles = {
    title: 'text-base text-text-muted md:text-base',
    tag: 'ml-1 text-sm opacity-50 md:text-sm',
    'tag-mobile': 'ml-1 text-xs opacity-50 md:text-sm',
  };

  return <span className={styles[variant]}>{count}</span>;
}
