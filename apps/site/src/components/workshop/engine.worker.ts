/// <reference lib="webworker" />
/**
 * The village engine off the main thread (RFC-0006, "The workshop"): a village takes about a quarter of a second, so
 * sliders stay smooth. Requests that arrive while one is being made are folded: only the latest is made next.
 */
import contract from '@rasengan-ui/villages/contract.css?raw';
import natures from '@rasengan-ui/villages/natures.css?raw';
import { parseSources } from '@rasengan-ui/villages/contrast';
import { createVillage, type Recipe } from '@rasengan-ui/villages/engine';

export type EngineRequest = { id: number; recipe: Recipe };
export type EngineResponse = { id: number; village?: ReturnType<typeof createVillage>; error?: string };

const { villages, ...sources } = parseSources({ contract, natures, villages: {} });

let next: EngineRequest | undefined;
let scheduled = false;

function run() {
  scheduled = false;
  const request = next;
  next = undefined;
  if (!request) return;
  let response: EngineResponse;
  try {
    response = { id: request.id, village: createVillage(request.recipe, { sources }) };
  } catch (error) {
    response = { id: request.id, error: error instanceof Error ? error.message : String(error) };
  }
  self.postMessage(response);
}

self.onmessage = (event: MessageEvent<EngineRequest>) => {
  next = event.data;
  if (!scheduled) {
    scheduled = true;
    setTimeout(run, 0);
  }
};
