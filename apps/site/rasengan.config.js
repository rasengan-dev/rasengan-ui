import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(async () => {
  return {
    // The address `pnpm registry` expects by default (Rasengan's own default, 5320, is v1's apps/ui).
    server: { development: { port: 3200 } },
    vite: {
      plugins: [tailwindcss(), rasengan({})],
      resolve: {
        // Rasengan puts its own "@" → ./src alias first, which would shadow the paths below.
        // Give it a name nothing imports and declare "@" last ourselves.
        symbole: '@rasengan-src-unused',
        alias: [
          // Components import the paths they have once installed; these point them at the Base UI sources.
          { find: /^@\/components\/ui\/(.+)$/, replacement: '../../registry/components/$1/$1.base.tsx' },
          { find: '@/lib/utils', replacement: '../../packages/core/src/utils.ts' },
          { find: '@/registry', replacement: '../../registry' },
          { find: '@', replacement: './src' },
        ],
      },
    },
  };
});
