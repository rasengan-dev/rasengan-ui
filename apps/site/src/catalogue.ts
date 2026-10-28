import type { ComponentType } from 'react';

interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  status: 'beta' | 'stable';
  engines: readonly string[];
}

const metas = import.meta.glob<{ meta: ComponentMeta }>('../../../registry/components/*/meta.ts', { eager: true });
const demos = import.meta.glob<{ default: ComponentType }>('../../../registry/components/*/*.demo.tsx', { eager: true });

/** Every component in registry/components, with its default demo. */
export const components = Object.entries(metas)
  .map(([path, { meta }]) => {
    const dir = path.slice(0, -'meta.ts'.length);
    const demo = Object.entries(demos).find(([file]) => file.startsWith(dir));
    return { ...meta, Demo: demo?.[1].default };
  })
  .sort((a, b) => a.title.localeCompare(b.title));
