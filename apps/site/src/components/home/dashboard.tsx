import { useState, type ReactNode } from 'react';
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BellIcon,
  ChevronRightIcon,
  CircleAlertIcon,
  DownloadIcon,
  EllipsisIcon,
  PanelLeftIcon,
  RocketIcon,
  RotateCcwIcon,
  ScrollTextIcon,
  Trash2Icon,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bars } from './bars';
import { DashboardSidebar, platform, settings, teams, type Page } from './dashboard-sidebar';

const kpis = [
  { label: 'Deploys', value: '2,350', change: '+12.1%', up: true },
  { label: 'Success rate', value: '98.6%', change: '+0.4%', up: true },
  { label: 'Build time', value: '41s', change: '-6.3%', up: true },
  { label: 'Open incidents', value: '3', change: '+1', up: false },
];

const ranges = {
  '7d': [12, 18, 9, 22, 17, 25, 30],
  '30d': [
    40, 52, 38, 61, 47, 66, 58, 71, 49, 63, 77, 69, 80, 74, 62, 85, 79, 90, 73, 88, 95, 81, 77, 92,
    86, 99, 94, 89, 97, 104,
  ],
  '90d': [210, 260, 240, 300, 280, 330, 310, 360, 340, 390, 370, 420, 450],
};

type Range = keyof typeof ranges;

type Deploy = {
  id: string;
  project: string;
  branch: string;
  status: 'ready' | 'building' | 'failed';
  author: string;
  age: string;
};

const initialDeploys: Deploy[] = [
  {
    id: 'd-1043',
    project: 'rasengan-landing',
    branch: 'main',
    status: 'ready',
    author: 'NU',
    age: '2m',
  },
  {
    id: 'd-1042',
    project: 'hokage-api',
    branch: 'feat/missions',
    status: 'building',
    author: 'SH',
    age: '6m',
  },
  {
    id: 'd-1041',
    project: 'scroll-cdn',
    branch: 'main',
    status: 'failed',
    author: 'SU',
    age: '18m',
  },
  {
    id: 'd-1040',
    project: 'rasengan-landing',
    branch: 'fix/hero',
    status: 'ready',
    author: 'KH',
    age: '1h',
  },
  {
    id: 'd-1039',
    project: 'ichiraku-shop',
    branch: 'main',
    status: 'ready',
    author: 'HH',
    age: '3h',
  },
];

const status = {
  ready: { label: 'Ready', variant: 'secondary' },
  building: { label: 'Building', variant: 'outline' },
  failed: { label: 'Failed', variant: 'destructive' },
} as const;

const activity = [
  { initials: 'NU', who: 'Naruto', what: 'promoted d-1043 to production', when: '2 min ago' },
  { initials: 'SH', who: 'Sakura', what: 'opened a review on hokage-api', when: '14 min ago' },
  { initials: 'SU', who: 'Sasuke', what: 'rolled back scroll-cdn', when: '20 min ago' },
  { initials: 'KH', who: 'Kakashi', what: 'invited Hinata to Team 7', when: '1 h ago' },
  { initials: 'HH', who: 'Hinata', what: 'added the domain ichiraku.shop', when: '3 h ago' },
  { initials: 'SH', who: 'Shikamaru', what: 'changed the build cache to 2 GB', when: 'yesterday' },
];

function DeployActions({ deploy, onDelete }: { deploy: Deploy; onDelete: () => void }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon" aria-label={`Actions for ${deploy.id}`} />}
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => toast(`Logs for ${deploy.id}`)}>
            <ScrollTextIcon /> View logs
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast(`Redeploying ${deploy.project}`)}>
            <RotateCcwIcon /> Redeploy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setConfirm(true)}>
            <Trash2Icon /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deploy.id}?</AlertDialogTitle>
            <AlertDialogDescription>
              The build and its logs are removed. Production keeps serving the current deploy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="grid gap-1">
        <h2 className="font-display text-2xl font-semibold tracking-display case-heading">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function DeploysTable() {
  const [deploys, setDeploys] = useState(initialDeploys);
  const [query, setQuery] = useState('');
  const shown = deploys.filter((d) =>
    `${d.id} ${d.project} ${d.branch}`.includes(query.trim().toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest deploys</CardTitle>
        <CardDescription>
          {shown.length} of {deploys.length} deploys
        </CardDescription>
        <CardAction>
          <Input
            aria-label="Filter deploys"
            placeholder="Filter…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-40 sm:w-56"
          />
        </CardAction>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-xl text-sm">
          <thead>
            <tr className="border-b-(length:--border-width) text-left text-muted-foreground">
              <th className="py-2 pe-4 font-medium">Deploy</th>
              <th className="py-2 pe-4 font-medium">Project</th>
              <th className="py-2 pe-4 font-medium">Branch</th>
              <th className="py-2 pe-4 font-medium">Status</th>
              <th className="py-2 pe-4 font-medium">Author</th>
              <th className="py-2 pe-4 text-right font-medium">Age</th>
              <th className="w-0 py-2">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {shown.map((deploy) => (
              <tr
                key={deploy.id}
                className="border-b-(length:--border-width) last:border-0 hover:bg-muted/50"
              >
                <td className="py-2 pe-4 font-mono text-xs">{deploy.id}</td>
                <td className="py-2 pe-4 font-medium">{deploy.project}</td>
                <td className="py-2 pe-4 text-muted-foreground">{deploy.branch}</td>
                <td className="py-2 pe-4">
                  <Badge variant={status[deploy.status].variant}>
                    {status[deploy.status].label}
                  </Badge>
                </td>
                <td className="py-2 pe-4">
                  <Avatar size="sm">
                    <AvatarFallback>{deploy.author}</AvatarFallback>
                  </Avatar>
                </td>
                <td className="py-2 pe-4 text-right text-muted-foreground tabular-nums">
                  {deploy.age}
                </td>
                <td className="py-1">
                  <DeployActions
                    deploy={deploy}
                    onDelete={() => {
                      setDeploys((list) => list.filter((d) => d.id !== deploy.id));
                      toast(`${deploy.id} deleted`, {
                        action: { label: 'Undo', onClick: () => setDeploys(initialDeploys) },
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-muted-foreground">
                  No deploy matches “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function Overview({ team }: { team: string }) {
  const [range, setRange] = useState<Range>('30d');
  return (
    <div className="grid gap-4">
      <PageHeading title={team} description="Deploys across every project in the workspace.">
        <Button
          variant="outline"
          onClick={() => toast('Report exported', { description: 'deploys.csv' })}
        >
          <DownloadIcon /> Export
        </Button>
      </PageHeading>

      <Alert variant="destructive" role="status">
        <CircleAlertIcon />
        <AlertTitle>scroll-cdn failed to build</AlertTitle>
        <AlertDescription>Step 3 of 5 timed out. Production still serves d-1036.</AlertDescription>
      </Alert>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <li key={kpi.label}>
            <Card className="gap-2">
              <CardHeader>
                <CardDescription>{kpi.label}</CardDescription>
                <CardTitle className="text-2xl tabular-nums">{kpi.value}</CardTitle>
                <CardAction>
                  <Badge variant={kpi.up ? 'outline' : 'destructive'}>
                    {kpi.change.startsWith('-') ? <ArrowDownRightIcon /> : <ArrowUpRightIcon />}
                    {kpi.change}
                  </Badge>
                </CardAction>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 xl:grid-cols-[1fr_20rem]">
        <Card>
          <CardHeader>
            <CardTitle>Deploys</CardTitle>
            <CardDescription>Builds per day across every project.</CardDescription>
            <CardAction>
              <ToggleGroup
                variant="outline"
                size="sm"
                value={[range]}
                onValueChange={(value) => value[0] && setRange(value[0] as Range)}
                aria-label="Range"
              >
                {(Object.keys(ranges) as Range[]).map((r) => (
                  <ToggleGroupItem key={r} value={r}>
                    {r}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Bars
              values={ranges[range]}
              label={`Deploys per day, last ${range}`}
              className="h-56"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>What the team did today.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-56">
              <ul className="grid gap-4 pe-3">
                {activity.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Avatar size="sm">
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </Avatar>
                    <p className="grid gap-0.5">
                      <span>
                        <span className="font-medium">{item.who}</span> {item.what}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.when}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <DeploysTable />
    </div>
  );
}

function Deploys() {
  return (
    <div className="grid gap-4">
      <PageHeading title="Deploys" description="Every build, newest first.">
        <Button onClick={() => toast('Deploy started', { description: 'rasengan-landing · main' })}>
          <RocketIcon /> Deploy
        </Button>
      </PageHeading>
      <DeploysTable />
    </div>
  );
}

/** The pages this example does not draw: a heading, then an empty state over placeholder rows. */
function Placeholder({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="grid gap-4">
      <PageHeading
        title={title}
        description="This page is part of the example's navigation only."
      />
      <Card className="relative overflow-hidden">
        <CardContent className="grid gap-4" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-pill" />
              <div className="grid flex-1 gap-2">
                <Skeleton className="h-3.5 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </CardContent>
        <div className="absolute inset-0 grid place-items-center bg-card/70 backdrop-blur-[2px]">
          <div className="grid justify-items-center gap-3 text-center">
            <p className="font-medium">Nothing to show here yet</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              The sidebar works; this page is left empty on purpose.
            </p>
            <Button variant="outline" size="sm" onClick={onBack}>
              Back to overview
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

const titles = Object.fromEntries(
  [...platform, ...settings].map((item) => [item.page, item.label]),
) as Record<Page, string>;

/**
 * A deploy dashboard in an app shell: the sidebar on the left (collapsible to icons from `lg`, an
 * overlay below), a top bar with the toggle and a breadcrumb, then the page the sidebar picked.
 */
export function DashboardExample() {
  const [page, setPage] = useState<Page>('overview');
  const [team, setTeam] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const navigate = (next: Page) => {
    setPage(next);
    setDrawer(false);
  };
  const toggle = () => {
    if (window.matchMedia('(min-width: 64rem)').matches) setCollapsed((value) => !value);
    else setDrawer((value) => !value);
  };
  const sidebar = { page, onNavigate: navigate, team, onTeam: setTeam };
  const inSettings = settings.some((item) => item.page === page);

  return (
    <div className="relative flex h-[46rem] overflow-hidden rounded-xl border-village bg-background text-foreground shadow-sm">
      <DashboardSidebar {...sidebar} collapsed={collapsed} className="hidden lg:flex" />
      {drawer && (
        <div
          className="absolute inset-0 z-20 flex lg:hidden"
          onKeyDown={(event) => event.key === 'Escape' && setDrawer(false)}
        >
          <DashboardSidebar {...sidebar} className="shadow-lg" />
          <button
            type="button"
            aria-label="Close the sidebar"
            className="flex-1 cursor-default bg-overlay"
            onClick={() => setDrawer(false)}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b-(length:--border-width) px-3 md:px-4">
          <Button variant="ghost" size="icon" aria-label="Toggle the sidebar" onClick={toggle}>
            <PanelLeftIcon />
          </Button>
          <Separator
            orientation="vertical"
            className="h-4 data-[orientation=vertical]:self-center"
          />
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li className="hidden truncate sm:block">{teams[team].name}</li>
              {inSettings && (
                <>
                  <li aria-hidden className="hidden sm:block">
                    <ChevronRightIcon className="size-3.5" />
                  </li>
                  <li className="hidden sm:block">Settings</li>
                </>
              )}
              <li aria-hidden className="hidden sm:block">
                <ChevronRightIcon className="size-3.5" />
              </li>
              <li aria-current="page" className="truncate font-medium text-foreground">
                {titles[page]}
              </li>
            </ol>
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <Input
              aria-label="Search"
              placeholder="Search…"
              className="hidden h-control-sm w-48 md:block"
            />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={() => toast('No new notifications')}
            >
              <BellIcon />
            </Button>
          </div>
        </header>
        {/* Pages scroll here, under the top bar, so the sidebar always runs the shell's full height. A new page starts at the top. */}
        <ScrollArea key={page} className="min-h-0 flex-1">
          <div className="p-4 md:p-6">
            {page === 'overview' ? (
              <Overview team={teams[team].name} />
            ) : page === 'deploys' ? (
              <Deploys />
            ) : (
              <Placeholder title={titles[page]} onBack={() => setPage('overview')} />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
