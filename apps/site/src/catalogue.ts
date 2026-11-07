import type { ComponentType } from 'react';
import { categories, type Category } from '@/registry/categories';

interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  status: 'beta' | 'stable';
  category: Category;
  /** The day it was published, `YYYY-MM-DD`: the site marks it new for a while. */
  added?: string;
  engines: readonly string[];
}

/** How long a component is marked new after its `added` date. */
const NEW_FOR_DAYS = 45;
/* Against the build time, not the visit: a prerendered page and its hydration agree. */
export const isNew = (added?: string) =>
  added !== undefined && __BUILD_TIME__ - Date.parse(added) < NEW_FOR_DAYS * 24 * 60 * 60 * 1000;

export interface Source {
  code: string;
  html: string;
}

const metas = import.meta.glob<{ meta: ComponentMeta }>('../../../registry/components/*/meta.ts', { eager: true });
const demos = import.meta.glob<{ default: ComponentType }>('../../../registry/components/*/*.demo.tsx', { eager: true });
const sources = import.meta.glob<Source>('../../../registry/components/*/*.demo.tsx', {
  query: '?source',
  import: 'default',
  eager: true,
});

/** The demos of one component folder, by name: `button` is `button.demo.tsx`, `button-sizes` is `button-sizes.demo.tsx`. */
function demosIn(dir: string) {
  return Object.fromEntries(
    Object.entries(demos)
      .filter(([file]) => file.startsWith(dir))
      .map(([file, module]) => {
        const name = file.slice(dir.length, -'.demo.tsx'.length);
        return [name, { Demo: module.default, source: sources[file] }];
      }),
  );
}

const order = Object.keys(categories) as Category[];

/**
 * Every component in registry/components, with its default demo, the demo's source, its other demos and its docs
 * page; by category (registry/categories.ts), then by title. The sidebar and the pager walk this order.
 */
export const components = Object.entries(metas)
  .map(([path, { meta }]) => {
    const all = demosIn(path.slice(0, -'meta.ts'.length));
    const main = all[meta.name];
    return {
      ...meta,
      isNew: isNew(meta.added),
      href: `/components/${meta.name}`,
      Demo: main?.Demo,
      source: main?.source,
      demos: all,
    };
  })
  .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || a.title.localeCompare(b.title));

export type CatalogueEntry = (typeof components)[number];

/** The categories that have components, in order, each with its components. Motion is kept even when empty: it has its gallery page. */
export const groups = order
  .map((id) => ({ id, ...categories[id], components: components.filter((c) => c.category === id) }))
  .filter((group) => group.components.length > 0 || group.id === 'motion');

export function getComponent(name: string): CatalogueEntry {
  const entry = components.find((c) => c.name === name);
  if (!entry) throw new Error(`No component named "${name}" in registry/components`);
  return entry;
}
