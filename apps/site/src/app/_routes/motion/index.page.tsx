import { useId, useState } from 'react';
import { Link, type PageComponent } from 'rasengan';
import { RotateCcwIcon, SparklesIcon } from 'lucide-react';
import { villages, type Village } from '@rasengan-ui/villages';
import { builtinRecipes, type Motion } from '@rasengan-ui/villages/engine';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MotionProvider, Stagger } from '@/lib/motion';
import { VillageScope } from '@/lib/village-scope';
import { groups } from '@/catalogue';

/** What each value of the recipe's `motion` knob feels like. */
const characters: Record<Motion, string> = {
  quick: 'Exact: fades in place, no travel, no overshoot.',
  calm: 'Smooth ease-out, a short rise, a light spring.',
  gentle: 'Slower and floaty, a longer rise.',
  bouncy: 'Springs that overshoot: things drop into place.',
};

/**
 * /motion (RFC-0007): the components whose motion is the point, as a gallery of live demos, with a replay button and
 * a switch that shows what reduced-motion users get. Above them, the same reveal in every village.
 */
const MotionGallery: PageComponent = () => {
  const [run, setRun] = useState(0);
  const [reduced, setReduced] = useState(false);
  const switchId = useId();
  const motion = groups.find((group) => group.id === 'motion')?.components ?? [];

  return (
    <div className="px-4 pt-10 pb-16 md:px-10 lg:pt-14">
      <div className="mx-auto w-full max-w-[1040px]">
        <header className="flex flex-col gap-3">
          <h1 className="font-display text-[34px] leading-[1.1] font-semibold tracking-display case-heading md:text-[40px]">
            Motion
          </h1>
          <p className="max-w-2xl text-[15.5px] leading-[1.7] text-muted-foreground">
            Components whose motion is the point. They read the village's motion: its durations, its spring, how far
            things travel and how intense the effects may be. Switch the village above and the same component moves
            differently, with no prop changed.
          </p>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button variant="outline" onClick={() => setRun((n) => n + 1)}>
            <RotateCcwIcon aria-hidden="true" />
            Replay
          </Button>
          <div className="flex items-center gap-2">
            <Switch id={switchId} checked={reduced} onCheckedChange={setReduced} />
            <Label htmlFor={switchId}>Reduced motion</Label>
          </div>
        </div>

        <MotionProvider mode={reduced ? 'off' : undefined}>
          <section aria-labelledby="villages-title" className="mt-10">
            <h2 id="villages-title" className="font-display text-[24px] font-semibold tracking-display case-heading">
              One reveal, four villages
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-[1.7] text-muted-foreground">
              The same three items, revealed one after another. Each village sets its motion in its recipe.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(Object.keys(villages) as Village[]).map((village) => {
                const knob = builtinRecipes[village].motion;
                return (
                  <VillageScope
                    key={village}
                    village={village}
                    as="figure"
                    data-slot="village-cell"
                    className="m-0 flex flex-col overflow-hidden rounded-lg border-village"
                  >
                    <figcaption className="flex items-baseline justify-between gap-3 border-b-(length:--border-width) px-4 py-2">
                      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        {villages[village].title} · {knob}
                      </span>
                    </figcaption>
                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <p className="m-0 text-sm text-muted-foreground">{characters[knob]}</p>
                      <Stagger key={run} as="ul" className="m-0 flex list-none flex-col gap-2 p-0">
                        {['Design', 'Build', 'Ship'].map((step, index) => (
                          <Stagger.Item
                            key={step}
                            as="li"
                            className="flex items-center gap-3 rounded-control border-village bg-card px-3 py-2 shadow-sm"
                          >
                            <span
                              aria-hidden="true"
                              className="flex size-6 items-center justify-center rounded-pill bg-primary text-xs font-semibold text-primary-foreground"
                            >
                              {index + 1}
                            </span>
                            <span className="text-sm font-medium">{step}</span>
                          </Stagger.Item>
                        ))}
                      </Stagger>
                    </div>
                  </VillageScope>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="components-title" className="mt-12">
            <h2 id="components-title" className="font-display text-[24px] font-semibold tracking-display case-heading">
              Components
            </h2>
            {motion.length > 0 ? (
              <ul className="mt-5 grid list-none gap-4 p-0 md:grid-cols-2">
                {motion.map(({ name, title, description, href, Demo }) => (
                  <li key={name} className="flex flex-col overflow-hidden rounded-lg border-village">
                    <div key={run} className="flex min-h-56 flex-1 items-center justify-center p-6">
                      {Demo && <Demo />}
                    </div>
                    <div className="border-t-(length:--border-width) px-4 py-3">
                      <Link to={href} className="font-medium underline-offset-4 outline-none hover:underline focus-visible:focus-ring">
                        {title}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty className="mt-5 border-village">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SparklesIcon />
                  </EmptyMedia>
                  <EmptyTitle>The first motion components are on their way</EmptyTitle>
                  <EmptyDescription>
                    Text reveal, typewriter, scramble text, number roll and marquee come first, then carousel, cursor, a 3D
                    gallery and page transitions.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </section>
        </MotionProvider>
      </div>
    </div>
  );
};

MotionGallery.metadata = {
  title: 'Motion · Rasengan UI',
  description: 'Components whose motion is the point, following the village: quick in Iwa, floaty in Kiri, bouncy in Kusa.',
};

export default MotionGallery;
