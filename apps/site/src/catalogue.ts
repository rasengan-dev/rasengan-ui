import type { ComponentType } from 'react';

interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  status: 'beta' | 'stable';
  engines: readonly string[];
}

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

/** Every component in registry/components, with its default demo, the demo's source and its docs page. */
export const components = Object.entries(metas)
  .map(([path, { meta }]) => {
    const dir = path.slice(0, -'meta.ts'.length);
    const demo = Object.entries(demos).find(([file]) => file.startsWith(dir));
    const source = Object.entries(sources).find(([file]) => file.startsWith(dir));
    return { ...meta, href: `/components/${meta.name}`, Demo: demo?.[1].default, source: source?.[1] };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export type CatalogueEntry = (typeof components)[number];

export function getComponent(name: string): CatalogueEntry {
  const entry = components.find((c) => c.name === name);
  if (!entry) throw new Error(`No component named "${name}" in registry/components`);
  return entry;
}
