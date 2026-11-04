#!/usr/bin/env node
/**
 * Writes apps/site/static/sitemap.xml and robots.txt after the site's prerender (`rasengan build`):
 *
 *   RASENGAN_UI_URL=https://ui.rasengan.dev node scripts/sitemap.mjs
 *
 * The sitemap lists every page the prerender wrote (each `<route>/index.html`), so it holds exactly what is deployed;
 * 404.html and spa-fallback.html are not pages. URLs have no trailing slash, as the site links them.
 *
 * RASENGAN_UI_URL is where the site is served. Unlike the registry's, it defaults to the production address: a
 * sitemap of localhost URLs is of no use to anyone.
 */
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = join(import.meta.dirname, "..");
const out = join(root, "apps/site/static");
const base = (process.env.RASENGAN_UI_URL || "https://ui.rasengan.dev").replace(/\/$/, "");

// `rasengan build` can exit 0 after a failed build: this is where such a build stops.
if (!existsSync(out)) throw new Error(`No prerendered site in ${relative(root, out)}: run \`rasengan build\` first, or see why it failed above.`);

const routes = readdirSync(out, { recursive: true })
	.filter((file) => file === "index.html" || file.endsWith(`${sep}index.html`))
	.map((file) => `/${file.slice(0, -"index.html".length).split(sep).join("/")}`.replace(/(.)\/$/, "$1"))
	.sort();

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `\t<url><loc>${escape(base + (route === "/" ? "/" : route))}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(out, "sitemap.xml"), sitemap);
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

console.log(`${relative(root, out)}/sitemap.xml: ${routes.length} pages, ${base}; robots.txt points to it.`);
