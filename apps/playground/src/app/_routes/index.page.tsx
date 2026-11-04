import { PageComponent } from 'rasengan';
import ThemeToggle from '@/components/theme-toggle';
import Try from '@/try';

const steps = [
  ['pnpm registry', 'Build the registry the CLI reads (apps/site/public/r), after changing a component'],
  ['pnpm playground ui init', 'Set the playground up: village, nature, CSS imports, <html>'],
  ['pnpm playground ui add button dialog', 'Add components, then import them in src/try.tsx'],
  ['pnpm playground ui village set iwa', 'Switch village, nature (nature set) or greys (tint set)'],
  ['pnpm playground ui diff', 'See your edits and the registry’s changes; update merges them'],
  ['pnpm playground ui doctor', 'Check the setup'],
  ['pnpm playground reset', 'Back to the starter, before any Rasengan UI'],
];

const Page: PageComponent = () => {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col gap-10 px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Rasengan UI playground</h1>
          <p className="text-muted-foreground">A Rasengan.js project to try the CLI and the components on.</p>
        </div>
        <ThemeToggle />
      </header>

      <section aria-labelledby="try" className="flex flex-col gap-3">
        <h2 id="try" className="text-lg font-semibold">
          Try
        </h2>
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-border p-8">
          <Try />
        </div>
      </section>

      <section aria-labelledby="commands" className="flex flex-col gap-3">
        <h2 id="commands" className="text-lg font-semibold">
          Commands, from the repository root
        </h2>
        <ol className="flex flex-col gap-3">
          {steps.map(([command, what]) => (
            <li key={command} className="flex flex-col gap-0.5">
              <code className="font-mono text-sm">{command}</code>
              <span className="text-sm text-muted-foreground">{what}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
};

Page.metadata = {
  title: 'Rasengan UI playground',
  description: 'Try the Rasengan UI CLI and components.',
};

export default Page;
