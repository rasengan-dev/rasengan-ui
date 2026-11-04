# RFC-0001: Rasengan UI v2 — animated blocks an agent can compose

- Status: Superseded by [RFC-0002](RFC-0002-Rasengan-UI-Villages.md), except the block content contract. Was: Draft (v1 port map proposed, see "Porting v1"; step 2 implemented: `packages/motion`, `packages/directions` with the token layer and `nova`, `apps/ui/src/registry/v2/lib`, `pnpm registry:catalog`, registry items `motion`, `motion-gsap`, `tokens`, `direction-nova`, `blocks-lib`; first block `hero-split-reveal`)
- Author: Dilane Kombou
- Created: 2026-10-22
- Package(s): `apps/ui` (registry), `apps/docs`, new `packages/motion`, new `packages/directions`

## Summary

Rasengan UI v2 is a new collection of **marketing blocks for startup landing
pages**, with **rich animation (Motion and GSAP)**, built so that both a person
and an AI agent can compose a polished page from them.

It keeps what v1 already does well — the shadcn-compatible registry at
`registry.rasengan.dev`, the docs site, the brand — and changes what a block
is:

1. **Content is data.** Every text, link and image a block shows comes from a
   typed `content` prop, validated by a Zod schema, with a realistic example.
2. **Style is tokens.** Blocks only use semantic tokens. An *art direction*
   (fonts, palette, radius, motion intensity) restyles every block at once.
3. **Motion is shared.** Blocks animate through one small primitives library
   (`<Reveal>`, `<SplitText>`, `<ScrollScene>`…) driven by motion tokens, so a
   page moves with one signature instead of thirty.
4. **Every block describes itself.** A `meta.ts` tells an agent (and the docs)
   what the block is for, which directions it suits, how heavy it is and how
   it moves.

v1 blocks stay published as they are ("Classic"). Good v1 layouts are ported
to v2 rather than redrawn.

## Motivation

An audit of the v1 registry (104 `registry:block` items, 123 `.tsx` files)
against what an agent needs to build animated landing pages:

| Finding | Measure | Why it blocks the goal |
|---|---|---|
| No animation | 0 files import Motion or GSAP | Rich animation is the core requirement |
| Text hard-coded in JSX | 3 of 123 files take props | Changing a headline means rewriting JSX: slow, costly and error-prone for an agent |
| Raw colours | e.g. `#202020`, `#434343`, `bg-white/80` in `hero14.tsx` | A theme or art direction cannot restyle the block |
| No metadata | `categories` empty on all 104 items; names `hero-01`…`hero-17` | Nothing to choose a block by |
| Remote images | `registry.rasengan.dev/static/images/...` | Generated sites would depend on our server |
| Theme coupling | every block calls `useTheme()` and sets `dark`/`light` | Unneeded coupling; dark sections need a different mechanism |
| Missing landing sections | no features, bento, logos, stats, how-it-works, product showcase | The core of a startup landing page is absent |
| Outdated stack | `rasengan 1.2.0-beta.1`, Vite 7, `motion ^12` | Current: Rasengan 2.0 beta, Vite 8, Motion 14 |

v1 marketing inventory worth porting: 18 heroes, 6 navbars, 5 footers, 5 FAQs,
5 contact sections, 4 CTAs, 4 team sections, 3 pricing tables, 3 testimonial
sections, 2 full landing examples. The `application-ui` half (forms, booking,
calendar, tables, sidebars) is out of scope here and kept for app building
later.

## Goals

- A block can be added with one command (`npx shadcn add @rasengan-ui/<name>`)
  and is fully owned by the project afterwards.
- An agent can pick blocks from a compact catalog, fill their content without
  touching JSX, switch art direction, and get a coherent, animated page.
- Animations feel premium, respect `prefers-reduced-motion`, keep content
  visible without JavaScript, and stay within a performance budget.
- Works in Rasengan (SSR and SPA) and any React 19 + Tailwind v4 app.

## Non-goals

- Application UI (dashboards, forms, tables) — a later RFC.
- 3D/WebGL scenes — possible later as an optional `engine: "three"`.
- A visual editor. The docs show blocks; editing happens in code or through
  the agent.

## Decisions

| Question | Decision |
|---|---|
| Distribution | shadcn registry: code is **copied** into the project (`registry:block`, `registry:lib`, `registry:theme`) |
| Content | `content` prop, Zod schema, example; no text in JSX |
| Styling | Tailwind v4, semantic tokens only; no raw colours or arbitrary colour values |
| Light/dark | decided by the art direction; one section can invert with `data-surface="inverse"` |
| Animation engines | **Motion 14** for component motion; **GSAP 3.15** (ScrollTrigger, SplitText) for scroll scenes and text splitting; **one engine per block** |
| Shared animation code | `@rasengan-ui/motion`, published as `registry:lib` items (copied, like blocks) |
| Without JavaScript | content is visible; hidden initial states only apply once motion is ready |
| Screenshots and tests | `data-motion="final"` renders every animation in its end state |
| Naming | descriptive kebab-case (`hero-split-reveal`), never numbers |
| v1 | kept as "Classic", unchanged, until ported |

## Detailed design

### Repository layout

```
apps/ui/src/registry/
  classic/                      ← v1, moved as-is (marketing + application-ui)
  v2/
    blocks/
      hero/hero-split-reveal/
        hero-split-reveal.tsx
        schema.ts
        meta.ts
        example.ts
        preview.webp            (generated)
      features/…  bento/…  logos/…  …
    catalog.json                (generated, for agents)
packages/
  motion/                       ← @rasengan-ui/motion source (also served as registry:lib)
  directions/                   ← art directions: tokens + fonts + motion intensity
```

### Anatomy of a block

A block is one folder with four authored files.

**`schema.ts`: the content contract**

```ts
import { z } from "zod";
import { cta, image, richText } from "@/lib/blocks/content";

export const heroSplitRevealSchema = z.object({
  eyebrow: z.string().max(40).optional(),
  headline: z.string().min(8).max(80).describe("One idea, 4–9 words. The words reveal one by one."),
  subheadline: z.string().max(180),
  primaryCta: cta,
  secondaryCta: cta.optional(),
  media: image.describe("Product screenshot or illustration, 16:10, at least 1600px wide."),
  trustLine: z.string().max(60).optional(),
});

export type HeroSplitRevealContent = z.infer<typeof heroSplitRevealSchema>;
```

- Length limits are part of the design: they keep text inside the layout and
  tell an agent how much to write.
- `.describe()` is copy guidance, read by the agent.
- Shared field types live in `registry/v2/lib/content.ts` (installed as
  `@/lib/blocks/content`): `cta`
  (`{ label, href }`), `image` (`{ src, alt, width, height }`), `richText`
  (a small inline subset: `**bold**`, `*em*`, links), `icon` (a Lucide icon
  name), `logo`, `testimonial`, `pricePlan`, `stat`.

**`hero-split-reveal.tsx`: the component**

```tsx
import { SplitText, useScrollTimeline } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";
import type { HeroSplitRevealContent } from "./schema";
import { heroSplitRevealExample } from "./example";

export interface HeroSplitRevealProps {
  content?: HeroSplitRevealContent;
  id?: string;
  className?: string;
}

export function HeroSplitReveal({ content = heroSplitRevealExample, id = "hero", className }: HeroSplitRevealProps) {
  return (
    <section id={id} className={cn("section relative overflow-hidden", className)}>
      {content.eyebrow && <p data-reveal="" className="eyebrow">{content.eyebrow}</p>}
      <SplitText as="h1" by="words" className="display">{content.headline}</SplitText>
      {/* … */}
    </section>
  );
}
```

Rules (checked in review and, where possible, by lint):

1. Every visible string, link and image comes from `content`. Defaults come
   from `example.ts`, so a block renders on its own.
2. Accept `id` (anchor links) and `className` (spacing overrides). No other
   styling props.
3. Only semantic token classes for colour, type, radius and shadow (see
   Tokens). Layout and spacing utilities are free.
4. No `useTheme()`, no `dark`/`light` classes. Inverted sections use
   `data-surface="inverse"`.
5. Animation only through `@/components/motion` primitives, or directly with
   **one** engine following the Motion rules below.
6. No `window`/`document` at module level or during render (SSR).
7. Images: `<img>` with `width`, `height`, `alt`, `loading="lazy"` except
   above the fold, `decoding="async"`. No remote asset hosts.
8. Semantic HTML: one `<h1>` per page (heroes only), sections as `<section>`
   with a heading, links as `<a>`, buttons as `<button>`.
9. **Imports use the paths the block will have once installed**, never
   `@/registry/…`: `@/components/motion`, `@/components/motion/gsap`,
   `@/lib/blocks/content`, `@/lib/blocks/meta`, `@/lib/utils`,
   `@/components/ui/*`, `./sibling`, plus `react`, `lucide-react`, `zod`.
   In this repo, `apps/ui` maps those paths to the sources (tsconfig `paths`
   and the Vite aliases in `rasengan.config.js`); at install time, shadcn's
   usual alias rewriting adapts them to the user's aliases (`@/…` → `~/…`
   was verified). No custom rewriting step exists.

Rules 3, 4 and 9 are enforced by `pnpm registry:catalog` (raw colours,
`useTheme`, `dark:` classes, imports outside the list above).

Files shipped outside `src/` (placeholder images in `public/`) use a `~/`
target in `registry.json` (`~/public/blocks/placeholders/…`): shadcn resolves
`~/` from the project root, while plain targets land under `src/` in projects
that have one.

**`example.ts`: realistic sample content**

Real-sounding startup copy, never lorem ipsum. Images point to local
placeholders shipped with the registry item (`/blocks/placeholders/…`).
The example must parse with the schema (checked in CI).

**`meta.ts`: what the block is, for agents and docs**

```ts
import type { BlockMeta } from "@/lib/blocks/meta";

export const meta = {
  name: "hero-split-reveal",
  title: "Hero — split headline reveal",
  version: "2.0.0",
  category: "hero",
  summary: "Big headline revealed word by word, subcopy, two CTAs, product shot rising on scroll.",
  useWhen: "A product with a clear one-line promise and a strong screenshot.",
  avoidWhen: "No product visual yet; very long headlines.",
  layout: { columns: "stacked", height: "screen", aboveTheFold: true },
  directions: ["nova", "editorial", "swiss"],
  motion: {
    engine: "gsap",
    intensity: 2,
    scrollDriven: true,
    pinned: false,
    primitives: ["SplitText", "Reveal", "ScrollScene"],
  },
  surfaces: ["default", "inverse"],
  content: { images: 1, minWords: 15, maxWords: 60 },
  weight: { jsKb: 9, needs: ["gsap", "gsap/ScrollTrigger", "gsap/SplitText"] },
  pairsWith: ["logos-marquee", "features-bento"],
  status: "stable",
} satisfies BlockMeta;
```

```ts
export interface BlockMeta {
  name: string;                      // kebab-case, unique, == registry item name
  title: string;
  version: string;                   // semver of the block
  category: BlockCategory;
  summary: string;                   // ≤ 160 chars, what it looks like and does
  useWhen: string;                   // ≤ 160 chars, for agents
  avoidWhen?: string;
  layout: {
    columns: "stacked" | "split" | "grid" | "carousel";
    height: "auto" | "screen" | "tall";
    aboveTheFold?: boolean;          // heroes and navbars
  };
  directions: DirectionName[];       // art directions it is designed and tested for
  motion: {
    engine: "motion" | "gsap" | "css" | "none";
    intensity: 0 | 1 | 2 | 3;        // 0 none · 1 subtle · 2 rich · 3 showcase
    scrollDriven: boolean;
    pinned: boolean;                 // pins the viewport (counts against the page budget)
    primitives: MotionPrimitive[];
  };
  surfaces: ("default" | "inverse")[];
  content: { images: number; minWords: number; maxWords: number };
  weight: { jsKb: number; needs: string[] }; // gzip, block code only; npm deps it pulls in
  pairsWith?: string[];              // blocks that read well right after this one
  status: "draft" | "beta" | "stable";
}

export type BlockCategory =
  | "navbar" | "hero" | "logos" | "features" | "bento" | "how-it-works"
  | "product-showcase" | "stats" | "testimonials" | "pricing" | "comparison"
  | "integrations" | "faq" | "cta" | "newsletter" | "team" | "contact" | "footer";
```

### The agent catalog

`pnpm registry:catalog` builds `apps/ui/src/registry/v2/catalog.json` from all
`meta.ts` and `schema.ts` files. It is published at
`registry.rasengan.dev/v2/catalog.json`. One entry per block:

```json
{
  "name": "hero-split-reveal",
  "category": "hero",
  "summary": "Big headline revealed word by word, subcopy, two CTAs, product shot rising on scroll.",
  "useWhen": "A product with a clear one-line promise and a strong screenshot.",
  "directions": ["nova", "editorial", "swiss"],
  "motion": { "engine": "gsap", "intensity": 2, "scrollDriven": true, "pinned": false },
  "weightKb": 9,
  "contentSchema": { "…": "JSON Schema generated from schema.ts (z.toJSONSchema)" },
  "install": "npx shadcn add @rasengan-ui/hero-split-reveal",
  "preview": "https://registry.rasengan.dev/v2/previews/hero-split-reveal.webp"
}
```

The catalog contains no component code. An agent reads it to choose blocks
(a few thousand tokens for the whole collection), installs the chosen ones,
and then mostly writes **content objects**, not JSX.

### How a page uses blocks

Pages keep content apart from layout, so changing copy never touches markup:

```ts
// src/content/home.ts
import type { HeroSplitRevealContent } from "@/components/blocks/hero-split-reveal/schema";
export const hero: HeroSplitRevealContent = { headline: "Ship invoices before coffee", … };
```

```tsx
// src/app/_routes/index.page.tsx
import { HeroSplitReveal } from "@/components/blocks/hero-split-reveal";
import * as home from "@/content/home";

const Page: PageComponent = () => (
  <main>
    <HeroSplitReveal content={home.hero} />
    <LogosMarquee content={home.logos} />
    <FeaturesBento content={home.features} />
  </main>
);
```

### Tokens

Tokens are CSS custom properties set by the art direction and exposed to
Tailwind v4 through `@theme inline`. Blocks use the Tailwind names; directions
set the values.

**Colour (semantic only)**

| Token | Tailwind | Use |
|---|---|---|
| `--surface` | `bg-surface` | page background |
| `--surface-raised` | `bg-surface-raised` | cards, panels |
| `--surface-sunken` | `bg-surface-sunken` | wells, code, inputs |
| `--fg` | `text-fg` | primary text |
| `--fg-muted` | `text-fg-muted` | secondary text |
| `--fg-subtle` | `text-fg-subtle` | captions, placeholders |
| `--border` | `border-border` | hairlines |
| `--brand` | `bg-brand`, `text-brand` | brand colour, primary actions |
| `--brand-fg` | `text-brand-fg` | text on brand |
| `--brand-soft` | `bg-brand-soft` | tinted backgrounds |
| `--glow` | `shadow-glow`, gradients | directions that use light effects |
| `--success`, `--danger` | | states (forms, pricing ticks) |

`[data-surface="inverse"]` swaps the surface and foreground tokens for one
section. That is how a light page gets a dark testimonial band, without
`dark:` classes. shadcn's own tokens (`--background`, `--primary`…) are mapped
onto these, so installed shadcn primitives (Button, Badge…) follow the
direction. The brand colour is `--brand`, not `--accent`: shadcn already uses
`--accent` for hover backgrounds.

**Typography**

| Token | Tailwind | Notes |
|---|---|---|
| `--font-display`, `--font-body`, `--font-mono` | `font-display` … | from the direction |
| `--text-display` (+ `--leading-display`, `--tracking-display`) | `text-display` | fluid `clamp()`, heroes |
| `--text-h2`, `--text-h3` | `text-h2`, `text-h3` | section and card titles |
| `--text-lead` | `text-lead` | subheadlines |
| `--text-body`, `--text-small`, `--text-eyebrow` | | body, captions, kickers |

Utility classes `display`, `h2`, `lead` and `eyebrow` bundle size, leading,
tracking, weight and font family per direction.

**Shape and rhythm**

| Token | Use |
|---|---|
| `--radius-sm`, `--radius`, `--radius-lg`, `--radius-pill` | corners |
| `--shadow-sm`, `--shadow`, `--shadow-lg` | elevation |
| `--section-y` | vertical padding of a section (`.section`) |
| `--container` | max content width |
| `--grain` | 0 or 1: whether the direction overlays a noise texture |

**Motion**

| Token | Default (`nova`) | Use |
|---|---|---|
| `--motion-intensity` | `2` | 0–3, scales distances and enables or disables effects |
| `--dur-fast` / `--dur` / `--dur-slow` | `160ms` / `520ms` / `900ms` | durations |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | entrances |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | scroll scenes |
| `--ease-spring` | Motion spring `{ stiffness: 260, damping: 30 }` | hover and gestures |
| `--reveal-distance` | `24px` | how far elements travel in |
| `--stagger` | `60ms` | delay between siblings |

The same values are exported from TypeScript (`motionTokens` in
`@rasengan-ui/motion`) for Motion and GSAP, which take numbers, not CSS
variables. The direction provider keeps both in sync.

### Motion primitives (`@rasengan-ui/motion`)

Published as `registry:lib` items under `@/components/motion`. Each primitive
is SSR-safe, reads motion tokens, and honours reduced motion and
`data-motion="final"`.

**Provider**

```tsx
<MotionProvider intensity={2}>   {/* in the app root */}
  …
</MotionProvider>
```

- Wraps Motion's `MotionConfig reducedMotion="user"` and
  `LazyMotion features={domAnimation}` (smaller bundle).
- Registers GSAP plugins once, on the client (`ScrollTrigger`, `SplitText`).
- After hydration, sets `data-motion="ready"` on `<html>`. Hidden initial
  states are written as `[data-motion="ready"] [data-reveal] { opacity: 0 }`,
  so **content is visible when JavaScript fails or is slow**, and in the SSR
  HTML that search engines read. Until the provider mounts (it then sets
  `data-motion-hydrated`), a CSS failsafe shows hidden content after 3 s in
  case the app never starts.
- Reads `?motion=final|off` or an existing `data-motion` attribute:
  `final` renders every primitive in its end state immediately (screenshots,
  visual tests, the agent's review); `off` disables motion.

**Motion-based primitives** (engine `motion`)

| Primitive | Does |
|---|---|
| `<Reveal as="div" from="up" delay={0}>` | fade and travel in when it enters the viewport (`whileInView`, `once`) |
| `<Stagger as="ul">` + `<Stagger.Item>` | children reveal one after another (`--stagger`) |
| `<Counter value={12000} format="compact">` | number counts up when visible |
| `<Marquee speed={40} pauseOnHover>` | infinite horizontal loop (logos), CSS transform driven |
| `<Tilt max={8}>` | pointer-driven 3D tilt for cards (disabled on touch) |
| `<Magnetic strength={0.3}>` | element drifts toward the pointer (buttons) |
| `<Parallax speed={0.2}>` | moves at a different rate while scrolling (`useScroll` + `useTransform`) |
| `<Presence>` | `AnimatePresence` with token defaults (tabs, toggles) |

**GSAP-based primitives** (engine `gsap`)

| Primitive | Does |
|---|---|
| `<SplitText as="h1" by="words" mask>` | splits into words, lines or chars (GSAP `SplitText`), reveals with a mask; keeps the full text for screen readers |
| `<ScrollScene pin scrub steps={…}>` | pinned scroll-driven timeline (`ScrollTrigger`), the base of "scrollytelling" blocks |
| `<TextScrub>` | words light up as the user scrolls through a paragraph |
| `useScrollTimeline(scope, build)` | escape hatch: `useGSAP` with scope, `gsap.matchMedia` for reduced motion and breakpoints, automatic cleanup |

**Rules for blocks**

1. One engine per block (`meta.motion.engine`). CSS-only effects
   (`@keyframes`, transitions) are allowed in any block.
2. GSAP code runs only inside `useGSAP` (or `useScrollTimeline`) with a
   `scope` ref. No global selectors, no timelines created during render.
3. Reduced motion: Motion primitives through `MotionConfig`; GSAP through
   `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. When reduced,
   elements appear in place with at most an opacity fade.
4. Animate `transform` and `opacity` only, except where a block's purpose is
   another property (masks, clip paths, SVG strokes).
5. Above the fold, the LCP element (usually the headline) is visible within
   600 ms. A split-word reveal starts at once and finishes within 900 ms.
6. At most **one pinned scene per page**. Pinned blocks set
   `meta.motion.pinned = true` so tools and agents can enforce it.
7. `intensity` scales effects: 0 none, 1 fades only, 2 fades plus travel,
   splits and parallax, 3 adds tilt, magnetic and scrubbed scenes. A block
   declares the intensity it was designed for; the provider can lower it.

### Art directions

An art direction is a complete look: tokens, font pairing, motion intensity,
texture and guidance. Directions are published as registry items
(`direction-<name>`: a CSS file of variables plus a small TS file with fonts
and agent guidance).

```
packages/directions/
  tokens.css         → token layer: Tailwind mapping, shadcn bridge, utilities, motion CSS
  types.ts           → Direction type
  nova/nova.css      → [data-direction="nova"] token values, with inverse values
  nova/nova.ts       → fonts, motion tokens, guidance
```

```ts
export const nova = {
  name: "nova",
  title: "Nova — tech, dark, luminous",
  fonts: { display: "Bricolage Grotesque", body: "Geist", mono: "Geist Mono" },
  motion: { intensity: 2 },
  surface: "dark",
  guidance: {
    copy: "Confident and short. Verbs first. Numbers over adjectives.",
    imagery: "Product UI on dark, glow behind key elements, no stock photos of people.",
    avoid: "Pastel palettes, serif headlines, more than one accent colour.",
  },
} satisfies Direction;
```

Initial set (v2.0):

| Direction | Feel | Display / body fonts | Palette | Radius | Motion |
|---|---|---|---|---|---|
| **nova** | tech, dark, luminous (dev tools, AI, infra) | Bricolage Grotesque / Geist | near-black surfaces, electric accent, glow | 12px | 2, glow and parallax |
| **editorial** | magazine, warm, confident (fintech, B2B services) | Fraunces / Instrument Sans | cream paper, ink, one warm accent, grain | 6px | 1–2, text reveals, no tilt |
| **swiss** | precise, minimal, grid (productivity, SaaS) | Inter Tight / Inter | white, black, one saturated accent | 0–4px | 1, fast and crisp |
| **playful** | friendly, bright (consumer apps, education) | Recoleta / Plus Jakarta Sans | light surfaces, 2 vivid accents, soft shadows | 20px, pills | 3, springs and tilt |
| **luxe** | refined, quiet (premium, design-led brands) | Cormorant Garamond / Manrope | deep neutral, metallic accent, lots of space | 2px | 1, slow and long eases |

**Brand overrides.** A project can override `--brand` (and only a few other
tokens) with a brand colour. The direction derives `--brand-fg`,
`--brand-soft` and `--glow`, and the build warns when text on accent falls
below WCAG AA contrast (4.5:1).

Fonts are self-hosted (`@fontsource`), with only the weights a direction
uses, and `font-display: swap`.

### Initial catalog (v2.0, about 30 blocks)

| Category | Blocks |
|---|---|
| navbar | `navbar-floating` (glass pill), `navbar-split` |
| hero | `hero-split-reveal`, `hero-product-rise`, `hero-gradient-orbit` (nova), `hero-editorial-statement` (editorial), `hero-centered-video` |
| logos | `logos-marquee`, `logos-grid-fade` |
| features | `features-grid-icons`, `features-alternating`, `features-tabs-preview` |
| bento | `bento-glow` (nova), `bento-editorial` |
| how-it-works | `steps-scroll-pinned` (the pinned showcase), `steps-timeline` |
| product-showcase | `showcase-scroll-zoom`, `showcase-tabs` |
| stats | `stats-counters` |
| testimonials | `testimonials-wall`, `testimonial-spotlight` |
| pricing | `pricing-toggle` (monthly/yearly), `pricing-comparison` |
| integrations | `integrations-orbit` |
| faq | `faq-accordion` |
| cta | `cta-glow`, `cta-split` |
| newsletter | `newsletter-inline` |
| footer | `footer-columns`, `footer-statement` |

Ported from v1, refactored to the v2 contract: the strongest heroes (layouts
of `hero-01`…`hero-17` after a visual review), `navbar-01`/`navbar-02` and
the floating navbar, the accordion FAQ, the pricing tables.

### Performance budget

| Item | Budget |
|---|---|
| Block JS (gzip, its own code) | ≤ 8 KB, ≤ 15 KB for showcase blocks |
| Motion (`LazyMotion` + `domAnimation`) | loaded once per page |
| GSAP core + ScrollTrigger + SplitText | loaded only if a block on the page needs them |
| Images | ≤ 200 KB above the fold; AVIF or WebP; explicit dimensions |
| LCP on a mid-range Android over 4G | ≤ 2.5 s |
| CLS | ≤ 0.05 (reveals use transforms, never layout properties) |

`meta.weight` is measured by the registry build, not written by hand.

### Accessibility

- Text split for animation stays one accessible string (`aria-label` on the
  container, split parts `aria-hidden`).
- Marquees and auto-advancing content pause on hover and focus, and stop
  under reduced motion.
- Pinned scenes never trap keyboard focus; every step's content is reachable
  in reading order.
- Contrast AA for all token pairs in every direction (checked in CI).

### Quality gate for a block (definition of done)

A block is `stable` when:

1. `example.ts` parses with `schema.ts`.
2. It renders under SSR without errors (`renderToString`).
3. Lint passes: no raw colours or arbitrary colour values, no `useTheme`,
   no `dark:`, no strings in JSX outside `content` (a custom ESLint rule).
4. It looks right in every direction listed in `meta.directions`, in light
   and inverse surfaces, at 360px and 1440px: screenshots taken with
   `?motion=final`, reviewed, then kept as visual regression baselines.
5. It works with reduced motion (`?motion=off` and the media query).
6. It is within the weight budget (measured).
7. It has a docs page: live preview, direction switcher, content schema
   table, install command.

### How the agent uses v2

This is the contract `rasengan-code` builds on:

| Agent tool | Backed by |
|---|---|
| `list_blocks(category?, direction?)` | `catalog.json` |
| `add_block(name)` | `npx shadcn add @rasengan-ui/<name>` inside the project sandbox |
| `set_direction(name, brand?)` | installs the direction item and fonts, sets `--brand` |
| `edit_file` on `src/content/*.ts` | most copy changes: content objects, validated by the block's schema |
| `check` | TypeScript (content types come from the schemas) + dev server errors |
| visual review | screenshots with `?motion=final`, so scroll-triggered sections are not captured blank |

Agent rules derived from `meta`: one `h1` (one hero), at most one pinned
scene, total page `weightKb` under budget, blocks drawn from the chosen
direction's list.

## Migration and rollout

1. **Groundwork.** Upgrade the apps to Rasengan 2.0 beta, Vite 8, Motion 14,
   GSAP 3.15. Move v1 to `registry/classic/` with unchanged registry names,
   so existing installs keep working.
2. **Foundations.** `packages/motion` (provider and primitives),
   `registry/v2/lib` (content field types, `BlockMeta`), token layer, the
   `nova` and `editorial` directions, lint rule, catalog build.
3. **First 10 blocks**, enough for a complete landing page: `navbar-floating`,
   `hero-split-reveal`, `logos-marquee`, `features-grid-icons`, `bento-glow`,
   `steps-scroll-pinned`, `testimonials-wall`, `pricing-toggle`,
   `faq-accordion`, `cta-glow`, `footer-columns`. One full example page per
   direction.
4. **Docs.** v2 section with direction switcher, motion toggle
   (`full / reduced / final`), schema tables, catalog page.
5. **Agent integration** in `rasengan-code` (tools above), then the remaining
   blocks and the `swiss`, `playful` and `luxe` directions.

## Porting v1 (Classic) blocks

v1 marketing blocks are brought to the v2 contract, not redrawn. The rules:

- **New names.** A ported block gets a descriptive v2 name. The v1 item stays
  published unchanged under its old name (`hero-01`…), so existing installs
  and `shadcn add hero-01` keep working. It is marked Classic and points to
  its replacement (`"meta": { "replacedBy": "<v2 name>" }` on the registry
  item, a "Replaced by" link in the docs). Classic items are deprecated, never
  rewritten in place.
- **Curated, not one for one.** Near-duplicates are merged: blocks that differ
  only in alignment, radius or background art become one v2 block. Where a
  v1 layout matches a block already planned above (`navbar-floating`,
  `pricing-toggle`, `faq-accordion`…), the port *is* that block.
- **Full contract.** Content prop, `schema.ts`, `example.ts`, `meta.ts`,
  tokens and motion, like any v2 block. A ported block passes the same
  quality gate.
- **Marketing only.** `application-ui` stays Classic until its own RFC.

### What the audit found (53 marketing items)

Screenshots of every block at 1280px plus a source scan of
`registry/marketing`:

| Finding | Where | Port action |
|---|---|---|
| Navbar embedded in the section | heroes 01–06, 11, 14–17 import `navbar*`; heroes 07, 09, 10, 12, 13 draw their own; pricing 01–03 and team 01–04 too | v2 sections never contain a navbar; the page composes `navbar-*` + section |
| Theme toggle in the navbar | navbar 01–05, hero 08 (`theme-button1`) | removed: light or dark comes from the direction |
| `useTheme()` or a hard-coded `dark` class | hero 07, 08, 14, user-profile-01 | `data-surface="inverse"` where a section must invert |
| Images from `registry.rasengan.dev/static/…` | every hero but 17, team 01–04, testimonials 01–03, cta 02 and 04, contact 02 and 04 | abstract backgrounds become CSS/SVG drawn with `--brand` and `--glow`; photos and screenshots become local placeholders |
| Raw colours | e.g. hero 13 (16 hex, 39 palette or arbitrary classes), footer 01 (28), hero 09–10 (22 each), landing-01 (36) | semantic tokens |
| Imports from `@/registry/…` (logo, navbar, theme button) | 36 of 53 files | `content.logo` (`logo` field type) and installed paths only (rule 9) |
| Fake latency | faq 01 and 05 (`lib/sleep`) | removed |
| Animation | testimonials 03 only (custom `use-observer`) | Motion primitives everywhere |
| Brand copy in JSX | "Rasengan UI", "Launch Websites. No Code. No Limits." repeated in 34 files | realistic per-block `example.ts` |

### Port map

Priority **P1** = needed for the first full landing page (rollout step 3);
**P2** = rest of the core set; **P3** = niche, after the core set.

**Heroes (17 → 7 new blocks + `hero-split-reveal`)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| hero-01 | port | `hero-gradient-orbit` | centered copy over a blue gradient image; the gradient is redrawn in CSS from `--brand`/`--glow` |
| hero-02 | merge | → `hero-gradient-orbit` | same layout, dark ring art, single CTA |
| hero-03 | port | `hero-left-backdrop` | left-aligned copy, full-bleed abstract art on the right |
| hero-04 | merge | → `hero-left-backdrop` | dark variant, light streaks |
| hero-05 | merge | → `hero-left-backdrop` | dark variant, green glow |
| hero-15 | merge | → `hero-left-backdrop` | adds a logo row → optional `logos` field |
| hero-16 | merge | → `hero-left-backdrop` | adds 3 highlight cards → optional `highlights` field |
| hero-06 | port | `hero-product-rise` | centered copy, product screenshot below on a soft tint |
| hero-11 | merge | → `hero-product-rise` | gradient accent word → `richText` emphasis |
| hero-14 | merge | → `hero-product-rise` | uppercase headline is a direction concern (swiss) |
| hero-07 | merge | → `hero-split-reveal` | dark, dashboard shot with glow: what `hero-split-reveal` already is |
| hero-12 | port | `hero-horizon-logos` | centered copy, glowing horizon arc, logo row |
| hero-13 | merge | → `hero-horizon-logos` | same idea, logo chips and star field |
| hero-09 | merge | → `hero-photo-fullbleed` | centered variant dropped; one alignment per block |
| hero-10 | port | `hero-photo-fullbleed` | photo background, copy anchored bottom-left |
| hero-08 | port | `hero-ui-collage` | layered UI fragments floating around the CTA (Parallax) |
| hero-17 | port | `hero-floating-stats` | stats around the headline, floating cards, star field |

**Navbars (5 → 2)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| navbar-02 | port | `navbar-split` | logo left, links centered, actions right |
| navbar-01, navbar-03 | merge | → `navbar-split` | links left or right only differ in alignment |
| navbar-04 | port | `navbar-floating` **P1** | floating pill; becomes glass on scroll |
| navbar-05 | merge | → `navbar-floating` | radius is a direction token |

Both gain a mobile menu (`Presence`), which v1 lacks.

**Call to action and newsletter (4 + 2 footer tops → 4)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| cta-03 | port | `cta-glow` **P1** | dark card, badge, accent word, one action |
| footer-05 (top half) | merge | → `cta-glow` | plain centered variant = `cta-glow` on the default surface |
| cta-04 | port | `cta-split` | copy left, image right in a card |
| cta-01 | port | `newsletter-inline` | email capture band |
| footer-02 (top half) | merge | → `newsletter-inline` | identical band |
| cta-02 | port **P3** | `cta-app-download` | store badges and phone mock-ups |

**Footers (5 → 1)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| footer-03 | port | `footer-columns` **P1** | logo and tagline, link columns, newsletter, legal row |
| footer-01 | merge | → `footer-columns` | dark version = inverse surface |
| footer-04 | merge | → `footer-columns` | boxed version = `surface-raised` card, a direction choice |
| footer-02, footer-05 | merge | → `footer-columns` | their top halves go to `newsletter-inline` and `cta-glow`; the page composes both |

`footer-statement` stays a new block with no v1 source.

**FAQ (5 → 3)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| faq-03 | port | `faq-accordion` **P1** | simple accordion, two columns from `lg` |
| faq-01 | port | `faq-tabs` | category tabs above the accordion |
| faq-04 | merge | → `faq-tabs` | vertical tabs on desktop, same content shape |
| faq-02 | port | `faq-split` | heading left, accordion right |
| faq-05 | merge | → `faq-split` | the contact form becomes an optional "still have questions" card linking to contact |

**Pricing (3 → 1)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| pricing-02 | port | `pricing-toggle` **P1** | three plans, monthly/yearly toggle, highlighted plan |
| pricing-01 | merge | → `pricing-toggle` | left-aligned heading only |
| pricing-03 | merge | → `pricing-toggle` | "Let's talk" custom plan = a plan with no price |

`pricing-comparison` stays new.

**Testimonials (3 → 2)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| testimonials-03 | port | `testimonials-wall` **P1** | grid with reveal; `use-observer` replaced by `Stagger` |
| testimonials-02 | merge | → `testimonials-wall` | same grid with company logos → optional `logo` per item |
| testimonials-01 | port | `testimonial-spotlight` | one large quote at a time, carousel arrows |

**Team (4 → 2)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| team-01 | port | `team-carousel` | heading left, portraits in a carousel |
| team-02 | merge | → `team-carousel` | name cards over portraits, quote below |
| team-03 | port | `team-grid` | centered heading, portrait grid with short bios |
| team-04 | merge | → `team-grid` | split header, per-person actions → optional `links` |

**Contact (5 → 2)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| contact-01 | port | `contact-split` | info cards and form side by side |
| contact-05 | merge | → `contact-split` | sides swapped only |
| contact-04 | merge | → `contact-split` | image instead of info cards → optional `media` |
| contact-03 | port | `contact-centered` | centered heading, info row, form card |
| contact-02 | merge | → `contact-centered` | info row under the form |

Forms render fields from `content.form` and post to `content.form.action`. No
backend is shipped.

**Page examples (2)**

| v1 | Decision | v2 block | Notes |
|---|---|---|---|
| landing-01 | split | `hero-prompt` (P3) | the "ask the AI" prompt hero is ported; the community grid is application UI and stays Classic. Full landing examples are rebuilt from v2 blocks, one per direction |
| user-profile-01 | keep Classic | — | a link-in-bio profile, not a landing section; revisit with application UI |

### Totals

53 Classic items map to **26 v2 blocks**: 25 new and `hero-split-reveal`,
which also absorbs hero-07. Only user-profile-01 has no v2 successor.
The rest of the initial catalog has no v1 source and is built from scratch:
`logos-marquee`, `logos-grid-fade`, `features-*`, `bento-*`, `steps-*`,
`showcase-*`, `stats-counters`, `integrations-orbit`, `pricing-comparison`,
`footer-statement`, `hero-editorial-statement`, `hero-centered-video`.

The first landing page (P1) uses six ports (`navbar-floating`,
`pricing-toggle`, `testimonials-wall`, `faq-accordion`, `cta-glow`,
`footer-columns`), the existing `hero-split-reveal`, and new
`logos-marquee`, `features-grid-icons`, `bento-glow` and
`steps-scroll-pinned`.

## Alternatives considered

- **Keep v1 and add animation on top.** Rejected: content would still be
  hard-coded and colours raw, the two blockers for an agent.
- **An npm package of blocks instead of a registry.** Rejected: neither the
  agent nor the user could adapt a block, and package updates would change
  live sites.
- **Motion only.** Simpler, but Motion has no equivalent of SplitText or
  pinned, scrubbed ScrollTrigger timelines, which most "premium" landing
  pages rely on.
- **GSAP only.** Possible, but Motion's declarative `whileInView`, layout and
  gesture animations fit React components with less code. One engine per
  block keeps the two from fighting.

## Open questions

1. Licence: GSAP is distributed under its "Standard no-charge license" (npm
   `license` field of `gsap@3.15.0`). Confirm it allows redistributing GSAP
   code inside an MIT registry and in generated client sites.
2. Fonts: some proposed faces (Recoleta) are not open licence. Choose open
   alternatives or drop them.
3. Placeholder images and illustrations: draw a small open set, or generate
   per project in the agent?
4. Is `richText` needed in v2.0, or are plain strings enough at first?
5. Should directions also ship as a standalone CSS file for non-shadcn
   projects?
