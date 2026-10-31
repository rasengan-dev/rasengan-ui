import { useEffect, useState } from 'react';
import { useNavigate } from 'rasengan';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { Search as SearchIcon } from 'lucide-react';
import { components } from '@/catalogue';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Entry {
  label: string;
  description: string;
  to: string;
}

/* What the search finds: the docs pages, then every component, as the sidebar lists them. */
const groups = [
  {
    value: 'Get started',
    items: [
      { label: 'Overview', description: 'Components on Base UI, dressed by villages and natures.', to: '/' },
      { label: 'Installation', description: 'Set up a project with the rasengan-ui CLI.', to: '/docs/installation' },
      { label: 'CLI', description: 'init, add, village, nature, diff, update, doctor.', to: '/docs/cli' },
      { label: 'MCP server', description: 'Let an agent read the components and install them.', to: '/docs/mcp' },
      { label: 'All components', description: 'Every component, with its demo.', to: '/components' },
    ],
  },
  {
    value: 'Components',
    items: components.map((c) => ({ label: c.title, description: c.description, to: c.href })),
  },
] satisfies { value: string; items: Entry[] }[];

/**
 * How well an entry matches: its title starting with the query, then containing it, then its description (so "date"
 * or "upload" find something). 0 is no match.
 */
function score(entry: Entry, query: string) {
  const title = entry.label.toLowerCase();
  if (title.startsWith(query)) return 3;
  if (title.includes(query)) return 2;
  return entry.description.toLowerCase().includes(query) ? 1 : 0;
}

/** The groups with their matching entries, best first; groups left empty drop out. */
function search(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return groups;
  return groups
    .map((group) => ({
      ...group,
      items: group.items
        .map((entry) => ({ entry, rank: score(entry, q) }))
        .filter(({ rank }) => rank > 0)
        .sort((a, b) => b.rank - a.rank)
        .map(({ entry }) => entry),
    }))
    .filter((group) => group.items.length > 0);
}

const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

/**
 * The header's search: a button that opens a dialog, with the field at the top and the results listed under it.
 * Arrow keys move through them, Enter opens one, Escape closes the dialog. ⌘K (Ctrl K elsewhere) opens it from
 * anywhere. The button reads "Search the docs… ⌘K" from sm up; on a phone, only its icon shows.
 */
export function Search({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(false);

  useEffect(() => {
    setMac(isMac());
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((was) => !was);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (entry: Entry) => {
    setOpen(false);
    navigate(entry.to);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Named by its text, read even where it is hidden (phones), so the name holds what the button shows. */}
      <DialogTrigger
        className={cn(
          'inline-flex size-control shrink-0 cursor-pointer items-center justify-center gap-2 rounded-control text-muted-foreground outline-none transition-[color,background-color,border-color] duration-fast ease-out hover:bg-accent hover:text-accent-foreground focus-visible:focus-ring',
          'sm:size-auto sm:h-control-sm sm:justify-start sm:border-village sm:border-input sm:bg-input-bg sm:ps-2.5 sm:pe-1.5 sm:text-sm sm:shadow-input sm:hover:bg-input-bg sm:hover:text-foreground',
          className,
        )}
      >
        <SearchIcon aria-hidden className="size-4 shrink-0" />
        <span className="sr-only sm:not-sr-only sm:flex-1 sm:truncate sm:text-start">Search the docs…</span>
        <kbd aria-hidden className="hidden rounded-sm border-village bg-muted px-1.5 font-mono text-[0.6875rem] leading-5 sm:block">
          {mac ? '⌘K' : 'Ctrl K'}
        </kbd>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="top-[12vh] translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Search the docs</DialogTitle>
        <SearchPanel onPick={go} />
      </DialogContent>
    </Dialog>
  );
}

/** The field and its results, always shown (an inline list, no popup of its own). */
function SearchPanel({ onPick }: { onPick: (entry: Entry) => void }) {
  const [value, setValue] = useState('');
  return (
    <Autocomplete.Root
      inline
      open
      items={groups}
      filteredItems={search(value)}
      value={value}
      onValueChange={setValue}
      itemToStringValue={(entry: Entry) => entry.label}
      autoHighlight="always"
    >
      <div className="flex items-center gap-2.5 border-b-(length:--border-width) border-border px-4">
        <SearchIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
        <Autocomplete.Input
          aria-label="Search the docs"
          placeholder="Search pages and components…"
          className="h-12 w-full min-w-0 bg-transparent font-sans text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
        />
      </div>
      <div className="max-h-[min(24rem,60vh)] overflow-y-auto p-1.5">
        <Autocomplete.Empty className="px-3 py-8 text-center text-sm text-muted-foreground empty:hidden">No results for “{value}”.</Autocomplete.Empty>
        <Autocomplete.List>
          {(group: (typeof groups)[number]) => (
            <Autocomplete.Group key={group.value} items={group.items} className="not-first:mt-1">
              <Autocomplete.GroupLabel className="px-2.5 pt-2 pb-1 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
                {group.value}
              </Autocomplete.GroupLabel>
              <Autocomplete.Collection>
                {(entry: Entry) => (
                  <Autocomplete.Item
                    key={entry.to}
                    value={entry}
                    onClick={() => onPick(entry)}
                    className="grid cursor-default gap-0.5 rounded-[calc(var(--control-radius)*0.75)] px-2.5 py-2 outline-none select-none ui-highlighted:bg-highlight ui-highlighted:text-highlight-foreground"
                  >
                    <span className="text-sm font-medium">{entry.label}</span>
                    <span className="line-clamp-1 text-xs text-muted-foreground in-data-[highlighted]:text-current">{entry.description}</span>
                  </Autocomplete.Item>
                )}
              </Autocomplete.Collection>
            </Autocomplete.Group>
          )}
        </Autocomplete.List>
      </div>
    </Autocomplete.Root>
  );
}
