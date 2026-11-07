# Rasengan UI project docs

These are the docs for the people and agents who build Rasengan UI. The docs for its users (installation, components,
CLI, MCP) are the site, in `apps/site`, served at [ui.rasengan.dev](https://ui.rasengan.dev).

## Where to start

| I want to… | Read |
|---|---|
| Understand what Rasengan UI is and why | [RFC-0002, Villages](rfc/0002-villages.md) (Summary, Motivation, Goals) |
| See the system as it is today | [architecture.md](architecture.md) |
| Know what must never break | [invariants.md](invariants.md) |
| Understand a word (village, nature, tone, lip…) | [glossary.md](glossary.md) |
| Know where things stand, what is left to build or to decide | [roadmap.md](roadmap.md) |
| Find my way in the code | [code-tour.md](code-tour.md) |
| Know why something was chosen | The [RFCs](rfc/README.md), then the [ADRs](adr/README.md) |
| Propose a significant change | An [RFC](rfc/README.md) |
| Fix one well-understood problem | A [plan](plans/README.md), or straight to a pull request |

## Three kinds of documents

| Kind | Documents | Rule |
|---|---|---|
| **Living**: how things are now | `architecture.md`, `invariants.md`, `glossary.md`, `roadmap.md`, `code-tour.md` | Updated **in the same commit** as the code that makes them wrong |
| **Frozen**: why | accepted `rfc/`, `adr/`, `plans/` | Never rewritten. A decision that changes = a new ADR that replaces the old one |
| **Proposals**: before deciding | `rfc/` while Draft or In discussion | Draft → In discussion → Accepted (then ADRs, code) or Rejected |

Fixing a typo or a link broken by a move is allowed in a frozen document. Anything else is a new ADR.

## What to update when

| What changes in a pull request | Update |
|---|---|
| A package, the registry pipeline, the CLI, the site, where something lives | `architecture.md` |
| How the code is organised, an important file, a known weak spot | `code-tour.md` |
| A decision is taken or changes | A new ADR, and the list in `adr/README.md` |
| An open question is settled | Remove it from `roadmap.md`, write the ADR |
| A new term, or a term that changes meaning | `glossary.md` |
| A rule nothing may break | `invariants.md`, through an ADR |
| A step of the project moves forward | `roadmap.md` |
| A component is added | `roadmap.md` (count), and its site page in `apps/site` |

## Language

Project docs, code, identifiers and comments are in plain English. Short sentences, concrete words, no marketing.
