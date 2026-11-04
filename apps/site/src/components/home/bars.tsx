import { cn } from '@/lib/utils';

/**
 * A bar chart with no library: one div per value, in the nature's primary, the last bar full and
 * the others faded. Read as one image; `label` says what it shows.
 */
export function Bars({
  values,
  label,
  className,
}: {
  values: number[];
  label: string;
  className?: string;
}) {
  const max = Math.max(...values);
  return (
    <div role="img" aria-label={label} className={cn('flex items-end gap-1', className)}>
      {values.map((value, i) => (
        <div
          key={i}
          className={cn(
            'flex-1 rounded-t-sm bg-primary transition-[height] duration-base',
            i !== values.length - 1 && 'opacity-35',
          )}
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}
