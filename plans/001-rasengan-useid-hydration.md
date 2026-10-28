# 001 · Rasengan.js: every `useId` differs between server and client

Status: worked around here with `patches/rasengan@2.0.0.patch`; to fix upstream in Rasengan.js and drop the patch.

## Symptom

In dev, React logs "A tree hydrated but some attributes of the server rendered HTML didn't match" on every
Base UI trigger: `id="base-ui-_R_1umq_"` from the server, `base-ui-_R_fll_` on the client. React does not patch
these attributes, so the DOM keeps the server ids while React uses the client ones. A popup mounted on the
client that points at a server-rendered element (a menu's `aria-labelledby` naming its trigger, for example)
then points at nothing.

## Cause

`useId` is derived from the component's position in the tree, counted from the root; every element with
several children adds a step to that path. The two trees differ above the app:

| | Server (`entries/server/index.js`, `entry.server.js`) | Client (`entries/client/render.js`) |
|---|---|---|
| Root | `TemplateLayout`: `<html>` → `[Head, Body]` → `<body>` → `[noscript, #root, Script]` → app | `hydrateRoot(#root, …)` |
| Around the app | `ErrorBoundaryFallback` | `ErrorOverlayProvider`, which renders `[ErrorBoundaryFallback, devMode && ErrorOverlay]`, then `StrictMode` |

So the server path carries the `html` and `body` branches, and the client path carries the overlay's two-slot
branch. `useId` probes in the app and the page confirmed it: once the document branches were removed, the only
difference left was the overlay's 2-way branch at the root (`_R_1_` vs `_R_5_` in the app, `_R_m_` vs `_R_2p_`
in the page). The router adds no difference.

## Change (the patch)

1. `entries/server/entry.server.js`: render the app first, in its own React root (`renderToReadableStream`,
   `await allReady`, or `renderToString` for the non-streaming path), then render the document with that HTML.
2. `entries/server/index.js`: `createAppElement()` builds the app as the client hydrates it, including the
   overlay's two slots (`[ErrorBoundaryFallback(app), null]`); `TemplateLayout` accepts `appHtml`.
3. `routing/components/template.js`: `BodyComponent` puts `appHtml` in `#root` with `dangerouslySetInnerHTML`.

Production builds bundle the same `entries/server/entry.server.js`, so they carry the change.

Trade-off: the app is rendered completely before the document is sent, so Suspense boundaries no longer stream
progressively. The shell still streams.

## Upstream fix (Rasengan.js)

Either keep this approach, without the trade-off, by splicing the app stream into the document stream at
`#root`; or hydrate the whole document on the client (`hydrateRoot(document, <TemplateLayout … />)`, with the
metadata serialised), as React Router's framework mode and Next.js do, which makes both trees identical by
construction. In both cases the server's wrapper around the app must render the same slots as
`ErrorOverlayProvider`. Then remove `patches/rasengan@2.0.0.patch` and its `patchedDependencies` entry.

## Check

Load `/` in a fresh tab: no hydration error in the console, and the `id="base-ui-…"` attributes in the server
HTML (`fetch('/')`) equal those in the hydrated DOM. Open the scoped dialog: the trigger's `aria-controls`
equals the popup's `id`.
