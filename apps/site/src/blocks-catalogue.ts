import type { ComponentType } from 'react';
import type { ZodTypeAny } from 'zod';
import { familiesOf, type BlockMeta } from '@/lib/blocks';
import { blockCategories, blockFamilies, type BlockCategory, type BlockFamily } from '@/registry/block-categories';
import { isNew, type Source } from '@/catalogue';

/*
 * Every block in registry/blocks (RFC-0008): its meta, its default demo, its source, its schema and example; by family,
 * then category (registry/block-categories.ts), then title. The sidebar, the pager and /blocks walk this order. A block
 * in both families (RFC-0009) sorts by its first and is listed under each in `blockGroups`.
 */

const metas = import.meta.glob<{ meta: BlockMeta }>('../../../registry/blocks/*/meta.ts', { eager: true });
const demos = import.meta.glob<{ default: ComponentType }>('../../../registry/blocks/*/*.demo.tsx', { eager: true });
const sources = import.meta.glob<Source>('../../../registry/blocks/*/*.base.tsx', { query: '?source', import: 'default', eager: true });
const schemas = import.meta.glob<{ schema: ZodTypeAny }>('../../../registry/blocks/*/schema.ts', { eager: true });
const examples = import.meta.glob<{ example: unknown }>('../../../registry/blocks/*/example.ts', { eager: true });

const familyOrder = Object.keys(blockFamilies) as BlockFamily[];
const categoryOrder = Object.keys(blockCategories) as BlockCategory[];

export const blocks = Object.entries(metas)
  .map(([path, { meta }]) => {
    const dir = path.slice(0, -'meta.ts'.length);
    return {
      ...meta,
      families: familiesOf(meta),
      category: meta.category as BlockCategory,
      isNew: isNew(meta.added),
      href: `/blocks/${meta.name}`,
      Demo: demos[`${dir}${meta.name}.demo.tsx`]?.default,
      source: sources[`${dir}${meta.name}.base.tsx`],
      schema: schemas[`${dir}schema.ts`]?.schema,
      example: examples[`${dir}example.ts`]?.example,
    };
  })
  .sort(
    (a, b) =>
      familyOrder.indexOf(a.families[0]) - familyOrder.indexOf(b.families[0]) ||
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
      a.title.localeCompare(b.title),
  );

export type BlockEntry = (typeof blocks)[number];

/** The families that have blocks, each with its categories that have blocks, in order. */
export const blockGroups = familyOrder
  .map((family) => ({
    id: family,
    ...blockFamilies[family],
    categories: categoryOrder
      .map((id) => ({ id, title: blockCategories[id].title, blocks: blocks.filter((b) => b.families.includes(family) && b.category === id) }))
      .filter((category) => category.blocks.length > 0),
  }))
  .filter((family) => family.categories.length > 0);

export function getBlock(name: string): BlockEntry {
  const entry = blocks.find((b) => b.name === name);
  if (!entry) throw new Error(`No block named "${name}" in registry/blocks`);
  return entry;
}
