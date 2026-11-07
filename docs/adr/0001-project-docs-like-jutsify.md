# ADR-0001 — Project docs in `docs/`: living docs, frozen RFCs and ADRs

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-07 |
| Replaces | The `proposals/` and `plans/` folders at the root, and the `Draft → Accepted → Implemented` status of RFCs |

## Context

Rasengan UI had six RFCs in `proposals/` and two plans in `plans/`, and nothing else. Four RFCs still read "Draft"
although they were built and live, because their header was the only place to track progress. Many decisions taken
since were written nowhere a contributor could find them: the code style of `packages/`, the v1 archive and its kept
URLs, hosting on Hiraiship, Toast on Sonner, the lip in the contract. There was no description of the system as it is,
no list of the rules nothing may break, no glossary for a vocabulary (village, nature, tone, lip, tint) that is the
product itself, and no `CLAUDE.md` for the agents that do much of the work.

The Jutsify project solved the same problem with a small set of documents and rules that have held up.

## Decision

Follow Jutsify's structure, in English:

- `docs/` holds the project docs; `apps/site` stays the user docs.
- **Living** docs: `architecture.md`, `invariants.md`, `glossary.md`, `roadmap.md`, `code-tour.md`, updated in the same
  commit as the code that makes them wrong.
- **Frozen** docs: accepted RFCs (`docs/rfc/`), ADRs (`docs/adr/`), done plans (`docs/plans/`). A decision that changes is
  a new ADR.
- RFC lifecycle: Draft → In discussion → Accepted or Rejected (or Superseded). Progress and open questions move to the
  roadmap, the only list of open questions.
- A `CLAUDE.md` at the root says what to read before touching the code and how to work.

Files were moved with `git mv` and renamed to `NNNN-short-title.md`. RFCs 0002 to 0005 became Accepted.

## Options ruled out

- **Keep `proposals/` and `plans/` as they were, add ADRs next to them**: the living docs and the "what to update when"
  rule are what keep the docs true; adding ADRs alone would not.
- **French, as in Jutsify**: Rasengan UI is open source and every existing document is in English.
- **Put the project docs on the site**: they are for contributors and agents, change with each pull request, and
  would mix with the user docs.

## Consequences

- A pull request that changes the system also changes a living doc. Reviews check it, using the table in
  [docs/README.md](../README.md).
- Links to `proposals/RFC-000N-….md` from outside the repository (issues, chats) break. Inside the repository they were
  fixed.
- RFCs 0001 to 0006 keep their old header format; new RFCs use the template.
