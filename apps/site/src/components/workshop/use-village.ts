import { useEffect, useRef, useState } from 'react';
import type { Recipe, Village } from '@rasengan-ui/villages/engine';
import type { EngineRequest, EngineResponse } from './engine.worker';

export interface VillageState {
  /** The last village made: kept while the next one is being made, and when a recipe is invalid. */
  village?: Village;
  /** Why the current recipe can't be made (an invalid name, a colour that doesn't parse…). */
  error?: string;
  pending: boolean;
}

/** Makes the recipe's village in a worker, the latest recipe winning. Nothing runs on the server. */
export function useVillage(recipe: Recipe): VillageState {
  const [state, setState] = useState<VillageState>({ pending: true });
  const worker = useRef<Worker | null>(null);
  const latest = useRef(0);
  const key = JSON.stringify(recipe);

  useEffect(() => {
    const w = new Worker(new URL('./engine.worker.ts', import.meta.url), { type: 'module' });
    w.onmessage = (event: MessageEvent<EngineResponse>) => {
      const { id, village, error } = event.data;
      if (id !== latest.current) return;
      setState((previous) => ({ village: village ?? previous.village, error, pending: false }));
    };
    worker.current = w;
    return () => {
      w.terminate();
      worker.current = null;
    };
  }, []);

  // Runs after the effect above on mount, so the first recipe reaches the worker too.

  useEffect(() => {
    const id = ++latest.current;
    setState((previous) => ({ ...previous, pending: true }));
    worker.current?.postMessage({ id, recipe: JSON.parse(key) } satisfies EngineRequest);
  }, [key]);

  return state;
}
