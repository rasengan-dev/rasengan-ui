import { useState, type ComponentType, type ReactElement } from 'react';
import {
  BellIcon,
  ChartLineIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  FolderGit2Icon,
  GlobeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PlusIcon,
  RocketIcon,
  Settings2Icon,
  UserIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { toast } from '@/components/ui/toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type Page =
  | 'overview'
  | 'deploys'
  | 'projects'
  | 'domains'
  | 'analytics'
  | 'general'
  | 'members'
  | 'billing';

type Item = { page: Page; label: string; Icon: ComponentType; badge?: string };

export const platform: Item[] = [
  { page: 'overview', label: 'Overview', Icon: LayoutDashboardIcon },
  { page: 'deploys', label: 'Deploys', Icon: RocketIcon, badge: '5' },
  { page: 'projects', label: 'Projects', Icon: FolderGit2Icon },
  { page: 'domains', label: 'Domains', Icon: GlobeIcon },
  { page: 'analytics', label: 'Analytics', Icon: ChartLineIcon },
];

export const settings: Item[] = [
  { page: 'general', label: 'General', Icon: Settings2Icon },
  { page: 'members', label: 'Members', Icon: UserIcon },
  { page: 'billing', label: 'Billing', Icon: CreditCardIcon },
];

export const teams = [
  { name: 'Team 7', plan: 'Chunin plan', initials: 'T7' },
  { name: 'Team 8', plan: 'Genin plan', initials: 'T8' },
  { name: 'Team Guy', plan: 'Jonin plan', initials: 'TG' },
];

const row =
  'flex h-8 w-full cursor-pointer items-center gap-2 rounded-control px-2 text-left text-sm text-muted-foreground outline-none transition-colors duration-fast hover:bg-accent hover:text-accent-foreground focus-visible:focus-ring [&_svg]:size-4 [&_svg]:shrink-0';
const current = 'bg-accent font-medium text-accent-foreground';

/** Collapsed, a row is only its icon: its label moves into a tooltip on the right. */
function WithTooltip({
  collapsed,
  label,
  children,
}: {
  collapsed: boolean;
  label: string;
  children: ReactElement;
}) {
  if (!collapsed) return children;
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

function NavRow({
  item,
  active,
  collapsed,
  onSelect,
}: {
  item: Item;
  active: boolean;
  collapsed: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <WithTooltip collapsed={collapsed} label={item.label}>
        <button
          type="button"
          aria-current={active ? 'page' : undefined}
          onClick={onSelect}
          className={cn(row, active && current, collapsed && 'justify-center px-0')}
        >
          <item.Icon />
          <span className={cn('flex-1 truncate', collapsed && 'sr-only')}>{item.label}</span>
          {item.badge && !collapsed && (
            <Badge variant="secondary" className="h-5 min-w-5 justify-center px-1 tabular-nums">
              {item.badge}
            </Badge>
          )}
        </button>
      </WithTooltip>
    </li>
  );
}

function TeamSwitcher({
  team,
  onTeam,
  collapsed,
}: {
  team: number;
  onTeam: (team: number) => void;
  collapsed: boolean;
}) {
  const { name, plan, initials } = teams[team];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(row, 'h-12 text-foreground', collapsed && 'justify-center px-0')}
      >
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-control bg-primary font-display text-xs font-semibold text-primary-foreground"
        >
          {initials}
        </span>
        {/* Collapsed, the name stays for screen readers: the initials alone would be the button's name. */}
        <span className={cn('grid flex-1 leading-tight', collapsed && 'sr-only')}>
          <span className="truncate font-medium">{name}</span>
          <span className="truncate text-xs text-muted-foreground">{plan}</span>
        </span>
        {!collapsed && <ChevronsUpDownIcon className="text-muted-foreground" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side={collapsed ? 'right' : 'bottom'}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Teams</DropdownMenuLabel>
          {teams.map((t, i) => (
            <DropdownMenuItem key={t.name} onClick={() => onTeam(i)}>
              <span className="grid size-5 place-items-center rounded-sm border-village text-[10px] font-semibold">
                {t.initials}
              </span>
              {t.name}
              {i === team && <CheckIcon className="ms-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast('A new team, soon')}>
          <PlusIcon /> Create team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SettingsGroup({
  page,
  onNavigate,
  collapsed,
}: {
  page: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
}) {
  const inSettings = settings.some((item) => item.page === page);
  const [open, setOpen] = useState(true);

  /* Collapsed, the group has no room for its rows: they open in a menu beside the icon. */
  if (collapsed) {
    return (
      <li>
        <DropdownMenu>
          <WithTooltip collapsed label="Settings">
            <DropdownMenuTrigger
              aria-label="Settings"
              className={cn(row, 'justify-center px-0', inSettings && current)}
            >
              <Settings2Icon />
            </DropdownMenuTrigger>
          </WithTooltip>
          <DropdownMenuContent side="right" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              {settings.map((item) => (
                <DropdownMenuItem key={item.page} onClick={() => onNavigate(item.page)}>
                  <item.Icon /> {item.label}
                  {item.page === page && <CheckIcon className="ms-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    );
  }

  return (
    <li>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className={cn(row, 'group/settings')}>
          <Settings2Icon />
          <span className="flex-1">Settings</span>
          <ChevronRightIcon className="transition-transform duration-fast group-data-[panel-open]/settings:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="ms-4 grid gap-0.5 border-s-(length:--border-width) py-0.5 ps-2">
            {settings.map((item) => (
              <li key={item.page}>
                <button
                  type="button"
                  aria-current={item.page === page ? 'page' : undefined}
                  onClick={() => onNavigate(item.page)}
                  className={cn(row, 'h-7', item.page === page && current)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

function UserMenu({ collapsed }: { collapsed: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(row, 'h-12 text-foreground', collapsed && 'justify-center px-0')}
      >
        <Avatar size="sm" className="size-8" aria-hidden>
          <AvatarFallback>NU</AvatarFallback>
        </Avatar>
        <span className={cn('grid flex-1 leading-tight', collapsed && 'sr-only')}>
          <span className="truncate font-medium">Naruto Uzumaki</span>
          <span className="truncate text-xs text-muted-foreground">naruto@konoha.dev</span>
        </span>
        {!collapsed && <ChevronsUpDownIcon className="text-muted-foreground" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={collapsed ? 'right' : 'top'} align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>naruto@konoha.dev</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon /> Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon /> Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon /> Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast('Signed out')}>
          <LogOutIcon /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface SidebarProps {
  page: Page;
  onNavigate: (page: Page) => void;
  team: number;
  onTeam: (team: number) => void;
  /** Icons only, labels in tooltips. */
  collapsed?: boolean;
  className?: string;
}

/**
 * The dashboard's sidebar, from registry parts only: a team switcher (menu), the navigation with a
 * collapsible Settings group, the plan's usage (progress) and the account menu. Collapsed, it keeps
 * the icons and moves labels into tooltips and the Settings rows into a menu.
 */
export function DashboardSidebar({
  page,
  onNavigate,
  team,
  onTeam,
  collapsed = false,
  className,
}: SidebarProps) {
  return (
    <TooltipProvider>
      <aside
        aria-label="Sidebar"
        data-collapsed={collapsed || undefined}
        className={cn(
          'flex h-full shrink-0 flex-col gap-2 border-e-(length:--border-width) bg-card p-2 text-card-foreground transition-[width] duration-base ease-out',
          collapsed ? 'w-14' : 'w-60',
          className,
        )}
      >
        <TeamSwitcher team={team} onTeam={onTeam} collapsed={collapsed} />
        <nav aria-label="Dashboard" className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          <div className="grid gap-1">
            <h3
              className={cn(
                'px-2 text-xs font-medium text-muted-foreground',
                collapsed && 'sr-only',
              )}
            >
              Platform
            </h3>
            <ul className="grid gap-0.5">
              {platform.map((item) => (
                <NavRow
                  key={item.page}
                  item={item}
                  active={page === item.page}
                  collapsed={collapsed}
                  onSelect={() => onNavigate(item.page)}
                />
              ))}
            </ul>
          </div>
          <div className="grid gap-1">
            <h3
              className={cn(
                'px-2 text-xs font-medium text-muted-foreground',
                collapsed && 'sr-only',
              )}
            >
              Workspace
            </h3>
            <ul className="grid gap-0.5">
              <SettingsGroup page={page} onNavigate={onNavigate} collapsed={collapsed} />
            </ul>
          </div>
        </nav>
        {!collapsed && (
          <div className="grid gap-3 rounded-lg border-village bg-background p-3">
            <Progress value={72}>
              <ProgressLabel>Build minutes</ProgressLabel>
              <ProgressValue />
            </Progress>
            <p className="text-xs text-muted-foreground">1,440 of 2,000 used. Resets in 9 days.</p>
          </div>
        )}
        <UserMenu collapsed={collapsed} />
      </aside>
    </TooltipProvider>
  );
}
