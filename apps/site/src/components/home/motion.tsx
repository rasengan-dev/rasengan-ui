import { useState } from 'react';
import { ArrowRightIcon, RefreshCwIcon, RocketIcon, Trash2Icon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, ButtonRollingText, HoldButton } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/carousel';
import { CursorArea } from '@/components/ui/cursor';
import { Gallery3D, type GalleryEntry } from '@/components/ui/gallery-3d';
import { Marquee } from '@/components/ui/marquee';
import { NumberRoll } from '@/components/ui/number-roll';
import { PageTransition, usePageTransition } from '@/components/ui/page-transition';
import { ScrambleText } from '@/components/ui/scramble-text';
import { TextReveal } from '@/components/ui/text-reveal';
import { Typewriter } from '@/components/ui/typewriter';

/*
 * The home page's Motion tab: the motion components in small product screens, inside one CursorArea so the custom
 * cursor wraps the buttons and links. Like the other tabs, only registry components and contract tokens: every card
 * moves the way the village does.
 */

function LaunchCard() {
  const [status, setStatus] = useState(0);
  const statuses = ['Queued', 'Building', 'Deploying', 'Live'];
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Deploy status:{' '}
          <ScrambleText
            text={statuses[status]}
            trigger="mount"
            className="font-mono font-semibold text-foreground"
          />
        </CardDescription>
        <CardTitle className="text-2xl">
          <Typewriter
            text={['Ship the landing page.', 'Ship it before lunch.', 'Ship it in every village.']}
            loop
          />
        </CardTitle>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button size="sm" onClick={() => setStatus((s) => (s + 1) % statuses.length)}>
          <RocketIcon />
          <ButtonRollingText>Next step</ButtonRollingText>
        </Button>
        <Button size="sm" variant="ghost" data-cursor-label="Logs">
          View logs
        </Button>
      </CardFooter>
    </Card>
  );
}

const seed = [
  { label: 'Sites shipped', value: 12480 },
  {
    label: 'Uptime',
    value: 0.9997,
    format: { style: 'percent', minimumFractionDigits: 2 } as const,
  },
  {
    label: 'Raised',
    value: 4200000,
    format: { style: 'currency', currency: 'USD', notation: 'compact' } as const,
  },
];

function StatsRollCard() {
  const [stats, setStats] = useState(seed);
  const refresh = () =>
    setStats((current) =>
      current.map((stat) => ({
        ...stat,
        value:
          stat.label === 'Uptime'
            ? 0.99 + Math.random() * 0.0099
            : Math.round(stat.value * (0.9 + Math.random() * 0.3)),
      })),
    );
  return (
    <Card>
      <CardHeader>
        <CardTitle>This quarter</CardTitle>
        <CardDescription>Live numbers roll to their value.</CardDescription>
        <CardAction>
          <Button
            size="icon-sm"
            variant="outline"
            aria-label="Refresh the numbers"
            onClick={refresh}
          >
            <RefreshCwIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-3 gap-3">
          {stats.map(({ label, value, format }) => (
            <div key={label} className="grid gap-1">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="font-display text-xl font-semibold tracking-display">
                <NumberRoll value={value} format={format} locale="en-US" />
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

const companies = ['Lumen', 'Northwind', 'Acme', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Stark'];

function LogosCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Trusted by teams building with villages</CardDescription>
      </CardHeader>
      <CardContent>
        <Marquee label="Companies building with Rasengan UI" gap="2rem">
          {companies.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-semibold tracking-display text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </CardContent>
    </Card>
  );
}

const quotes = [
  { quote: 'We shipped the landing page before lunch.', who: 'Ada, Lumen' },
  { quote: 'Switching to Iwa took one attribute.', who: 'Grace, Northwind' },
  { quote: 'Our agent installs the components right.', who: 'Linus, Globex' },
];

function TestimonialsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What people say</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel label="What people say" autoplay={5} loop>
          <CarouselContent>
            {quotes.map(({ quote, who }) => (
              <CarouselItem key={who}>
                <figure className="m-0 flex flex-col gap-2 rounded-lg bg-muted p-4 pe-12">
                  <blockquote className="m-0 font-display font-semibold tracking-display">
                    “{quote}”
                  </blockquote>
                  <figcaption className="text-sm text-muted-foreground">{who}</figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </CardContent>
    </Card>
  );
}

const colours = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5'];
const work: GalleryEntry[] = [
  'Lumen',
  'Northwind',
  'Globex',
  'Initech',
  'Hooli',
  'Stark',
  'Acme',
].map((name, i) => ({
  id: name,
  label: `${name}, a landing page`,
  caption: name,
  description: `A landing page built with Rasengan UI for ${name}.`,
  content: (
    <span className={`flex size-full items-center justify-center ${colours[i % colours.length]}`}>
      <span className="flex size-14 items-center justify-center rounded-pill bg-background font-display text-2xl font-semibold tracking-display text-foreground">
        {i + 1}
      </span>
    </span>
  ),
}));

function GalleryCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Our work</CardTitle>
        <CardDescription>Drag, use the arrows, or click a card.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Gallery3D label="Our work" items={work} layout="coverflow" defaultIndex={3} itemSize={140} height={260} />
      </CardContent>
    </Card>
  );
}

const steps = [
  {
    title: 'Pick a village',
    text: 'Konoha, Kiri, Iwa or Kusa: the whole design language at once.',
  },
  { title: 'Pick a nature', text: 'The accent hue, crossed with any village.' },
  { title: 'Ship it', text: 'npx rasengan-ui init, then add what you need.' },
];

function StepsNav({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  const { run } = usePageTransition();
  const last = step === steps.length - 1;
  return (
    <div className="flex justify-between gap-2 border-t-(length:--border-width) p-3">
      <Button
        size="sm"
        variant="ghost"
        disabled={step === 0}
        onClick={(event) => run(() => setStep(step - 1), { x: event.clientX, y: event.clientY })}
      >
        Back
      </Button>
      <Button
        size="sm"
        onClick={(event) =>
          run(() => setStep(last ? 0 : step + 1), { x: event.clientX, y: event.clientY })
        }
      >
        <ButtonRollingText stagger>{last ? 'Start again' : 'Continue'}</ButtonRollingText>
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

function OnboardingCard() {
  const [step, setStep] = useState(0);
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <PageTransition id={String(step)} scope="element" effect="wipe" focus="h3">
        <div className="flex min-h-36 flex-col gap-2 p-6">
          <Badge variant="soft" className="w-fit">
            Step {step + 1} of {steps.length}
          </Badge>
          <h3 className="font-display text-xl font-semibold tracking-display case-heading outline-none">
            {steps[step].title}
          </h3>
          <p className="text-sm text-muted-foreground">{steps[step].text}</p>
        </div>
        <StepsNav step={step} setStep={setStep} />
      </PageTransition>
    </Card>
  );
}

function DangerCard() {
  const [deleted, setDeleted] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete the project</CardTitle>
        <CardDescription>Hold the button: a slip of the finger does nothing.</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between gap-2">
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {deleted ? 'Deleted. Just kidding, it is a demo.' : 'Nothing deleted yet.'}
        </span>
        <HoldButton size="sm" variant="destructive" onConfirm={() => setDeleted(true)}>
          <Trash2Icon />
          Hold to delete
        </HoldButton>
      </CardFooter>
    </Card>
  );
}

/**
 * Three columns from `xl`, like the Examples tab; the whole tab wears the custom cursor. Columns are `min-w-0`: the
 * marquee's track is as wide as its copies, and would otherwise widen its column.
 */
export function MotionExample() {
  return (
    <CursorArea className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="grid min-w-0 grid-cols-1 gap-4">
        <TextReveal
          as="h3"
          by="words"
          className="px-1 font-display text-2xl font-semibold tracking-display text-balance case-heading"
        >
          Motion that follows the village
        </TextReveal>
        <LaunchCard />
        <StatsRollCard />
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-4">
        <GalleryCard />
        <LogosCard />
      </div>
      <div className="grid min-w-0 items-start gap-4 md:col-span-2 md:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
        <OnboardingCard />
        <TestimonialsCard />
        <DangerCard />
      </div>
    </CursorArea>
  );
}
