# ADR-0005 — The site is prerendered and deployed on Hiraiship as static files

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-04 |
| Replaces | — |

## Context

The v1 site was on Vercel, whose project settings broke when v1 moved to `archive/`. For the v2 launch the site had to
be hosted somewhere that serves the registry as JSON. Hiraiship is the maintainer's own platform. Server-rendering
there is not possible within budget: a page takes about 45 to 100 ms of CPU on Node and about 2 s under local workerd,
while a Worker plan allows 10 to 50 ms per request.

## Decision

- `apps/site/rasengan.config.js` sets `prerender: true`: every page is rendered to HTML at build time into
  `apps/site/static/`, plus `404.html`, and Hiraiship deploys it as a static site.
- The site's own build script runs `scripts/registry.mjs` (with `RASENGAN_UI_URL` defaulting to
  `https://ui.rasengan.dev`), then `rasengan build`, then `scripts/sitemap.mjs`. Hiraiship's project settings: root
  `apps/site`, build command `pnpm run build`.
- Analytics come from the `RASENGAN_GA_ID` build variable (`G-…` for gtag.js or `GTM-…` for Tag Manager), rendered by
  `template.tsx`, set on production only.
- A root `.npmrc` pins `node-version=22.12.0`, because Hiraiship's image runs the repository's pnpm 8.10 binary, which
  reports its bundled Node 18 and skips the native bindings of rolldown and Tailwind.

## Options ruled out

- **Fix Vercel**: possible, but the maintainer chose to host on their own platform.
- **Server rendering on a Worker**: over the CPU budget, see above.

## Consequences

- Nothing on the site may need a server per request. Interactive parts (search, workshop, settings) run in the browser.
- `rasengan build` can exit 0 after failing; `sitemap.mjs` fails the build when the output is missing.
- Hiraiship redirects `/x` to `/x/` for folder pages, so the sitemap's URLs end with a slash.

## Revisit when

The repository moves to pnpm 10 or later (drop the `.npmrc` line), or the site needs server code.
