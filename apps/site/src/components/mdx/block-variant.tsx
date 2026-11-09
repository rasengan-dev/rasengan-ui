import { getBlock } from '@/blocks-catalogue';

/**
 * `<BlockVariant name="hero-wordmark" demo="hero-wordmark-restaurant" />`: another demo of a block
 * (`<demo>.demo.tsx` in its folder), the same block with other content, in a frame as wide as the page's column.
 * The block answers the frame's width (ADR-0013).
 */
export function BlockVariant({ name, demo }: { name: string; demo: string }) {
  const Demo = getBlock(name).variants[demo];
  if (!Demo) throw new Error(`No demo "${demo}" in registry/blocks/${name} (expected ${demo}.demo.tsx)`);
  return (
    <div data-slot="block-variant" data-demo={demo} className="my-6 overflow-hidden rounded-lg border-village bg-background">
      <Demo />
    </div>
  );
}
