# Changelog

## 0.2.0

- **The recipe's `intensity`** (ADR-0018): 0 nothing moves, 1 fades only, 2 travel and text splits, 3 showcase,
  written as `--motion-intensity` whatever the `motion` knob. Left out, `motion` decides as before, so existing recipes
  and the built-in villages give the same files. `intensityOf(knobs)` says which one a village will have; the recipe
  schema takes it.

## 0.1.1

- **Fixed:** the package's `exports` point at `dist/`. 0.1.0 was published with `npm publish`, which kept the
  workspace's `exports` (`src/`, not in the package): nothing could be imported. Publishing now refuses anything but
  `pnpm publish`, the only one that applies `publishConfig` (ADR-0016).

## 0.1.0

- First release: the villages and natures as data, the village engine (`createVillage`), the contrast library, the
  token contract, the font catalogue, the CSS files, the built-in recipes and the recipe schema. `calc()` is computed
  without `Function()`, so the engine runs in workers and under a strict CSP.
- **Do not use**: its `exports` point at files the package does not contain. Deprecated in favour of 0.1.1.
