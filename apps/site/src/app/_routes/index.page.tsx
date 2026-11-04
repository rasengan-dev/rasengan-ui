import { Link, PageComponent } from 'rasengan';
import { ArrowRightIcon } from 'lucide-react';
import { villages, type Village } from '@rasengan-ui/villages';
import { components, getComponent } from '@/catalogue';
import { VillageScope } from '@/lib/village-scope';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/components/mdx/code-block';
import { SiteFooter } from '@/components/layout/footer';
import { AuthenticationExample } from '@/components/home/authentication';
import { CardsExample } from '@/components/home/cards';
import { DashboardExample } from '@/components/home/dashboard';
import { SettingsExample } from '@/components/home/settings';
import { VillageSwitch } from '@/components/home/village-switch';
import { setSettings, useSettings } from '@/settings';

const examples = [
  { value: 'cards', label: 'Examples', Example: CardsExample },
  { value: 'dashboard', label: 'Dashboard', Example: DashboardExample },
  { value: 'settings', label: 'Settings', Example: SettingsExample },
  { value: 'authentication', label: 'Authentication', Example: AuthenticationExample },
];

const install = 'npx rasengan-ui init';

function Hero() {
  return (
    <section className="flex flex-col items-center gap-5 px-4 pt-16 pb-10 text-center sm:pt-24">
      <Badge variant="secondary" render={<Link to="/docs/cli" />}>
        New · the rasengan-ui CLI <ArrowRightIcon />
      </Badge>
      <h1 className="max-w-3xl font-display text-4xl leading-tight font-semibold tracking-display text-balance case-heading sm:text-6xl">
        Components that wear a village
      </h1>
      <p className="max-w-2xl text-lg text-balance text-muted-foreground">
        {components.length} accessible components on Base UI and Tailwind, copied into your project.
        Pick a village for the design language, a nature for the colour, and switch both at runtime.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link to="/docs/installation" className={buttonVariants()}>
          Get started
        </Link>
        <Link to="/components" className={buttonVariants({ variant: 'ghost' })}>
          Browse components
        </Link>
      </div>
      <div className="flex items-center gap-1 rounded-control border-village bg-card py-1 ps-4 pe-1 font-mono text-sm text-card-foreground">
        <span className="text-muted-foreground select-none" aria-hidden>
          $
        </span>
        <code className="pe-2">{install}</code>
        <CopyButton text={install} className="static border-transparent opacity-100" />
      </div>
    </section>
  );
}

function Examples() {
  return (
    <section aria-label="Examples" className="mx-auto w-full max-w-[1440px] px-4 md:px-6">
      <Tabs defaultValue="cards" className="gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList className="hide-scrollbar max-w-full overflow-x-auto">
            {examples.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <VillageSwitch />
        </div>
        {examples.map(({ value, Example }) => (
          <TabsContent
            key={value}
            value={value}
            className="rounded-xl border-village bg-muted/40 p-3 sm:p-4 md:p-6"
          >
            <Example />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

const schemes = ['light', 'dark'] as const;

/** The card demo in each village side by side, in the page's nature: the same code, three design languages. */
function Villages() {
  const { Demo } = getComponent('card');
  const { village: current, dark } = useSettings();
  return (
    <section
      aria-labelledby="villages-title"
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-24 md:px-6"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <h2
          id="villages-title"
          className="font-display text-3xl font-semibold tracking-display text-balance case-heading sm:text-4xl"
        >
          One codebase, three villages
        </h2>
        <p className="max-w-2xl text-balance text-muted-foreground">
          A village is a whole design language: radius, borders, type, shadows, motion. Components
          only read the token contract, so the same card becomes Konoha, Kiri or Iwa without a
          single changed line.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {(Object.keys(villages) as Village[]).map((village) => (
          <VillageScope
            key={village}
            village={village}
            scheme={schemes[Number(dark)]}
            as="figure"
            className="m-0 flex flex-col overflow-hidden rounded-xl border-village bg-background text-foreground"
          >
            <div className="flex min-h-72 flex-1 items-center justify-center p-6">
              {Demo ? <Demo /> : null}
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t-(length:--border-width) px-5 py-4">
              <span className="grid gap-0.5">
                <span className="font-display font-semibold tracking-display case-heading">
                  {villages[village].title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {villages[village].description}
                </span>
              </span>
              <Button
                variant={current === village ? 'secondary' : 'outline'}
                size="sm"
                disabled={current === village}
                onClick={() => setSettings({ village })}
              >
                {current === village ? 'Wearing' : 'Wear'}
              </Button>
            </figcaption>
          </VillageScope>
        ))}
      </div>
    </section>
  );
}

const Home: PageComponent = () => {
  return (
    <main id="main" className="flex flex-col">
      <Hero />
      <Examples />
      <Villages />
      <SiteFooter />
    </main>
  );
};

Home.metadata = {
  title: 'Rasengan UI',
  description:
    'Accessible components on Base UI and Tailwind, themed by the villages of the Naruto universe.',
};

export default Home;
