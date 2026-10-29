import { useSyncExternalStore } from 'react';
import { defaultTint, defaultVillage, villages, type Nature, type Tint, type Village } from '@rasengan-ui/villages';

/** Where the choice is kept; template.tsx applies it before the first paint. */
export const settingsKey = 'rasengan-ui:settings';

export type Settings = { village: Village; nature: Nature; tint: Tint; dark: boolean };

const defaults: Settings = { village: defaultVillage, nature: villages[defaultVillage].defaultNature, tint: defaultTint, dark: false };

/*
 * Village, nature, tint and light/dark for the whole page, on <html> rather than on a wrapper,
 * because popups (dialog, menus) render in a portal on <body>. One store, so the header's
 * selectors, the dark toggle and the mobile menu always agree.
 */
let current: Settings | undefined;
const listeners = new Set<() => void>();

function read(): Settings {
  const html = document.documentElement;
  return {
    village: (html.dataset.village as Village) ?? defaults.village,
    nature: (html.dataset.nature as Nature) ?? defaults.nature,
    tint: (html.dataset.tint as Tint) ?? defaults.tint,
    dark: html.classList.contains('dark'),
  };
}

export function setSettings(patch: Partial<Settings>) {
  current = { ...(current ?? read()), ...patch };
  const html = document.documentElement;
  html.dataset.village = current.village;
  html.dataset.nature = current.nature;
  html.dataset.tint = current.tint;
  html.classList.toggle('dark', current.dark);
  try {
    localStorage.setItem(settingsKey, JSON.stringify(current));
  } catch {
    /* Storage blocked: the choice lasts until the next load. */
  }
  for (const listener of listeners) listener();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The server renders the defaults; on the client, what <html> already wears. */
export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, () => (current ??= read()), () => defaults);
}
