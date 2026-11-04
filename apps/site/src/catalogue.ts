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

/** Every component in registry/components, with its default demo, the demo's source, its other demos and its docs page. */
export const components = Object.entries(metas)
  .map(([path, { meta }]) => {
    const all = demosIn(path.slice(0, -'meta.ts'.length));
    const main = all[meta.name];
    return { ...meta, href: `/components/${meta.name}`, Demo: main?.Demo, source: main?.source, demos: all };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export type CatalogueEntry = (typeof components)[number];

export function getComponent(name: string): CatalogueEntry {
  const entry = components.find((c) => c.name === name);
  if (!entry) throw new Error(`No component named "${name}" in registry/components`);
  return entry;
}
