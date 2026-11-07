# ADR-0007 — Toast is built on Sonner, not on Base UI's toast

| | |
|---|---|
| Status | Accepted |
| Date | 2026-10-29 |
| Replaces | RFC-0002, "Components" (toast on Base UI, as the rest) |

## Context

RFC-0002 builds every component on Base UI. Base UI has a toast, but shadcn's toast is Sonner: its `toast()` API is
what projects and agents already write, and Sonner brings the stacking, swipe and promise toasts that would otherwise
be rebuilt.

## Decision

`toast` wraps Sonner:
- `toastOptions.unstyled` with `classNames` drawn from contract tokens, so the village draws the toast;
- lucide icons; the module re-exports Sonner's `toast`;
- the `Toaster` renders in place, so it follows a `VillageScope`;
- tones per toast type, and a `soft` Toaster variant.

## Options ruled out

- **Base UI toast**: one engine everywhere, but a different API from shadcn's and from what users already call.

## Consequences

- `sonner` is a dependency of the `toast` item, and a second engine to follow for updates.
- The icon box must be `relative`, or Sonner's absolutely positioned spinner centres on the whole toast.

## Revisit when

A Radix engine is added: the same Sonner item can serve both engines.
