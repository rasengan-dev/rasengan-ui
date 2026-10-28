import { PageComponent } from 'rasengan';
import { components } from '@/catalogue';
import { VillageToolbar } from '@/components/village-toolbar';

const Home: PageComponent = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-12 sm:px-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium text-primary">Rasengan UI · next</p>
        <h1 className="font-display text-4xl font-semibold tracking-display">Components on Base UI, themed by villages</h1>
        <p className="max-w-2xl text-muted-foreground">
          The foundations of RFC-0002. Every preview below reads only the token contract: change the village or the nature and
          everything follows.
        </p>
      </header>

      <div className="sticky top-0 z-10 -mx-4 border-b border-village bg-background/85 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <VillageToolbar />
      </div>

      <ul className="grid gap-6">
        {components.map(({ name, title, description, status, Demo }) => (
          <li key={name} className="overflow-hidden rounded-xl border-village bg-card text-card-foreground shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-village px-5 py-3">
              <h2 className="font-medium">{title}</h2>
              <span className="text-xs text-muted-foreground">
                {name} · {status}
              </span>
            </div>
            <div className="flex min-h-40 items-center justify-center p-8">{Demo ? <Demo /> : null}</div>
            <p className="border-t border-village px-5 py-3 text-sm text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

Home.metadata = {
  title: 'Rasengan UI · next',
  description: 'Components on Base UI, themed by the villages of the Naruto universe.',
};

export default Home;
