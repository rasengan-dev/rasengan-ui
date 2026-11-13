# @rasengan-ui/villages

The token contract of [Rasengan UI](https://ui.rasengan.dev), its villages and natures, and the **village engine**:
a recipe in, a checked village CSS file out.

A **village** is a whole design language (colours, shapes, type, density, depth, motion). A **nature** is its accent
hue. A **recipe** is the few settings a village is made from: a base village, a brand colour, some knobs.

Most projects do not need this package: the [`rasengan-ui`](https://www.npmjs.com/package/rasengan-ui) CLI installs
villages and makes your own (`rasengan-ui village create`). Use it when you make villages in your own code, in Node,
in a browser or in a web worker.

## Install

```bash
npm install @rasengan-ui/villages
```

## Make a village

```ts
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { parseSources } from "@rasengan-ui/villages/contrast";
import { createVillage } from "@rasengan-ui/villages/engine";

const require = createRequire(import.meta.url);
const read = (file: string) => readFileSync(require.resolve(`@rasengan-ui/villages/${file}`), "utf8");

const { villages, ...sources } = parseSources({ contract: read("contract.css"), natures: read("natures.css"), villages: {} });
const village = createVillage({ name: "acme", base: "kiri", brand: { color: "#ff5a1f" } }, { sources });

if (village.problems.length === 0) console.log(village.css);
```

`village.problems` lists the colour pairs still under their WCAG minimum: when there are any, do not write the file.
`village.adjustments` lists what the engine moved to pass.

Where files cannot be read (a browser, a web worker), take the two files already parsed:

```ts
import { createVillage } from "@rasengan-ui/villages/engine";
import { sources } from "@rasengan-ui/villages/sources";

const village = createVillage({ name: "acme", base: "kiri", brand: { color: "#ff5a1f" } }, { sources });
```

## What it exports

| Import | What it is |
|---|---|
| `@rasengan-ui/villages` | The villages, natures and tints that exist, as data |
| `@rasengan-ui/villages/engine` | `createVillage`, the `Recipe` type, the built-in recipes, recipe links |
| `@rasengan-ui/villages/contrast` | The contrast library: parse the CSS, check every colour pair |
| `@rasengan-ui/villages/sources` | `contract.css` and `natures.css` already parsed, for `createVillage` |
| `@rasengan-ui/villages/contract` | The token contract as data |
| `@rasengan-ui/villages/fonts` | The font catalogue a village may name |
| `@rasengan-ui/villages/contract.css`, `/natures.css`, `/villages/<name>.css` | The CSS files |
| `@rasengan-ui/villages/villages/<name>.recipe.json`, `/recipe.schema.json` | The built-in recipes and the recipe's JSON Schema |

## Licence

MIT
