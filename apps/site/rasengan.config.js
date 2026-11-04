import { readFile } from 'node:fs/promises';
import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import mdx from '@rasenganjs/mdx/plugin';
import tailwindcss from '@tailwindcss/vite';
import { codeToHtml } from 'shiki';

/*
 * The same pair as the MDX code blocks; styles/index.css shows the one matching `.dark`. GitHub's light
 * theme rather than Hiraiship's light-plus, whose tokens fall under 4.5:1 on Iwa's warmer card.
 */
const themes = { light: 'github-light-default', dark: 'vesper' };

/**
 * `import demo from './button.demo.tsx?source'` gives `{ code, html }`: the file as written and
 * highlighted at build time, so a page shows a demo's real source instead of a copy of it.
 */
function source() {
  return {
    name: 'rasengan-ui:source',
    enforce: 'pre',
    async load(id) {
      if (!id.endsWith('?source')) return;
      const file = id.slice(0, -'?source'.length);
      this.addWatchFile(file);
      const code = (await readFile(file, 'utf8')).trimEnd();
      const html = await codeToHtml(code, { lang: file.split('.').pop(), themes, defaultColor: false });
      return `export default ${JSON.stringify({ code, html })};`;
    },
  };
}

export default defineConfig(async () => {
  return {
    // Every page is rendered to HTML at build time (static/): the site and the registry ship as static files, with no
    // server code per request (a server-rendered page costs ~50-100 ms of CPU, over a Worker's budget).
    prerender: true,
    // The address `pnpm registry` expects by default (Rasengan's own default, 5320, is v1's apps/ui).
    server: { development: { port: 3200 } },
    vite: {
      plugins: [tailwindcss(), rasengan({}), mdx({ code: { theme: themes, keepBackground: false } }), source()],
      resolve: {
        // Rasengan puts its own "@" → ./src alias first, which would shadow the paths below.
        // Give it a name nothing imports and declare "@" last ourselves.
        symbole: '@rasengan-src-unused',
        alias: [
          // Components import the paths they have once installed; these point them at the Base UI sources.
          { find: /^@\/components\/ui\/(.+)$/, replacement: '../../registry/components/$1/$1.base.tsx' },
          { find: '@/lib/utils', replacement: '../../packages/core/src/utils.ts' },
          { find: '@/lib/village-scope', replacement: '../../packages/core/src/village-scope.tsx' },
          { find: '@/lib/field-context', replacement: '../../packages/core/src/field-context.tsx' },
          { find: '@/registry', replacement: '../../registry' },
          { find: '@', replacement: './src' },
        ],
      },
    },
  };
});
