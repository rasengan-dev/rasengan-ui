# ADR-0021 — The demo video is a file the site serves, made from a placeholder photo

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-24 |
| Replaces | — (extends ADR-0014 and ADR-0015 to video) |

## Context

RFC-0012's `video` needs a real video in its demos: a poster and a play button are not enough to see it play, nor
the background loop. The registry carries text only (`scripts/registry.mjs` refuses anything in `registry/placeholders`
but SVG and Markdown, ADR-0014), so a video cannot travel in `rasengan-placeholders`, and `apps/site/public/placeholders/`
is generated from it and ignored by git.

## Decision

- **One short video, made here, served by the site**: `apps/site/public/media/restaurant-room.mp4` (8 seconds,
  960 × 540, H.264 without sound, about 290 kB) and its poster `restaurant-room-poster.jpg`, committed. It is a slow
  zoom on the `restaurant-room` placeholder's photo (Brands&People, Unsplash License, credited in
  `registry/placeholders/CREDITS.md`), made with ffmpeg: a derivative the Unsplash License allows.
- **`/media/` is the site's own folder** for files the registry cannot carry. The video's demos point at it; published as
  registry examples, they keep the path, and the `video` page says a project uses its own file.
- No video in blocks until a block needs one; that block's RFC decides.

## Options ruled out

- **A video hosted elsewhere** (a free stock CDN): a third-party request from the site, and a link that can break.
- **No real video** (an empty `src`): the demos would never play.
- **The video in the registry** as base64 text: a few hundred kB in every install of `rasengan-placeholders`, for a demo.

## Consequences

- The site's demos play a real video, offline in development too.
- An agent that installs a video example gets a path that does not exist in its project; it must put its own file
  there, as the page says.
