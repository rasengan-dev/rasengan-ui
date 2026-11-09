import { useEffect, useRef, useState } from 'react';
import type { BlockEntry } from '@/blocks-catalogue';
import { ScopedTheme } from '@/components/theme-scope';
import type { Settings } from '@/settings';

/** The width a thumbnail renders its block at, before scaling it down: a desktop, or a narrower one for a thin navbar. */
const renderWidth = (block: BlockEntry) => (block.category === 'navbar' ? 800 : 1280);

/**
 * A block, live, at desktop width, scaled down to the card: always up to date, in the theme given. It renders only
 * once it comes near the viewport, so the gallery does not mount every block at once. It is a picture: hidden from
 * assistive tech and inert, the card's link is what you use. A block shorter than the card sits in its middle, on its
 * own background.
 */
export function BlockThumbnail({ block, theme }: { block: BlockEntry; theme: Settings }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [height, setHeight] = useState(0);
  const [near, setNear] = useState(false);
  const width = renderWidth(block);
  const scale = box.width / width;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const resize = new ResizeObserver(([entry]) =>
      setBox({ width: entry.contentRect.width, height: entry.contentRect.height }),
    );
    resize.observe(node);
    const view = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        view.disconnect();
      },
      { rootMargin: '300px' },
    );
    view.observe(node);
    return () => {
      resize.disconnect();
      view.disconnect();
    };
  }, []);

  // The block's own height, to centre a short one (a logo strip) rather than leave it at the top.
  const rendered = near && scale > 0;
  useEffect(() => {
    const node = inner.current;
    if (!node) return;
    const resize = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    resize.observe(node);
    return () => resize.disconnect();
  }, [rendered]);
  const top = Math.max(0, (box.height - height * scale) / 2);

  // The card wears the theme too, so the space around a short block is the block's own background.
  return (
    <ScopedTheme value={theme} className="relative aspect-[16/10] overflow-hidden">
      <div ref={ref} aria-hidden="true" inert className="absolute inset-0">
        {rendered && block.Demo && (
          <div
            ref={inner}
            className="pointer-events-none absolute start-0 top-0 origin-top-left select-none"
            style={{ width, transform: `translateY(${top}px) scale(${scale})` }}
          >
            <block.Demo />
          </div>
        )}
      </div>
    </ScopedTheme>
  );
}
