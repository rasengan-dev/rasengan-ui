import { useState, type FormEvent } from 'react';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  FileTextIcon,
  ImageIcon,
  MinusIcon,
  PlusIcon,
  SendIcon,
  UserPlusIcon,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { Bars } from './bars';

/*
 * The home page's wall of examples, after ui.shadcn.com: small product screens built only from
 * registry components and contract tokens, so every card changes with the village and the nature.
 */

export function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Missions completed</CardDescription>
        <CardTitle className="text-3xl tabular-nums">1,284</CardTitle>
        <CardAction>
          <Badge variant="outline">
            <ArrowUpRightIcon /> 18.2%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Bars
          values={[32, 45, 28, 60, 52, 74, 66, 80, 58, 90, 72, 96]}
          label="Missions per month, last 12 months"
          className="h-20"
        />
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">Up from 1,086 last quarter</CardFooter>
    </Card>
  );
}

export function CreateAccountCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your email below to create your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline">
            <GitHubIcon /> GitHub
          </Button>
          <Button variant="outline">
            <GoogleIcon /> Google
          </Button>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase">
          <Separator className="flex-1" />
          or continue with
          <Separator className="flex-1" />
        </div>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="naruto@konoha.dev" />
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input type="password" />
        </Field>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
  );
}

type Message = { from: 'me' | 'them'; text: string };

export function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'them', text: 'Hi, how can I help you today?' },
    { from: 'me', text: 'My deploy to Hidden Leaf is stuck at step 3.' },
    { from: 'them', text: 'Let me check the logs. Which project is it?' },
    { from: 'me', text: 'rasengan-landing' },
  ]);
  const [draft, setDraft] = useState('');

  const send = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((list) => [...list, { from: 'me', text }]);
    setDraft('');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <CardTitle className="text-sm">Shikamaru Nara</CardTitle>
            <CardDescription>Support · usually replies in minutes</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul aria-label="Conversation" className="flex flex-col gap-3">
          {messages.map((message, i) => (
            <li
              key={i}
              className={cn(
                'w-max max-w-[75%] rounded-lg px-3 py-2 text-sm',
                message.from === 'me'
                  ? 'ms-auto bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground',
              )}
            >
              {message.text}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form onSubmit={send} className="flex w-full items-center gap-2">
          <Input
            aria-label="Message"
            placeholder="Type your message…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" aria-label="Send" disabled={!draft.trim()}>
            <SendIcon />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

const roles = { owner: 'Owner', developer: 'Developer', viewer: 'Viewer' };

const members = [
  { initials: 'NU', name: 'Naruto Uzumaki', email: 'naruto@konoha.dev', role: 'owner' },
  { initials: 'SH', name: 'Sakura Haruno', email: 'sakura@konoha.dev', role: 'developer' },
  { initials: 'SU', name: 'Sasuke Uchiha', email: 'sasuke@konoha.dev', role: 'viewer' },
];

export function TeamCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Invite your team to collaborate.</CardDescription>
        <CardAction>
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline" size="icon" aria-label="Invite a teammate" />}
            >
              <UserPlusIcon />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a teammate</DialogTitle>
                <DialogDescription>They get access to every project in Team 7.</DialogDescription>
              </DialogHeader>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="kakashi@konoha.dev" />
              </Field>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
                <DialogClose
                  render={<Button />}
                  onClick={() =>
                    toast('Invite sent', { description: 'They will get an email in a minute.' })
                  }
                >
                  Send invite
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4">
          {members.map((member) => (
            <li key={member.email} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 gap-0.5">
                <span className="truncate text-sm font-medium">{member.name}</span>
                <span className="truncate text-sm text-muted-foreground">{member.email}</span>
              </div>
              <Select items={roles} defaultValue={member.role}>
                <SelectTrigger
                  aria-label={`Role of ${member.name}`}
                  className="h-control-sm w-auto gap-1.5 text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {Object.entries(roles).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function GoalCard() {
  const [goal, setGoal] = useState(6);
  const change = (by: number) => setGoal((value) => Math.min(12, Math.max(1, value + by)));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training goal</CardTitle>
        <CardDescription>Set your daily training hours.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <TooltipProvider>
          <div className="flex items-center justify-center gap-4">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-pill"
                    aria-label="One hour less"
                    disabled={goal <= 1}
                  />
                }
                onClick={() => change(-1)}
              >
                <MinusIcon />
              </TooltipTrigger>
              <TooltipContent>One hour less</TooltipContent>
            </Tooltip>
            <div className="w-28 text-center" aria-live="polite">
              <div className="font-display text-6xl font-semibold tracking-display tabular-nums">
                {goal}
              </div>
              <div className="text-xs text-muted-foreground uppercase">hours / day</div>
            </div>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-pill"
                    aria-label="One hour more"
                    disabled={goal >= 12}
                  />
                }
                onClick={() => change(1)}
              >
                <PlusIcon />
              </TooltipTrigger>
              <TooltipContent>One hour more</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <Bars
          values={[4, 6, 5, 8, 3, 7, 6, 9, 5, 6, 8, 7, goal]}
          label="Hours trained, last 13 days"
          className="h-16"
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => toast(`Goal set to ${goal} hours a day`)}
        >
          Set goal
        </Button>
      </CardFooter>
    </Card>
  );
}

const areas = { billing: 'Billing', deploys: 'Deploys', account: 'Account', other: 'Other' };
const severities = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };

export function ReportCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an issue</CardTitle>
        <CardDescription>What area are you having problems with?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Area</FieldLabel>
            <Select items={areas} defaultValue="deploys">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(areas).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Severity</FieldLabel>
            <Select items={severities} defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(severities).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel>Subject</FieldLabel>
          <Input placeholder="I need help with…" />
        </Field>
        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea placeholder="Please include all the information relevant to your issue." />
        </Field>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button
          onClick={() =>
            toast.success('Issue reported', {
              description: 'We will get back to you within a day.',
            })
          }
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

const notifications = [
  {
    id: 'deploys',
    label: 'Deploys',
    description: 'When a build finishes or fails.',
    checked: true,
  },
  {
    id: 'mentions',
    label: 'Mentions',
    description: 'When someone mentions you in a review.',
    checked: true,
  },
  {
    id: 'digest',
    label: 'Weekly digest',
    description: 'A summary of the week, every Monday.',
    checked: false,
  },
];

export function NotificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what we email you about.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        {notifications.map((item) => (
          <Label key={item.id} className="items-start justify-between gap-6">
            <span className="grid gap-1">
              {item.label}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground normal-case">
                {item.description}
              </span>
            </span>
            <Switch defaultChecked={item.checked} />
          </Label>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => toast('Preferences saved')}>
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  );
}

const plans = [
  { value: 'genin', title: 'Genin', price: '$0', description: 'One project, community support.' },
  { value: 'chunin', title: 'Chunin', price: '$19', description: 'Unlimited projects for a team.' },
  {
    value: 'jonin',
    title: 'Jonin',
    price: '$49',
    description: 'SSO, audit logs and priority support.',
  },
];

export function PlanCard() {
  const [plan, setPlan] = useState('chunin');
  const [yearly, setYearly] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade your plan</CardTitle>
        <CardDescription>You can change it at any time.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RadioGroup
          value={plan}
          onValueChange={(value) => setPlan(value as string)}
          aria-label="Plan"
          className="gap-3"
        >
          {plans.map((item) => (
            <Label
              key={item.value}
              className={cn(
                'items-start rounded-lg border-village p-4 transition-colors duration-fast',
                plan === item.value && 'border-primary bg-primary/5',
              )}
            >
              <RadioGroupItem value={item.value} className="mt-px" />
              <span className="grid flex-1 gap-1">
                <span className="flex items-baseline justify-between gap-2">
                  {item.title}
                  <span className="font-sans text-sm font-normal tracking-normal normal-case tabular-nums">
                    {item.price}
                    <span className="text-muted-foreground"> / month</span>
                  </span>
                </span>
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground normal-case">
                  {item.description}
                </span>
              </span>
            </Label>
          ))}
        </RadioGroup>
        <Label>
          <Checkbox checked={yearly} onCheckedChange={setYearly} />
          Bill yearly and save 20%
        </Label>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => toast.success(`Upgraded to ${plans.find((p) => p.value === plan)?.title}`)}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}

const access = { edit: 'Can edit', view: 'Can view' };

export function ShareCard() {
  const [copied, setCopied] = useState(false);
  const link = 'https://rasengan.dev/d/hokage-report';
  const copy = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    toast('Link copied');
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>Anyone with the link can view this document.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex gap-2">
          <Input aria-label="Link" value={link} readOnly className="flex-1" />
          <Button variant="secondary" onClick={copy} aria-label={copied ? 'Copied' : 'Copy link'}>
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
        <Separator />
        <div className="grid gap-4">
          <h3 className="text-sm font-medium">People with access</h3>
          {[
            { initials: 'KH', name: 'Kakashi Hatake', email: 'kakashi@konoha.dev', access: 'edit' },
            { initials: 'HH', name: 'Hinata Hyūga', email: 'hinata@konoha.dev', access: 'view' },
          ].map((person) => (
            <div key={person.email} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 gap-0.5">
                <span className="truncate text-sm font-medium">{person.name}</span>
                <span className="truncate text-sm text-muted-foreground">{person.email}</span>
              </div>
              <Select items={access} defaultValue={person.access}>
                <SelectTrigger
                  aria-label={`Access for ${person.name}`}
                  className="h-control-sm w-auto gap-1.5 text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {Object.entries(access).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function UploadCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploads</CardTitle>
        <CardDescription>3 files, 12.4 MB in total.</CardDescription>
        <CardAction>
          <AvatarGroup aria-label="Shared with 5 people">
            <Avatar size="sm">
              <AvatarFallback>NU</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <AvatarGroupCount className="size-6 text-xs">+3</AvatarGroupCount>
          </AvatarGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-center gap-3">
          <ImageIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <Progress value={100} className="flex-1">
            <ProgressLabel>village-map.png</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        <div className="flex items-center gap-3">
          <FileTextIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <Progress value={64} className="flex-1">
            <ProgressLabel>scroll-of-seals.pdf</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        <div className="flex items-center gap-3" aria-label="Preparing the next file" role="status">
          <Skeleton className="size-4 shrink-0" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-3.5 w-2/5" />
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ScheduleCard() {
  const [intensity, setIntensity] = useState(60);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training schedule</CardTitle>
        <CardDescription>Pick your days and how hard to push.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <ToggleGroup
          multiple
          variant="outline"
          size="sm"
          defaultValue={['Mon', 'Wed', 'Fri']}
          aria-label="Training days"
          className="w-full"
        >
          {days.map((day) => (
            <ToggleGroupItem key={day} value={day} className="flex-1 px-0">
              {day}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="grid gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium" id="intensity-label">
              Intensity
            </span>
            <span className="text-muted-foreground tabular-nums">{intensity}%</span>
          </div>
          <Slider
            value={intensity}
            onValueChange={(value) => setIntensity(value as number)}
            aria-labelledby="intensity-label"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function FaqCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Questions</CardTitle>
        <CardDescription>Everything about villages and natures.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={['village']}>
          <AccordionItem value="village">
            <AccordionTrigger>What is a village?</AccordionTrigger>
            <AccordionContent>
              A whole design language: radius, borders, type, shadows and motion. Switch it at
              runtime.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="nature">
            <AccordionTrigger>And a nature?</AccordionTrigger>
            <AccordionContent>
              The accent: Katon's fire, Suiton's water, Onmyōton's black and white.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="code">
            <AccordionTrigger>Is it my code?</AccordionTrigger>
            <AccordionContent>
              Yes. The CLI copies each component into your project, and updates it with a 3-way
              merge.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

/** Three columns from `xl`; below, the third column's cards pair up under the first two. */
export function CardsExample() {
  return (
    <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="grid gap-4">
        <StatsCard />
        <CreateAccountCard />
        <ChatCard />
        <FaqCard />
      </div>
      <div className="grid gap-4">
        <TeamCard />
        <GoalCard />
        <ReportCard />
        <NotificationsCard />
      </div>
      <div className="grid items-start gap-4 md:col-span-2 md:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
        <PlanCard />
        <ShareCard />
        <UploadCard />
        <ScheduleCard />
      </div>
    </div>
  );
}
