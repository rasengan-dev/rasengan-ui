import { CheckIcon, CircleAlertIcon, LoaderIcon } from 'lucide-react';
import type { Village } from '@rasengan-ui/villages/engine';
import { cn } from '@/lib/utils';
import type { VillageState } from './use-village';

const reasons: Record<string, string> = {
  'the brand colour holds with its text': 'so the colour holds with the text on it',
  '--primary-text on --background': 'so the brand colour’s words read on the page',
  '--primary-border on --background': 'so what the brand colour fills stands out from the page',
};

function Status({ state }: { state: VillageState }) {
  const { village, error, pending } = state;
  const failing = village?.problems.length ?? 0;
  const tone = error || failing ? 'destructive' : 'success';
  const title = error ? 'The recipe needs a fix' : failing ? 'Needs a change' : 'Accessible';
  const line = error
    ? error.replace(/^Invalid recipe:\s*/, '')
    : failing
      ? `${failing} colour pair${failing > 1 ? 's are' : ' is'} too low in contrast. Change the recipe to export the village.`
      : 'Every text and colour pair is readable, in every nature, light and dark.';
  return (
    <div className="flex items-start gap-3">
      <span className={cn('grid size-8 shrink-0 place-items-center rounded-full', tone === 'success' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground')} aria-hidden>
        {pending && !village ? <LoaderIcon className="size-4 animate-spin" /> : tone === 'success' ? <CheckIcon className="size-4" /> : <CircleAlertIcon className="size-4" />}
      </span>
      <div className="grid min-w-0 gap-0.5" role="status" aria-live="polite">
        <strong className="font-semibold">{pending && !village ? 'Making the village…' : title}</strong>
        <span className="text-sm whitespace-pre-line text-muted-foreground">{pending && !village ? 'Everything happens in your browser.' : line}</span>
      </div>
    </div>
  );
}

function Brand({ village }: { village: Village }) {
  const lines = (['light', 'dark'] as const).map((scheme) => {
    const moved = village.adjustments.find((a) => a.scheme === scheme && a.token === '--primary-l');
    const text = village.adjustments.find((a) => a.scheme === scheme && a.token === '--on-primary');
    const label = scheme === 'light' ? 'Light' : 'Dark';
    const change = moved ? `adjusted so text on it stays readable (lightness ${moved.from} → ${moved.to})` : 'as you picked it';
    // The text on it switched to the other scheme's: dark text in light mode, light text in dark mode.
    const flipped = text ? `, with ${scheme === 'light' ? 'dark' : 'light'} text on it` : '';
    return `${label}: ${change}${flipped}.`;
  });
  return (
    <div className="grid gap-1 rounded-control bg-muted p-3 text-sm">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Brand colour</span>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
}

export function Report({ state, className }: { state: VillageState; className?: string }) {
  const { village } = state;
  const adjustments = village?.adjustments.filter((a) => a.token !== '--primary-l' && a.token !== '--on-primary') ?? [];
  return (
    <div className={cn('grid items-start gap-3', className)}>
      <section className="grid gap-4 rounded-lg border-village p-4">
        <Status state={state} />
        {village && village.ownNature ? <Brand village={village} /> : null}
      </section>

      {village?.problems.length ? (
        <section className="grid gap-2 rounded-lg border-village p-4">
          <h2 className="text-sm font-semibold">Too low in contrast</h2>
          {village.problems.map((p) => (
            <div key={`${p.scheme} ${p.pair}`} className="grid gap-0.5 rounded-control border-village p-3 text-sm">
              <span className="font-mono text-xs break-all">{p.pair}</span>
              <span className="text-muted-foreground">
                {p.scheme === 'light' ? 'Light' : 'Dark'}: {p.value.toFixed(2)}:1, needs at least {p.min}:1
              </span>
            </div>
          ))}
        </section>
      ) : null}

      {village ? (
        <section className="grid gap-2 rounded-lg border-village p-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold">Adjustments</h2>
            <span className="text-xs text-muted-foreground">{adjustments.length ? `${adjustments.length} made to keep text readable` : ''}</span>
          </div>
          {adjustments.length === 0 ? <p className="text-sm text-muted-foreground">None: the village uses your values as they are.</p> : null}
          {adjustments.map((a) => (
            <div key={`${a.scheme} ${a.token} ${a.to}`} className="grid gap-0.5 rounded-control border-village p-3 text-sm">
              <span className="flex justify-between gap-2 font-mono text-xs">
                <span className="break-all">{a.token}</span>
                <span className="text-muted-foreground">{a.scheme}</span>
              </span>
              <span className="font-mono text-xs">
                {a.from} → {a.to}
              </span>
              <span className="text-xs text-muted-foreground">{reasons[a.reason] ?? `so ${a.reason} stays readable`}</span>
            </div>
          ))}
          {village.notes.map((note) => (
            <p key={note} className="text-xs text-muted-foreground">
              {note}
            </p>
          ))}
        </section>
      ) : null}
    </div>
  );
}
