# Invariants

> **Living document.** The rules **nothing may break**, whatever the feature. A pull request that breaks one is
> refused. Changing an invariant takes an [ADR](adr/README.md), never a side remark in a pull request.
>
> Each rule points to the document that decided it. Last updated: 2026-11-07.

## Components

1. **Components use only the token contract's names**: `bg-primary`, `text-muted-foreground`, `rounded-control`,
   `shadow-md`, `font-display`, `h-control`… Never a raw colour, radius, shadow, font or duration, or they stop
   following a village switch. — [RFC-0002, Villages](rfc/0002-villages.md)
2. **State is styled through the engine variants** (`ui-open`, `ui-checked`, `ui-invalid`…), never through
   `data-[…]` of one engine, so a styles file serves Base UI and Radix alike. — [RFC-0002, Engines](rfc/0002-villages.md)
3. **Base UI APIs, shadcn part names.** Components follow Base UI's composition (`render` props, no `asChild`) and
   keep shadcn's export names (`DialogContent`, `SelectTrigger`…), so shadcn code ports by changing imports.
   — [RFC-0002, Components](rfc/0002-villages.md)
4. **Variants run on three axes**: `variant` (look), `tone` (colour) and `size`, as separate props, with
   `tone` = `neutral · primary · success · warning · info · destructive`. Tones go through `tone-*` utilities, not one
   variant per tone. — [plan 002](plans/002-component-variants.md)
5. **Every theme shadow is a contract shadow** (`shadow-sm/md/lg/input/check/knob/lip`…), so it carries the lip of
   villages that have one. — [ADR-0008](adr/0008-lip-in-the-token-contract.md)
6. **A component is done when it passes the quality gate**: right in every village (Konoha, Kiri, Iwa, Kusa), light
   and dark; usable with the keyboard and a screen reader; `pnpm typecheck`, `pnpm contrast`, `pnpm axe` and
   `pnpm screenshots` pass. — [CONTRIBUTING](../CONTRIBUTING.md#quality-gate)
7. **Client components start with `"use client"`**, and `scripts/registry.mjs` keeps the directive first when it
   inlines the styles. Next.js App Router projects break otherwise. — [RFC-0002, CLI](rfc/0002-villages.md)

## Villages and the contract

8. **A village is CSS over the contract, nothing else.** Its file sets contract tokens (custom properties) under
   `[data-village="<name>"]`, light and dark, and no other property. A component never tests which village it is in. — [RFC-0002, Villages](rfc/0002-villages.md)
9. **Every village passes `pnpm contrast` with every nature, light and dark**: text 4.5:1, control edges and tracks
   3:1. A generated village that cannot pass is refused by the engine, not shipped. — [RFC-0006](rfc/0006-custom-villages.md)
10. **`contract.css` and `contract.ts` say the same thing**; `contract.test.ts` fails if they drift. A new token goes
    into both, with a default that keeps the other villages unchanged. — [RFC-0006](rfc/0006-custom-villages.md)
11. **Natures are imported after villages**, and Onmyōton repaints only scopes that do not name another nature.
    — [RFC-0002, Natures](rfc/0002-villages.md)

## Registry and CLI

12. **Registry URLs are public API.** `/r/<engine>/<name>.json`, `/schema/registry.json` and
    `/schema/registry-item.json` never change shape; an item may be added or deprecated, not renamed in place.
    — [ADR-0004](adr/0004-own-registry-schemas-on-ui-rasengan-dev.md)
13. **v1 keeps working.** v1 JSON at `/r/<name>.json` and images at `/static/…` are served unchanged and never
    edited. — [ADR-0003](adr/0003-v1-archived-old-urls-kept.md)
14. **The CLI never loses a user's edit.** A file edited since install is kept unless `--overwrite`; `update` merges
    in three ways and leaves conflict markers rather than choosing. A file the user deleted stays deleted.
    — [RFC-0002, CLI](rfc/0002-villages.md)
15. **Components are installed through the CLI or the MCP server, never copied by hand** in docs or examples, so
    aliases, npm packages and `rasengan-ui.lock` stay right. — [RFC-0003](rfc/0003-mcp-server.md)
16. **The MCP server never writes to stdout** except protocol messages: stdio carries the protocol.
    — [RFC-0003](rfc/0003-mcp-server.md)

## Site

17. **The site is static.** Every page is prerendered; nothing may need server code per request.
    — [ADR-0005](adr/0005-prerendered-site-on-hiraiship.md)
18. **Demos show their real source.** A page imports `<demo>.tsx?source`, never a copy of the code.
    — [ADR-0006](adr/0006-site-mdx-follows-hiraiship-docs.md)

## Motion

19. **Content is visible without JavaScript and under reduced motion.** Hidden initial states apply only once motion
    is ready; `prefers-reduced-motion` and `data-motion="final"` render every animation in its end state.
    — [RFC-0001, Motion](rfc/0001-v2-animated-blocks.md) (kept by RFC-0002)
