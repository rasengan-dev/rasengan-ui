# RFC-0013 — Portfolio and SaaS blocks: the first sector wave

| | |
|---|---|
| Status | Accepted (2026-11-24). Questions 1 to 7 settled, see "Decisions"; progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-24 |
| Author | Dilane Kombou |
| Builds on | RFC-0008 and RFC-0009 (the block contract, field types, families, the quality gate), ADR-0013 (blocks answer their container), RFC-0010, RFC-0011 and RFC-0012 (the components these blocks are made of), ADR-0014 (placeholder photos), the [Framer templates survey](../surveys/2026-11-23-framer-templates.md) |
| Packages | `registry/blocks/` (new folders), `registry/block-categories.ts` (categories, maybe a family), `packages/blocks` (new field types), `registry/placeholders/`, `apps/site` (block pages, two example pages) |
| Decision needed | — (questions 1 to 7 settled, see "Decisions") |

## Problem

The [survey](../surveys/2026-11-23-framer-templates.md) asked what Framer's templates have that the registry lacks.
RFC-0010 to RFC-0012 answered with components: every P1 motion and interface component now exists. The blocks have
not followed. The registry's 45 blocks serve two kinds of site, a product landing page and a local business; the
survey's other groups find almost nothing:

- **Portfolios and agencies**, the largest group of templates, have no way to show work: no grid of projects, no list
  of projects with the picture on hover, no case study.
- **SaaS sites** have a landing page but none of the pages around it: a changelog, a waitlist, customer stories, the
  security and compliance badges, open positions.
- **Every kind of site** asks for a few sections we lack: a hero with a background video, a hero with the product's
  screen, a marquee of quotes, a press strip, numbered steps without a pinned scroll.

The components for most of these now exist (`hover-image-list`, `horizontal-scroll`, `lightbox`, `video`, `chip`,
`spotlight`, `scroll-progress`, `marquee`…). Without the blocks, Jutsify's starting sites and agents still assemble
these sections by hand, and each does it differently.

The survey lists about thirty P1 blocks across eight groups. This RFC takes the two groups closest to what the
registry already serves, portfolio and SaaS, plus the sections every site asks for. Commerce, directories, hotels,
events, content and health come in later RFCs, which reuse what this one settles (families, collections).

## Goals

1. **Seventeen blocks** in three lots: six for portfolios, six for SaaS, five for every kind of site.
2. **Settle the two questions every later sector RFC needs**: where a new audience goes (a family or categories,
   question 1) and how a list of items links to a page per item (question 2).
3. **Built only from Rasengan UI components**, on the RFC-0008 contract: one typed `content` object, a valid example,
   container queries, the weight budget, the quality gate.
4. **Two example pages**, a portfolio and a SaaS site, made only of blocks, next to `/examples/landing`,
   `/examples/restaurant` and `/examples/salon`.

## Non-goals

- **The other sector groups** (commerce, directories, hotels and travel, events, content, health): later RFCs.
- **Routing, a CMS, generated pages.** Blocks stay sections. A list links to `href`s the project owns (question 2).
- **Backends.** The waitlist posts to a provider or to the project's code, as `newsletter-inline` does (question 3).
- **A Markdown renderer in a block.** Long text is content the block can render without parsing (question 4).
- **New motion or interface components**, except `device-frame` if question 5 keeps it.

## Proposal

### 1. Families and categories

A portfolio is not a product landing page: its sections, its words and its examples differ, and an agent choosing
blocks for a designer's site should not wade through pricing tables. Proposed (question 1): a third family,
**`portfolio`** (people and studios showing their work), next to `marketing` and `storefront`. SaaS stays in
`marketing`: it is the landing page's own audience.

New categories, added in the same commit as their first block:

| Category | Title | Families | First blocks |
|---|---|---|---|
| `projects` | Projects | portfolio | `projects-grid`, `projects-list` |
| `case-study` | Case studies | portfolio | `case-study` |
| `awards` | Awards | portfolio | `awards-list` |
| `experience` | Experience | portfolio | `experience-timeline` |
| `changelog` | Changelog | marketing | `changelog` |
| `waitlist` | Waitlist | marketing | `waitlist` |
| `customers` | Customer stories | marketing | `customer-stories` |
| `trust` | Security and compliance | marketing | `security-badges` |
| `careers` | Careers | marketing | `careers` |
| `press` | Press | marketing, portfolio | `press-logos` |

Existing categories gain the new family where a block serves it: `hero`, `gallery`, `testimonials`, `steps`, `contact`,
`footer`, `navbar` and `team` take `portfolio`; `integrations` gains `integrations-grid`.

### 2. Lists and their pages

Many survey blocks show a list of items that each have a page: projects, case studies, positions, releases. Blocks are
sections, not pages, and the registry has no router. Proposed (question 2):

- **One field type per kind of item**, used by the list and by the detail block alike, so the same object feeds both:
  the project's data is written once in `src/content/`, and the list maps over it while the case study takes one.
- **Lists link with `href`**, a field of the item; the project owns the routes. A list never fetches or filters by URL.
- **A detail block** (`case-study`) renders one item's long content as a section, with a link to the next item.
- The example pages show the pattern: `/examples/portfolio` lists the projects, `/examples/portfolio/<project>` is one
  case study, both fed from one array in `src/content/`.

### 3. New field types in `rasengan-blocks`

| Type | Fields |
|---|---|
| `project` | `title`, `client`, `year`, `kinds` (tags, used by filters), `summary`, `cover` (image), `href`, `results` (up to four `stat`s) |
| `caseSection` | `kind` (`context`, `problem`, `approach`, `results`), `title`, `paragraphs` (plain text), `images` |
| `release` | `version`, `date` (ISO), `title`, `added`, `improved`, `fixed` (lists of short strings), `href` |
| `position` | `title`, `team`, `place` (a city or "Remote"), `kind` (full time, contract…), `href` |
| `award` | `year`, `name`, `project`, `href` |
| `timelineEntry` | `from`, `to` (or "now"), `title`, `organisation`, `description` |
| `customerStory` | `customer` (a `logo`), `quote`, `name`, `role`, `avatar` (image), `stat`, `href` |
| `trustPoint` | `name`, `description`, `icon` (from a fixed set: shield, lock, globe, server, check) |

`stat`, `image`, `logo`, `icon` and `cta` come from RFC-0008 and RFC-0009 unchanged.

### 4. The blocks

Named `<category>-<layout>` as before; each line is its `summary` in short, and the components it uses.

**Lot G, portfolio (6 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `projects-grid` | Projects as cards with their cover, title, client and year, filtered by kind with a count per filter | chip, card, spotlight |
| `projects-list` | Projects as rows, title, client, kind and year; the row's cover follows the mouse | hover-image-list |
| `case-study` | One project's page: cover, facts (client, year, role), the sections, results in numbers, a gallery, the next project | number-roll, lightbox, image-reveal |
| `gallery-horizontal` | A set of photos pinned and moving sideways as the page scrolls; a snapping row on small screens | horizontal-scroll, lightbox |
| `awards-list` | Awards as a table: year, award, project, a link each | table |
| `experience-timeline` | A career or a studio's history, dated entries on a vertical line | separator, text-reveal |

**Lot H, SaaS (6 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `changelog` | Releases, newest first: version, date, title and the added, improved and fixed lists, with an anchor each | badge, separator, scroll-progress |
| `waitlist` | A heading, an email field and a button, the count of people waiting, and its sending, success and error states | input, button, number-roll |
| `customer-stories` | Customer cards: logo, a quote, the person, one number that moved | card, avatar, number-roll |
| `security-badges` | Compliance and security points (SOC 2, GDPR, encryption, uptime) as badges with a line each | badge |
| `integrations-grid` | Integration logos in a grid, filterable by category, each linking to its page | chip, card |
| `careers` | Open positions grouped by team, with place and kind, linking to each position | badge, separator |

**Lot I, every kind of site (5 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `hero-video` | A headline over a muted background video loop, with its pause button; the poster under reduced motion | video, button, text-reveal |
| `hero-product` | Headline, subcopy and actions over the product's screen in a frame | device-frame (question 5), button |
| `process-steps` | Three to six numbered steps in a row or a column, without a pinned scroll | text-reveal |
| `testimonials-marquee` | Columns of quotes that scroll, each column at its own pace, with the marquee's pause button | marquee, card, avatar |
| `press-logos` | "As seen in": press and award logos with an optional quote each (marketing and portfolio) | — |

### 5. Placeholders

Portfolios need **project covers** that look like a designer's or a studio's work, which the food, room and product
placeholders do not. Proposed (question 6): six Unsplash photos under ADR-0014's rules (architecture, an interior, a
product shot, a poster, packaging, a landscape), cropped, WebP in SVG, credited in `CREDITS.md`. SaaS blocks reuse the
product screens and the drawn logo marks. `hero-video` reuses the site's demo video (ADR-0021) and says a project uses
its own file.

### 6. Design notes

- **Filters** (`projects-grid`, `integrations-grid`) are a `ChipGroup` over the items' `kinds`, in the browser, with a
  count per chip; every item is in the prerendered HTML, so the list works without JavaScript.
- **The case study** is long: its sections are plain paragraphs and images, no Markdown (question 4); its results roll
  with `number-roll`; its gallery opens in a `lightbox`.
- **Dates** (`changelog`, `experience-timeline`, `awards-list`) are written with explicit `Intl` options so the server
  and the browser agree (the code tour's rule).
- **The waitlist** shows its states in the block (sending, success, error) and never stores the address itself.

### 7. References: look before building

Every block below has live references on Framer's marketplace, checked on 2026-11-24: the template's page and the
demo page where the section is. **Before a block is built, its references are inspected in a browser**, at a phone's
width and at 1440px: the layout, the states (hover, focus, empty, sending, success), what moves, when and how fast. The
builder writes what they saw in an "Observed" note in the lot's pull request, then designs our version. It is a clean
room, as in RFC-0007 and RFC-0011: we look at behaviour and layout, we never copy code, assets or words.

The references show what is common; **"Our touch"** is what our version adds where it serves the block: motion that
follows the village, a state the references skip, a fix for an accessibility gap we saw. It is a starting point, to
refine after the inspection, not a promise.

Templates' marketplace pages are `https://www.framer.com/marketplace/templates/<name>/`.

**Lot G, portfolio**

| Block | Inspect | Look at | Our touch |
|---|---|---|---|
| `projects-grid` | Snapline https://snapline.framer.website/work · TITARVL https://titarvl.framer.website/works · Caspia https://caspia.framer.media/works | Snapline's filters with a count each ("All 6, Web app 2…") and its Grid / List switch; TITARVL's and Caspia's Grid / List and Grid / Full switches | The filter is a `ChipGroup` that works without JavaScript (every project in the HTML); `spotlight` on the cards in villages at intensity 2 and more |
| `projects-list` | Substance https://substancetm.framer.website/work · Le Rêve https://xn--lerve-jsa.framer.website/work · Metzger https://metzger.framer.website/ | Substance's category filter and the preview that follows the cursor; Le Rêve's rows (initials, client, year); Metzger's numbered rows with kind tags, date and "load more" | `hover-image-list` gives the picture the village's spring; the keyboard sees the picture beside the focused row |
| `case-study` | AVIX https://avix.framer.website/projects/eagle-fashion · TITARVL https://titarvl.framer.website/works/chronicae · Aren Vale https://arenvale.framer.photos/work/cobalt | AVIX's run of overview, facts (date, services, industry, budget), challenges, achievements, process, the client's words and recent projects; TITARVL's facts and "next project"; Aren Vale's numbered frames | Results roll with `number-roll`; the gallery opens in a `lightbox`; the cover uncovers with `image-reveal` |
| `gallery-horizontal` | Savage https://savage.framer.website/ · Wildora https://wildoraa.framer.website/ | Savage's home: one pinned panel whose row of photos (about 18,000px wide) moves sideways with the scroll; Wildora's draggable print slider with a 01 / 11 counter, as a contrast | `horizontal-scroll`'s snapping row below 48rem and a still layout under reduced motion; a counter as Wildora's; a photo opens in a `lightbox` |
| `awards-list` | Visual Frame https://visual-frame.framer.website/about#award · Metzger https://metzger.framer.website/info | Visual Frame's year-by-year award list; Metzger's "Recognition" lines (award, result, year) | A real table (year, award, project) with a link each, readable at 360px as stacked rows |
| `experience-timeline` | TITARVL https://titarvl.framer.website/about | The "Experience" list: role, kind (freelance, full time), studio and years ('22–'24) | A vertical line that fills with the scroll (`text-scroll-fill`'s progress) in villages that move; dates written with `Intl` |

**Lot H, SaaS**

| Block | Inspect | Look at | Our touch |
|---|---|---|---|
| `changelog` | Releasely https://releasely.framer.website/changelog and a release, /changelog/v2-8-0 · Hotfix https://hotfix.framer.website/changelog · Saasbright https://forgiving-needs-325167.framer.app/changelog | Releasely's version and date rail, New / Improved / Fixed chips, the filter with counts, the subscribe strip, and its release page; Hotfix's terminal look and commit hashes | Added / Improved / Fixed as lists in each release (the references only tag them); `scroll-progress` on a long page; an anchor per version |
| `waitlist` | PrimeCraft https://primecraft.framer.website/waitlist · WaitlistKit https://waitlistkit.framer.website/ (and /v2, /v3) · Slate https://slate-template.framer.website/waitlist | The field and the button, the "Chosen by 1,000+…" line, how sending and success look (Framer's form states: only visible in a browser) | Sending, success and error states in the block, announced to screen readers; the count from the content, rolling with `number-roll` |
| `customer-stories` | Slate https://slate-template.framer.website/customers · Saasbright https://forgiving-needs-325167.framer.app/customers | Slate's featured stories with two numbers each, the logo strip and the industry filter; Saasbright's featured story with one big number, the story cards and quotes | One number per story that rolls in; the card links to the story's `href` |
| `security-badges` | InTheWork https://inthework.framer.website/ ("Enterprise-Grade Security & Trust") · PrimeCraft https://primecraft.framer.website/ ("Locked down by default") · Releasely https://releasely.framer.website/status (uptime) | InTheWork's badge grid with a status line each ("Compliance in progress"); PrimeCraft's chips; Releasely's uptime figure and 90-day bars | A status per point (certified, in progress), never a third-party logo; the uptime as text, not only bars |
| `integrations-grid` | Slate https://slate-template.framer.website/integrations · InTheWork https://inthework.framer.website/integration-apps · PrimeCraft https://primecraft.framer.website/integration | Slate's category tabs and cards ("New" badge, "Learn more"); InTheWork's search and grouped cards; each one's page per integration | Category chips with counts, a search that filters in place, both working with the keyboard |
| `careers` | Slate https://slate-template.framer.website/careers · InTheWork https://inthework.framer.website/career · PrimeCraft https://primecraft.framer.website/carrers | Slate's department filter and rows (team, title, "Full-Time / Remote / Europe"); InTheWork's three filters and "Open" badge; PrimeCraft's roles grouped by team | Grouped by team with a count; an empty state when a filter leaves nothing |

**Lot I, every kind of site**

| Block | Inspect | Look at | Our touch |
|---|---|---|---|
| `hero-video` | Vectura https://vectura.framer.website/ · Optivio https://optivio.framer.website/ · Scalable https://scalable.framer.website/ | Vectura's full-bleed video with a dark radial wash under the headline; Optivio's video inset in a rounded card; Scalable's video pushed down and faded by a mask | `video`'s pause button and poster under reduced motion; a wash that keeps the headline at 4.5:1 over any frame |
| `hero-product` | Alytics https://alytics.framer.website/ · Dreelio https://dreelio.framer.website/ · Talvoriq https://talvoriq.framer.website/ | The large dashboard under the headline (Alytics, Dreelio); Talvoriq's dashboard made of real text, not a picture | The screen in a `device-frame` (question 5); `product-dashboard`, a real screen made from our components (ADR-0015), as the example |
| `process-steps` | Talvoriq https://talvoriq.framer.website/ ("Connect. Understand. Move forward.") · FintechX https://fintechx-wbs.framer.website/ | Talvoriq's three numbered steps (number, title, one line); FintechX's steps that show one description at a time | Numbers that reveal in turn at the village's stagger; a row from `@md`, a column below |
| `testimonials-marquee` | Aligno https://aligno.framer.ai/ · Dreelio https://dreelio.framer.website/ · Alytics https://alytics.framer.website/ | Aligno's vertical columns of quotes with an edge mask; Dreelio's horizontal masked row; the speeds (only visible in a browser) | Each column at its own speed from the village's motion; `marquee`'s pause button; the quotes read once by screen readers |
| `press-logos` | Formlog https://formlog.framer.website/ (an awards ticker, the nearest found) | The award lines (award, platform, year) and how they move | No template with an "As seen in" strip was found in about forty demos: inspect again before lot I, or move the block to RFC-0009's lot F list |

For `device-frame` (question 5): Framer's free components Browser Simulator
(https://www.framer.com/marketplace/components/browser-simulator/) and PhoneFrame
(https://www.framer.com/marketplace/components/phoneframe/); their demos were not opened yet.

## Options considered

- **Portfolio as categories inside `marketing`**: no new family, but the marketing gallery and `list_components` would
  mix a designer's projects with a startup's pricing, and an agent would need the category names to tell them apart.
- **One RFC for all eight survey groups**: thirty blocks and six open questions per group; it would stay in discussion
  for weeks, and the family and collection questions would be settled late.
- **A `collection` registry item** (a data file plus generated list and detail pages): pages are the project's and the
  router's business; a later RFC can add it if the examples show a need.
- **Markdown in content** for case studies and changelogs: a parser in every block that renders long text, and HTML to
  sanitise; plain paragraphs and lists cover the survey's examples.

## Risks and open questions

1. **Portfolio's family**: a third family `portfolio` (proposed), or categories inside `marketing`?
2. **Lists and their pages**: shared field types and `href`s the project owns, with the examples showing a list page and
   a detail page (proposed), or a `collection` item now?
3. **The waitlist's sending**: to a provider's URL or `onSubmit`, as `newsletter-inline` (proposed), or by message
   (`formChannel`) like the storefront forms?
4. **Long text**: plain paragraphs and lists in the content (proposed), or a small Markdown subset (bold, links, lists)?
5. **`device-frame`** for `hero-product`: a small new component (a browser and a phone frame) in lot I (proposed), or
   `hero-product` with a plain bordered screenshot until the P2 components' RFC?
6. **Project covers**: six new Unsplash photos (proposed), or the existing placeholders only?
7. **Order of the lots**: G (portfolio), H (SaaS), then I (proposed), or I first since every site uses it?

## Decisions

Settled by the maintainer on 2026-11-24:

| Question | Decision |
|---|---|
| 1. Portfolio's family | **A third family, `portfolio`** (people and studios showing their work). SaaS stays in `marketing` |
| 2. Lists and their pages | **Shared field types and `href`s the project owns**: the list maps over the items, the detail block takes one; `/examples/portfolio` and a case study page show the pattern. No `collection` item now |
| 3. The waitlist's sending | **To the provider's URL in the content, or `onSubmit`**, as `newsletter-inline`; the block shows sending, success and error and never stores the address |
| 4. Long text | **Plain paragraphs and lists in the content**, no Markdown |
| 5. `device-frame` | **A small new component in lot I** (a browser frame and a phone frame), for `hero-product` |
| 6. Project covers | **Six new Unsplash photos** under ADR-0014's rules (architecture, an interior, a product shot, a poster, packaging, a landscape) |
| 7. Order of the lots | **G0, G (portfolio), H (SaaS), then I** |

## Plan

**Before every block**: inspect its references (section 7) and write the "Observed" note in the lot's pull request.

**Lot G0, foundations**: the family or categories (question 1), the new field types, the placeholder covers, and the
`/examples/portfolio` page skeleton with its content array. Done when a test block in the new family shows in the
gallery, `blocks.json` and `list_components`.

**Lot G, portfolio**: the six blocks; `/examples/portfolio` and one case study page from the same content.

**Lot H, SaaS**: the six blocks; `/examples/saas`, from `hero-split` or `hero-product`, `logos-grid`,
`customer-stories`, `integrations-grid`, `security-badges`, `pricing-plans`, `changelog`, `waitlist` and
`footer-columns`.

**Lot I, every kind of site**: the five blocks (and `device-frame` if question 5 keeps it); each example page uses one
of them.

Each block passes the RFC-0008 quality gate: schema and example, server render, `pnpm axe` and `pnpm screenshots` in
every village, light and dark, at 360px and 1440px, the weight budget (6 kB gzip of its own code, 12 kB for showcase
blocks), intensity 1 and motion off, its page with the schema table. Each lot is one pull request, opened against
`main`.
