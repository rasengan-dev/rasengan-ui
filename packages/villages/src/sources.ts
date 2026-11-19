/**
 * contract.css and natures.css, read and parsed: what `createVillage` asks for as `sources` (ADR-0017). For code that
 * cannot read files: a browser, a web worker. The CLI and the scripts read the two files themselves.
 *
 * The `?raw` imports are Vite's in the workspace; the published build inlines the two files as strings.
 */
import contract from "./contract.css?raw";
import natures from "./natures.css?raw";
import { parseSources, type Sources } from "./contrast.ts";

const { villages: _none, ...parsed } = parseSources({ contract, natures, villages: {} });

export const sources: Omit<Sources, "villages"> = parsed;
