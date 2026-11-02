import { CheckIcon, CircleAlertIcon, LoaderIcon } from 'lucide-react';
import type { Village } from '@rasengan-ui/villages/engine';
import { cn } from '@/lib/utils';
import type { VillageState } from './use-village';

const reasons: Record<string, string> = {
  'the brand colour holds with its text and on the page': 'so the colour holds with its text and as text on the page',
};

function Status({ state }: { state: VillageState }) {
  const { village, error, pending } = state;
  const failing = village?.problems.length ?? 0;
  const tone = error || failing ? 'destructive' : 'success';
  const title = error ? 'The recipe needs a fix' : failing ? 'Needs a change' : 'Accessible';
  const line = error
    ? error.replace(/^Invalid recipe:\s*/, '')
    : failing
      ? `${failing} pair${failing > 1 ? 's' : ''} under the minimum: the CLI would write nothing.`
      : 'Every pair passes in every nature, light and dark, with the village greys and neutral ones.';
  return (
    <div className="flex items-start gap-3">
      <span className={cn('grid size-8 shrink-0 place-items-center rounded-full', tone === 'success' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground')} aria-hidden>
        {pending && !village ? <LoaderIcon className="size-4 animate-spin" /> : tone === 'success' ? <CheckIcon className="size-4" /> : <CircleAlertIcon className="size-4" />}
      </span>
      <div className="grid min-w-0 gap-0.5" role="status" aria-live="polite">
        <strong className="font-semibold">{pending && !village ? 'Making the village…' : title}</strong>
        <span className="text-sm whitespace-pre-line text-muted-foreground">{pending && !village ? 'The engine runs in your browser.' : line}</span>
      </div>
    </div>
  );
}

function Brand({ village }: { village: Village }) {
  const lines = (['light', 'dark'] as const).map((scheme) => {
    const moved = village.adjustments.find((a) => a.scheme === scheme && a.token === '--primary-l');
    const text = village.adjustments.find((a) => a.scheme === scheme && a.token === '--on-primary');
    const tone = text ? 'the other scheme’s text on it' : 'its own text on it';
    return `${scheme === 'light' ? 'Light' : 'Dark'}: ${moved ? `lightness ${moved.from} → ${moved.to}` : 'kept as it is'}, ${tone}.`;
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

export function Report({ state }: { state: VillageState }) {
  const { village } = state;
  const adjustments = village?.adjustments.filter((a) => a.token !== '--primary-l' && a.token !== '--on-primary') ?? [];
  return (
    <div className="grid items-start gap-4 md:grid-cols-2 2xl:grid-cols-1">
      <section className="grid gap-4 rounded-xl border-village bg-card p-5 text-card-foreground">
        <Status state={state} />
        {village && village.ownNature ? <Brand village={village} /> : null}
      </section>

      {village?.problems.length ? (
        <section className="grid gap-2 rounded-xl border-village bg-card p-5 text-card-foreground">
          <h2 className="text-sm font-semibold">Pairs under the minimum</h2>
          {village.problems.map((p) => (
            <div key={`${p.scheme} ${p.pair}`} className="grid gap-0.5 rounded-control border-village p-3 text-sm">
              <span className="font-mono text-xs break-all">{p.pair}</span>
              <span className="text-muted-foreground">
                {p.scheme}: {p.value.toFixed(2)}:1, needs {p.min}:1 · {p.scopes.length} scope{p.scopes.length > 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </section>
      ) : null}

      {village ? (
        <section className="grid gap-2 rounded-xl border-village bg-card p-5 text-card-foreground">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold">Adjustments</h2>
            <span className="text-xs text-muted-foreground">{adjustments.length ? `${adjustments.length} made for you` : ''}</span>
          </div>
          {adjustments.length === 0 ? <p className="text-sm text-muted-foreground">None: every other value is as the recipe makes it.</p> : null}
          {adjustments.map((a) => (
            <div key={`${a.scheme} ${a.token} ${a.to}`} className="grid gap-0.5 rounded-control border-village p-3 text-sm">
              <span className="flex justify-between gap-2 font-mono text-xs">
                <span className="break-all">{a.token}</span>
                <span className="text-muted-foreground">{a.scheme}</span>
              </span>
              <span className="font-mono text-xs">
                {a.from} → {a.to}
              </span>
              <span className="text-xs text-muted-foreground">{reasons[a.reason] ?? `for ${a.reason}`}</span>
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
