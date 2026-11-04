#!/usr/bin/env node
/**
 * Puts the playground back as committed, before any Rasengan UI: removes what the CLI wrote and
 * restores the files `init` edits. Your own changes elsewhere in src/ are left alone.
 */
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const generated = ["rasengan-ui.json", "rasengan-ui.lock", ".rasengan-ui", "src/components/ui", "src/lib", "src/styles/rasengan"];
for (const path of generated) rmSync(join(root, path), { recursive: true, force: true });

const edited = ["src/styles/index.css", "src/template.tsx"];
execFileSync("git", ["checkout", "--", ...edited], { cwd: root, stdio: "inherit" });

console.log(`Removed ${generated.join(", ")}; restored ${edited.join(", ")}.\nStart again with \`pnpm playground ui init\`.`);
