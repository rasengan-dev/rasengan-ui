import { useState } from 'react';
import { VillageScope } from '@/lib/village-scope';
import { useSettings, type Settings } from '@/settings';
import type { ThemeControl } from './village-settings';

/**
 * A theme for part of the page (a block preview, the gallery's thumbnails): it starts as the page's and follows it
 * until changed here, then keeps its own choice. Give it to the theme buttons, and its `value` to `ScopedTheme`.
 */
export function useScopedTheme(): ThemeControl {
  const page = useSettings();
  const [own, setOwn] = useState<Partial<Settings>>({});
  return {
    value: { ...page, ...own },
    onChange: (patch) => setOwn((current) => ({ ...current, ...patch })),
  };
}

/** The content, wearing `value`: a VillageScope with the page's background, so a dark preview is dark to its edges. */
export function ScopedTheme({
  value,
  className,
  children,
}: {
  value: Settings;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <VillageScope
      village={value.village}
      nature={value.nature}
      tint={value.tint}
      scheme={value.dark ? 'dark' : 'light'}
      className={['bg-background text-foreground', className].filter(Boolean).join(' ')}
    >
      {children}
    </VillageScope>
  );
}
