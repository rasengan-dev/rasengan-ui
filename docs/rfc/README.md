# Proposals (RFCs)

An RFC is written **before** a significant piece of work: a new component family, a new village, a change to the token
contract, the CLI, the MCP server or the registry format. It is where the problem and the design are thought through
and settled. Once accepted it produces one or more [ADRs](../adr/README.md) when it settles lasting choices, and the
code follows. Smaller fixes are a [plan](../plans/README.md) or go straight to a pull request.

## Lifecycle

```
Draft ──► In discussion ──► Accepted ──► (ADRs, code)
                 └────────► Rejected  (the document stays: we will know why)

Accepted ──► Superseded by RFC-NNNN or ADR-NNNN
```

- **An accepted RFC is frozen.** What is built, what is left and the open questions are tracked in the
  [roadmap](../roadmap.md), not in the RFC's header. A decision of an RFC that changes later becomes an ADR, and the
  RFC gets a line under its status: `→ "<topic>" replaced by ADR-NNNN`.
- Open questions are copied to the roadmap when the RFC is accepted. Once one is settled, the roadmap drops it and an
  ADR records the answer; the RFC is not edited.

## List

| No. | Subject | Status | Date |
|---|---|---|---|
| [0001](0001-v2-animated-blocks.md) | Rasengan UI v2: animated blocks an agent can compose | Superseded by RFC-0002, except the block content contract | 2026-10-22 |
| [0002](0002-villages.md) | Components on Base UI, themed by villages | Accepted | 2026-10-28 |
| [0003](0003-mcp-server.md) | The MCP server: the registry, for agents | Accepted | 2026-10-31 |
| [0004](0004-v1-components.md) | The twelve components a v1 needs | Accepted | 2026-10-31 |
| [0005](0005-dates-and-times.md) | Dates and times | Accepted | 2026-11-01 |
| [0006](0006-custom-villages.md) | Found your own village | Accepted | 2026-11-01 |
| [0007](0007-motion-components.md) | Motion components | Accepted | 2026-11-07 |

RFCs 0001 to 0006 were written before this format and keep their own headers (`- Status:`, `- Author:`…). New RFCs use
the template below.

## Template

Copy to `NNNN-short-title.md`, with the next number:

```markdown
# RFC-NNNN — Title

| | |
|---|---|
| Status | Draft · In discussion · Accepted · Rejected · Superseded by … |
| Date | YYYY-MM-DD |
| Author | Name |
| Builds on | RFC-NNNN, ADR-NNNN, or — |
| Packages | The folders it touches |
| Decision needed | What has to be settled |

## Problem

What is wrong or missing, and for whom.

## Goals

## Non-goals

What we are explicitly not trying to do.

## Proposal

The design: files, tokens, APIs, flows, examples.

## Options considered

- **Option**: why not.

## Risks and open questions

Numbered, so the roadmap and ADRs can point at them.

## Plan

The steps (lots), and how we will know each one is done (the quality gate).
```
