# Changelog

## 0.1.1

- **Fixed:** the package's `exports` point at `dist/`. 0.1.0 was published with `npm publish`, which kept the
  workspace's `exports` (`src/`, not in the package): nothing could be imported. Publishing now refuses anything but
  `pnpm publish`, the only one that applies `publishConfig` (ADR-0016).

## 0.1.0

- First release: the villages and natures as data, the village engine (`createVillage`), the contrast library, the
  token contract, the font catalogue, the CSS files, the built-in recipes and the recipe schema. `calc()` is computed
  without `Function()`, so the engine runs in workers and under a strict CSP.
- **Do not use**: its `exports` point at files the package does not contain. Deprecated in favour of 0.1.1.
