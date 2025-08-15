import clsx from 'clsx';

export function Container({
  className,
  innerClassName,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { innerClassName?: string }) {
  return (
    <div
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className={clsx('mx-auto max-w-2xl lg:max-w-5xl', innerClassName)}>
        {children}
      </div>
    </div>
  );
}
