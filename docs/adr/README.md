# Architecture decision records (ADRs)

An ADR records **one** decision: the context, what was chosen, what was ruled out, and what it leads to. It is short
(about a page) and **is never rewritten**. If we change our minds, a new ADR replaces the old one, and the old one's
status becomes "Superseded by ADR-NNNN". The history of the reasoning stays readable.

The large decisions are in the accepted [RFCs](../rfc/README.md), frozen. ADRs take over for **every decision taken
since**, and for the decisions in the code that were written nowhere.

## When to write one

- An open question of the [roadmap](../roadmap.md#open-questions) is settled.
- A decision of an accepted RFC changes: the ADR replaces it, and the RFC gets `→ "<topic>" replaced by ADR-NNNN` under
  its status.
- A choice commits what comes next (a dependency, a token in the contract, a file format, a URL, a convention) and
  cannot be read from the code alone.

No ADR for what one pull request can undo without consequences.

## List

| No. | Decision | Status | Date |
|---|---|---|---|
| [0001](0001-project-docs-like-jutsify.md) | Project docs in `docs/`: living docs, frozen RFCs and ADRs | Accepted | 2026-11-07 |
| [0002](0002-tabs-and-double-quotes-in-packages.md) | `packages/` and `scripts/` keep tabs and double quotes; the root Prettier config does not apply there | Accepted | 2026-11-01 |
| [0003](0003-v1-archived-old-urls-kept.md) | v1 lives in `archive/`; its JSON and images stay served at their old URLs | Accepted | 2026-10-31 |
| [0004](0004-own-registry-schemas-on-ui-rasengan-dev.md) | One domain, `ui.rasengan.dev`, for the site, the registry and Rasengan UI's own schemas | Accepted | 2026-10-31 |
| [0005](0005-prerendered-site-on-hiraiship.md) | The site is prerendered and deployed on Hiraiship as static files | Accepted | 2026-11-04 |
| [0006](0006-site-mdx-follows-hiraiship-docs.md) | The site's MDX follows Hiraiship's `apps/docs` conventions | Accepted | 2026-10-29 |
| [0007](0007-toast-on-sonner.md) | Toast is built on Sonner, not on Base UI's toast | Accepted | 2026-10-29 |
| [0008](0008-lip-in-the-token-contract.md) | The contract carries a lip (`--lip`, `--press-*`), zero by default | Accepted | 2026-11-05 |

## Template

Copy to `NNNN-short-title.md`, with the next number:

```markdown
# ADR-NNNN — Title: the decision in one sentence

| | |
|---|---|
| Status | Proposed · Accepted · Superseded by ADR-NNNN · Abandoned |
| Date | YYYY-MM-DD |
| Replaces | ADR-NNNN, or a part of an RFC (`RFC-000N`, topic), or — |

## Context

The problem and the constraints that matter. What we knew when deciding.

## Decision

What we do, in a few sentences.

## Options ruled out

- **Option**: why not.

## Consequences

What it leads to: what becomes simple, what becomes hard, what to watch.

## Revisit when

The condition that would reopen the question (optional).
```
