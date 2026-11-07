# Plans

A plan is a focused, self-contained implementation note: one problem, its cause, the change and how to check it. It is
smaller than an [RFC](../rfc/README.md): nothing in it needs to be debated across the project. Plans are numbered in the
order they were written (`NNN-short-name.md`) and, once done, are frozen like the RFCs. A plan that settles a lasting
choice also gets an [ADR](../adr/README.md).

| No. | Subject | Status |
|---|---|---|
| [001](001-rasengan-useid-hydration.md) | Rasengan.js: every `useId` differs between server and client | Worked around with `patches/rasengan@2.0.0.patch`; fix upstream, then drop the patch |
| [002](002-component-variants.md) | Component variants: `variant` × `tone` × `size` | Done (lots 0 to 4, 2026-10-30) |

## Template

```markdown
# NNN · Title

Status: To do · In progress · Done · Worked around (how)

## Problem

What happens, where, and how to see it.

## Cause

## Change

## Check

The commands and what they must show.
```
