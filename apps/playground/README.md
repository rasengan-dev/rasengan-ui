# Rasengan UI playground

A Rasengan.js app (the `tailwind-v4-ts` starter) to try the CLI and the components on, the way a
project using Rasengan UI would. It is committed before any Rasengan UI; the CLI runs from its
sources (`packages/cli/src`) and reads the local registry (`apps/site/public/r`).

From the repository root:

```bash
pnpm registry                          # build the registry the CLI reads
pnpm playground ui init                # set the playground up
pnpm playground ui add button dialog   # add components, then use them in src/try.tsx
pnpm playground dev                    # http://localhost:3500
pnpm playground reset                  # back to the starter
```

Every CLI command works the same way: `pnpm playground ui village set iwa`, `ui diff`,
`ui update`, `ui doctor`… What the CLI writes is ignored by git; `reset` removes it and restores
the two files `init` edits (`src/styles/index.css`, `src/template.tsx`).

The npm packages the components use are declared upfront, so `add` doesn't change package.json.
