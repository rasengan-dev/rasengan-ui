# RFC-0006: Rasengan UI — found your own village

- Status: Accepted (2026-11-01; implementation on `feat/custom-villages`)
- Author: Dilane Kombou
- Created: 2026-11-01
- Builds on: RFC-0002 (token contract, villages, natures, tint, CLI, lockfile, `pnpm contrast`), RFC-0003 (MCP server)
- Package(s): `packages/villages` (contract schema, contrast library, the village engine), `packages/cli`
  (`village create`, `village check`), `scripts/contrast.mjs`, `scripts/registry.mjs`, `apps/site` (the village
  workshop, docs)

## Summary

A team that wants a design system of its own describes it in a **recipe**: a small JSON file with a base village, a
brand colour and a dozen knobs (radius, density, depth, motion, contrast, fonts…). A deterministic engine turns the
recipe into a full village, light and dark, checks every contrast pair the way `pnpm contrast` does, fixes what fails
and writes one CSS file of the same shape as `konoha.css`.

The result is an ordinary village: every component, `VillageScope`, the natures, the tint and runtime switching work
with it unchanged. It is the team's file, recorded in the lockfile, and can be regenerated from its recipe when the
contract grows.

```bash title="Terminal"
npx rasengan-ui village create acme --base kiri --color "#ff5a1f" --radius 0.4 --density compact
```

```text
Founded acme (from Kiri) → src/styles/rasengan/villages/acme.css
  brand colour #ff5a1f kept exactly; text on it is dark (8.1:1)
  1 adjustment: --muted-foreground (dark) 0.68 → 0.71 for 4.5:1 on --muted
  every pair passes (7 natures × 2 schemes × 2 tints)
The project is in Acme, nature acme.
```

## Motivation

- **Three villages are not enough for a product with a brand.** Konoha, Kiri and Iwa show what a village can be, but a
  team picks one and then edits it by hand: hand-written OKLCH, no idea which pair just dropped under 4.5:1, and a
  file that `rasengan-ui sync` now reports as edited.
- **A village already changes more than a theme does.** shadcn themes and most theme generators change colours. A
  village also sets shape, type, density, depth, focus, press, motion, loading and casing. A generator over that
  contract makes design systems that look truly different, not the same one in another colour. Nobody else offers it.
- **The contract makes it safe.** Components read only contract tokens, so anything that fills the contract works with
  every component, now and later. The contrast check gives what hand-made themes rarely have: a guarantee that every
  generated village is accessible, in both schemes, with every nature and both tints.
- **The pieces exist.** The contract (`contract.css`), its defaults, the derivations from the nature, the contrast
  resolver (`scripts/contrast.mjs`), the village registry items and the `village` commands. What is missing is the
  engine in between, and a way to describe a village without writing 60 tokens.

## Goals

- A village from a recipe of about a dozen knobs, in one command or on one page of the site.
- **Accessible by construction**: a generated village passes the same checks as the built-in ones, for every nature,
  scheme and tint. The engine fixes what it can and says what it changed; it refuses what it cannot fix.
- The brand colour is kept exactly whenever contrast allows, with dark or light text on it, whichever passes.
- Deterministic: the same recipe and engine version give the same file, byte for byte.
- **Konoha, Kiri and Iwa are recipes too.** The engine reproduces them token for token (their hand-tuned values as
  recipe overrides), which proves the engine and lets the built-in villages be regenerated when the contract changes.
- A generated village is shareable: published as a registry item like the built-in ones, installable by URL.
- An agent can found a village through the MCP server, with the same engine and the same checks.

## Non-goals

- **Changing a component's anatomy or structure.** A village is tokens; a team that wants another anatomy forks the
  component, as it would today. The docs say so plainly.
- **Editing any token from the workshop.** The recipe covers the decisions that shape a village; the CSS file is the
  team's afterwards, for the rest. The recipe's `overrides` are the escape hatch, and they are checked too.
- **An LLM inside the engine.** A model may choose a recipe (through MCP, or later on the site); it never writes
  tokens. The engine and the contrast check always have the last word.
- A hosted gallery of community villages, accounts, or storage of recipes on `ui.rasengan.dev` (see Rollout, "Then").
- Figma variables export and brand import from a website or a Figma file (Rollout, "Then").

## Decisions

| Topic | Decision |
|---|---|
| Unit | A custom village is a village: one CSS file under `styles/rasengan/villages/`, the same selectors as `konoha.css` |
| Input | A recipe (JSON, schema at `ui.rasengan.dev/schema/village-recipe.json`): base village, brand, knobs, traits, overrides |
| Base | Every recipe starts from a built-in village, which gives every value the knobs do not set |
| Engine | Pure TypeScript in `packages/villages/src/engine/`, no DOM, no network; used by the CLI, the site and the MCP server |
| Contrast | `scripts/contrast.mjs` becomes a library (`packages/villages/src/contrast.ts`); the script and the engine both use it |
| Fixing | Only lightness moves, only on the token of the failing pair that no knob pinned, in 0.01 steps, at most 0.15 |
| Brand colour | A nature declared by the village file (`[data-nature="acme"]`); its default nature, too |
| Where the recipe lives | `rasengan-ui.json`, under `villages.<name>`, with the engine version |
| Lockfile | The file is recorded with `source: "generated"`; its generated output goes to `.rasengan-ui/base/`, for 3-way merges |
| Sharing | `village export` writes a registry item (`village-<name>`, `meta.recipe`); `village add <url>` installs one |
| Agents | MCP tool `create_village`, dry run by default |

## Detailed design

### The contract, written down

Today the contract is implicit: the tokens `contract.css` reads, its defaults, and what the three villages set. The
engine needs it as data. `packages/villages/src/contract.ts` lists every token a village may set:

```ts
export const contract = {
	"--background": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--primary-l": { group: "accent", kind: "number", schemes: true },
	"--radius": { group: "shape", kind: "length" },
	"--focus-width": { group: "focus", kind: "length", default: true },
	"--success-text": { group: "status", kind: "color", default: true, derived: true },
	// …
} as const satisfies Record<string, TokenSpec>;
```

`schemes` says whether the token may take another value under `.dark`, `tinted` whether its chroma is multiplied by
`--tint`, `default` whether `contract.css` gives it a value, `derived` whether `contract.css` computes it from other
tokens (a village leaves it alone). A test checks it against `contract.css` and the three villages, so it cannot drift:
a token a village sets and the contract does not list, a default the contract claims and `contract.css` lacks, a
required token a village leaves out, a dark or tinted value on a token not marked so, all fail.

The contrast pairs stay in `contrast.ts` (`TEXT`, `CONTROLS`, `TONE_EDGES`, `TONE_PAIRS`): they are read on resolved
tokens (`--success-text` on `--success-soft` over a card), most of which a village never sets.

### The recipe

```json
{
	"$schema": "https://ui.rasengan.dev/schema/village-recipe.json",
	"name": "acme",
	"title": "Acme",
	"description": "Sharp, compact and orange.",
	"base": "kiri",
	"brand": { "color": "#ff5a1f" },
	"neutrals": { "hue": 60, "chroma": 0.5 },
	"contrast": "standard",
	"radius": 0.4,
	"density": "compact",
	"depth": "soft",
	"motion": "calm",
	"border": 1,
	"fonts": { "body": "Inter", "heading": "Fraunces", "code": "JetBrains Mono" },
	"traits": { "tabs": "underline", "highlight": "soft", "skeleton": "pulse", "focus": "halo", "press": "scale", "case": { "controls": "none", "headings": "none" }, "surfaces": "solid" },
	"overrides": {}
}
```

Every field but `name` and `base` is optional: an empty recipe on Konoha gives Konoha.

| Knob | Values | Tokens it sets |
|---|---|---|
| `brand.color` or `brand.hue` | a CSS colour, or a hue in degrees | the village's nature (`--nature-hue`), `--primary-l`/`-c` light and dark, `--on-primary` |
| `neutrals` | `hue` (degrees), `chroma` (0 grey … 1 strongly tinted) | every grey, light and dark, with the `--tint` multiplier |
| `contrast` | `soft`, `standard`, `high` | the lightness spread of background, card, muted, border, input, control border, foregrounds |
| `radius` | 0 … 1 (0: none, 0.5: Konoha, 1: Kiri's) | `--radius`, `--control-radius`; the check and badge radii follow through the contract defaults |
| `density` | `compact`, `default`, `comfortable` | `--control-sm/md/lg`, `--control-px`, `--control-text`, `--indicator-*` |
| `depth` | `flat`, `soft`, `raised`, `hard` | `--elevation-sm/md/lg`, `--input-shadow`, `--thumb-shadow`; `hard` is Iwa's offset shadow and `--press-shadow` |
| `motion` | `still`, `calm`, `lively` | `--motion-fast/base/slow`, the easings, `--press-scale` |
| `border` | 1, 1.5, 2 (px) | `--border-width` |
| `fonts` | names from the curated list (open licences) | `--font-body`, `--font-heading`, `--font-code`, `--display-tracking` |
| `traits` | the choices a village makes that are not a scale | tabs (segmented or underline), highlight (soft or inverted), skeleton (pulse or hatched), focus (halo or ring with a gap), press (scale or sink), case, surfaces (solid or glass: `--surface-blur`, translucent cards, `--texture`) |
| `overrides` | any contract token, light and/or dark | that token, after everything else; checked like the rest |

The base gives the traits a recipe leaves out: a recipe on Iwa keeps underlined tabs and inverted highlights unless it
says otherwise. That is why the knobs can stay few: the base carries the character, the knobs move it.

### The engine

```ts
import { createVillage } from "@rasengan-ui/villages/engine";

const result = createVillage(recipe); // { css, tokens: { light, dark }, adjustments, report, errors }
```

1. **Resolve.** Start from the base village's tokens (read from its recipe, see below), apply the knobs in the order of
   the table, then the overrides. Colours are computed in OKLCH; greys get the `calc(c * var(--tint, 1))` form.
2. **Brand.** The brand colour becomes a hue, a lightness and a chroma. For each scheme the engine tries, in order: the
   colour as given with white text, the colour as given with dark text, then the closest lightness that passes with
   white text. It reports which one it took. The colour is checked against every nature the project can switch to,
   as the built-in villages are, because `--primary-l`/`-c` stay when the nature changes.
3. **Check.** The contrast library resolves every scope (the village × 7 natures, its own included × 2 schemes × 2
   tints) and checks the pairs `contract.ts` declares: 4.5:1 for text, 3:1 for control borders and tracks.
4. **Fix.** For a failing pair, move the lightness of the token no knob pinned (the foreground, usually; never the
   brand colour the user asked to keep) by 0.01 toward more contrast, re-check, stop at a pass or at 0.15. Each move is
   an `adjustment` in the result. A pair still failing is an `error`, and nothing is written.
5. **Write.** One file, in the shape of `konoha.css`: a header with the recipe and the engine version, the default
   nature rule, the village's own nature, the light block, the dark block. Values rounded to 3 decimals, tokens in
   contract order, so a regenerated file diffs cleanly.

The built-in villages get a recipe each (`packages/villages/src/villages/konoha.recipe.json`…), with the values a knob
cannot produce as overrides. A test generates each and compares tokens with the CSS file. Once it passes, a change to
the contract is made once in the engine and the built-in villages are regenerated like any other.

### The village's own nature

A brand colour is a hue the six natures do not have. The generated file declares a nature named after the village:

```css
:where([data-village="acme"]:not([data-village] *)) {
	--nature-hue: 38;
}
[data-nature="acme"] {
	--nature-hue: 38;
}
```

It has the specificity of the natures in `natures.css`, so the import order of RFC-0002 does not change. The project's
`nature` becomes `acme`, and the colour follows into other villages: `<VillageScope village="iwa">` inside an Acme page
keeps the Acme orange. The registry item lists it in `meta.natures`, and `choices()` in the CLI merges the natures of
installed villages with the theme's.

### CLI

```text
Usage: rasengan-ui village <list|set|add|create|check|export> [name...]

  create <name>   Found a village from a recipe, write it and switch to it
  check <name>    Run the contrast check on an installed village (built-in or not)
  export <name>   Write the village as a registry item, to publish it

Options for create:
  --from <file|url>  A recipe file, or a link from the village workshop
  --base <village>   The village to start from (default: konoha)
  --color <colour>   The brand colour
  --radius, --density, --depth, --motion, --contrast, --border  One knob each
  --update           Regenerate an existing village from its saved recipe with this engine
  --no-switch        Write the village without making it the project's
  --dry-run          Print the report and the CSS, write nothing
```

Without `--from` or knobs in a terminal, `create` asks: base village, brand colour, then the knobs with the base's
values as defaults. It writes:

- `styles/rasengan/villages/<name>.css`, imported with the other villages (the import order `doctor` checks);
- `villages.<name>` in `rasengan-ui.json`: the recipe and `engineVersion`;
- the lockfile entry, `source: "generated"`, and the generated output in `.rasengan-ui/base/`.

`--update` regenerates from the saved recipe and merges like `sync` merges a component: the team's edits to the CSS
file are kept, conflicts are marked. `doctor` warns when a generated village was made by an older engine than the
installed one, and says to run `village create <name> --update`.

`village add` accepts a URL to a `village-<name>` item, as it accepts a name today. A village installed this way is
the publisher's, not generated here: `--update` does not apply to it, `sync` does.

### Contract changes

A new contract token must not break villages generated earlier. The rule, added to RFC-0002's contract section: **every
token added after this RFC has a default in `contract.css`, or is derived from tokens a village already sets.** The
engine then sets it explicitly in new villages, and `doctor` suggests `--update` for older ones.

### The workshop (`apps/site`, `/villages/create`)

The knobs on the left, the components on the right: the existing demos of the registry, in a `VillageScope` that wears
the village being made, light and dark side by side. The engine runs in the browser on every change; the CSS goes into
a `<style>` element. Under the knobs, the report: the adjustments, and the pairs that fail with where they are.

Nothing is stored on the server. The recipe is encoded in the link (`/villages/create#r=<base64url>`), so a link is the
way to share a work in progress. Three exports:

- **Install**: `npx rasengan-ui village create acme --from "https://ui.rasengan.dev/villages/create#r=…"`, decoded by
  the CLI, no request needed;
- **CSS**: the file, for a project without the CLI;
- **Recipe**: the JSON.

### MCP

`create_village` takes a recipe and `dryRun` (default `true`). It returns the report, the adjustments and, in a dry
run, the CSS; otherwise it writes like `village create --no-switch`. Switching the project's village stays a user
command (RFC-0003, open question 1). The server's instructions add one rule: a model chooses knobs and traits, never
raw token values; it uses `overrides` only when the user names a value.

This is how "describe your brand" works first: the user asks their agent, the agent writes a recipe, the engine
decides.

### Code

| File | What it holds |
|---|---|
| `packages/villages/src/contract.ts` | The contract as data: token, group, kind, schemes, tint, default, derived |
| `packages/villages/src/contrast.ts` | Scope resolution and the checks, from `scripts/contrast.mjs` |
| `packages/villages/src/engine/` | `recipe.ts` (type, schema, defaults), `resolve.ts`, `brand.ts`, `fix.ts`, `write.ts`, `createVillage` |
| `packages/villages/src/fonts.ts` | The curated fonts: family, licence, fallback stack, the CSS to load them |
| `packages/villages/src/villages/*.recipe.json` | The recipes of Konoha, Kiri and Iwa |
| `scripts/contrast.mjs` | A thin wrapper: checks the built-in villages with the library |
| `scripts/registry.mjs` | `meta.recipe` and `meta.natures` on village items; the recipe schema in `public/schema/` |
| `packages/cli/src/commands/look.ts` | `village create`, `check`, `export`; `add` by URL |
| `packages/cli/src/config.ts`, `install.ts` | `villages` in the config, `source: "generated"` in the lockfile |
| `packages/cli/src/mcp.ts` | `create_village` |
| `apps/site` | The workshop page, and a docs page "Your own village" |

## Rollout

1. **Contract and contrast as code.** `contract.ts` with its drift test; `contrast.ts`, with `pnpm contrast` giving the
   same result as today (same pairs, same failures).
2. **Engine.** Recipe type and schema, resolve, brand, fix, write. Konoha, Kiri and Iwa as recipes, reproduced token
   for token. Unit tests per knob and for the fixer (a recipe built to fail is fixed, or refused with the pair).
3. **CLI.** `village create`, `check`, `export`, `add` by URL, the config and lockfile changes, `doctor`. Checked on
   `apps/playground`: create, switch, edit the file, `--update` with a merge.
4. **Site.** The workshop and the docs page.
5. **MCP.** `create_village` and the instruction.
6. **Then**: Figma variables export (light and dark as modes); recipes from a brand source (a website's CSS, Figma
   variables); a gallery of community villages on the site, from registry URLs people submit.

## Alternatives considered

- **Generate every token freely (a "theme editor").** Sixty inputs, most of which a team should not have to decide, and
  every combination to check. The base-plus-knobs recipe keeps the choices few and the character of a village whole.
- **An LLM that writes the CSS.** Fast to build and impressive in a demo, but neither deterministic nor checkable before
  the fact; a model would reach for the hard-coded values the contract exists to avoid. A model picking a recipe gets
  the same result with the guarantees.
- **The brand colour as a seventh nature in `natures.css`.** The file is the registry's; editing it would make it a
  local edit for every update. A nature declared by the village file travels with the village.
- **Store recipes on `ui.rasengan.dev`.** Needs accounts, storage and moderation for no gain at this stage: a recipe is
  small enough for a link.
- **Generate at runtime** (the engine in the app, tokens set from JavaScript). Flash of the wrong village before
  hydration, and the engine in every bundle. A CSS file costs nothing at runtime.

## Open questions

1. Must a custom village pass with all seven natures, or only its own (`--natures own`)? All is what the built-in
   villages promise; a brand village may never be used with another nature, and the strict check limits how light
   its primary can be.
2. Fonts: the curated list and how they load are RFC-0002's open question 2. Does a custom village allow any font name
   (the team loads it), with a warning?
3. Should the recipe live in `rasengan-ui.json` or next to the CSS (`acme.recipe.json`), where it is easier to share?
4. Focus halos (RFC-0002, open question 5) and text field borders (question 6): whatever is decided for the built-in
   villages, the engine applies. Should the workshop offer a `strict` switch that holds focus rings and field borders
   to 3:1 meanwhile?
5. The name of the feature: "found a village" (command `village create`), or another command name in the Naruto
   vocabulary?
6. Is `traits.surfaces: "glass"` safe to offer without a check on what sits behind a translucent surface? Kiri's
   contrast is checked against its own background only.
