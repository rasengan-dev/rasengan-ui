import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { natures, tints, villages, defaultTint, defaultVillage, type Nature, type Tint, type Village } from '@rasengan-ui/villages';
import { Button } from '@/components/ui/button';

/**
 * Village, nature, tint and light/dark for the whole page. They are set on <html>,
 * not on a wrapper, because popups (dialog, menus) render in a portal on <body>.
 */
export function VillageToolbar() {
  const [village, setVillage] = useState<Village>(defaultVillage);
  const [nature, setNature] = useState<Nature>(villages[defaultVillage].defaultNature);
  const [tint, setTint] = useState<Tint>(defaultTint);
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(window.matchMedia('(prefers-color-scheme: dark)').matches), []);

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.village = village;
    html.dataset.nature = nature;
    html.dataset.tint = tint;
    html.classList.toggle('dark', dark);
  }, [village, nature, tint, dark]);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Group label="Village">
        {(Object.keys(villages) as Village[]).map((name) => (
          <Button key={name} size="sm" variant={name === village ? 'default' : 'outline'} aria-pressed={name === village} onClick={() => setVillage(name)}>
            {villages[name].title}
          </Button>
        ))}
      </Group>
      <Group label="Nature">
        {(Object.keys(natures) as Nature[]).map((name) => (
          <Button
            key={name}
            size="sm"
            variant={name === nature ? 'secondary' : 'ghost'}
            aria-pressed={name === nature}
            title={natures[name].element}
            onClick={() => setNature(name)}
          >
            <span data-nature={name} className="size-2.5 rounded-full bg-primary" aria-hidden />
            {natures[name].title}
          </Button>
        ))}
      </Group>
      <Group label="Greys">
        {(Object.keys(tints) as Tint[]).map((name) => (
          <Button key={name} size="sm" variant={name === tint ? 'secondary' : 'ghost'} aria-pressed={name === tint} onClick={() => setTint(name)}>
            {tints[name].title}
          </Button>
        ))}
      </Group>
      <Button size="icon" variant="outline" aria-label={dark ? 'Light mode' : 'Dark mode'} onClick={() => setDark(!dark)}>
        {dark ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
      {children}
    </div>
  );
}
