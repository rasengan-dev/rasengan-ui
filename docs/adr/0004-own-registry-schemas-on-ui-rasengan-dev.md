# ADR-0004 — One domain, `ui.rasengan.dev`, for the site, the registry and Rasengan UI's own schemas

| | |
|---|---|
| Status | Accepted |
| Date | 2026-10-31 |
| Replaces | RFC-0002, open question 1 (domain) |

## Context

RFC-0002 left open whether the registry stays on `registry.rasengan.dev` or moves with the docs. The registry is built
with the shadcn CLI, which stamps shadcn's `$schema` URLs on every file; shadcn's published JSON schema lacks the
`registry:example` type that Rasengan UI uses for its demos (RFC-0003), although its CLI accepts it.

## Decision

- `ui.rasengan.dev` serves the site, the registry (`/r/<engine>/<name>.json`) and its schemas (`/schema`). The CLI's
  default registry, `pnpm build` (`RASENGAN_UI_URL`) and every doc use it.
- The schemas are Rasengan UI's own (`apps/site/public/schema/registry.json`, `registry-item.json`): shadcn's content,
  with our own `$id`, title and `$ref`, and `registry:example` in the type enums. `scripts/registry.mjs` rewrites the
  `$schema` that shadcn stamps.
- `registry.rasengan.dev` becomes an alias of the same deployment, for v1 installs ([ADR-0003](0003-v1-archived-old-urls-kept.md)).

## Options ruled out

- **Keep `registry.rasengan.dev` as the only domain**: the docs and the registry are one site; one name is simpler to
  remember and to type in `components.json`.
- **Point at shadcn's schemas**: editors would flag `registry:example` items as invalid.

## Consequences

- Registry URLs are public API: `/r/<engine>/<name>.json` must never change shape (see [invariants](../invariants.md)).
- The custom domain is not attached yet; the site is live at `rasengan-ui.hiraiship.app` (see the
  [roadmap](../roadmap.md)).
