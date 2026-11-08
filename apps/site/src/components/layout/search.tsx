import { useEffect, useState } from 'react';
import { useNavigate } from 'rasengan';
import { Search as SearchIcon } from 'lucide-react';
import { blocks } from '@/blocks-catalogue';
import { components } from '@/catalogue';
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

interface Entry {
  label: string;
  description: string;
  to: string;
}

/* What the search finds: the docs pages, then every component and every block, as the sidebar lists them. */
const groups = [
  {
    value: 'Get started',
    items: [
      { label: 'Overview', description: 'Components on Base UI, dressed by villages and natures.', to: '/' },
      { label: 'Installation', description: 'Set up a project with the rasengan-ui CLI.', to: '/docs/installation' },
      { label: 'CLI', description: 'init, add, village, nature, diff, update, doctor.', to: '/docs/cli' },
      { label: 'MCP server', description: 'Let an agent read the components and install them.', to: '/docs/mcp' },
      { label: 'All components', description: 'Every component, with its demo.', to: '/components' },
      { label: 'All blocks', description: 'Page sections built on the components, with content an agent can fill.', to: '/blocks' },
      { label: 'Landing page example', description: 'A startup landing page made only of marketing blocks.', to: '/examples/landing' },
      { label: 'Motion', description: 'Components whose motion is the point, in a gallery.', to: '/motion' },
    ],
  },
  {
    value: 'Components',
    items: components.map((c) => ({ label: c.title, description: c.description, to: c.href })),
  },
  {
    value: 'Blocks',
    items: blocks.map((b) => ({ label: b.title, description: b.summary, to: b.href })),
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
    <>
      {/* Named by its text, read even where it is hidden (phones), so the name holds what the button shows. */}
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex size-control shrink-0 cursor-pointer items-center justify-center gap-2 rounded-control text-muted-foreground outline-none transition-[color,background-color,border-color] duration-fast ease-out hover:bg-accent hover:text-accent-foreground focus-visible:focus-ring',
          'sm:size-auto sm:h-control-sm sm:justify-start sm:border-village sm:border-input sm:bg-input-bg sm:ps-2.5 sm:pe-1.5 sm:text-sm sm:shadow-input sm:hover:bg-input-bg sm:hover:text-foreground',
          className,
        )}
      >
        <SearchIcon aria-hidden className="size-4 shrink-0" />
        <span className="sr-only sm:not-sr-only sm:flex-1 sm:truncate sm:text-start">Search the docs…</span>
        <Kbd aria-hidden className="hidden sm:inline-flex">
          {mac ? '⌘K' : 'Ctrl K'}
        </Kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search the docs" description="Pages and components, by title or description.">
        <SearchPanel onPick={go} />
      </CommandDialog>
    </>
  );
}

/** The field and its results, ranked by `search` rather than Command's own filter. */
function SearchPanel({ onPick }: { onPick: (entry: Entry) => void }) {
  const [value, setValue] = useState('');
  return (
    <Command
      items={groups}
      filteredItems={search(value)}
      value={value}
      onValueChange={setValue}
      itemToStringValue={(entry: Entry) => entry.label}
    >
      <CommandInput aria-label="Search the docs" placeholder="Search pages and components…" />
      <CommandEmpty>No results for “{value}”.</CommandEmpty>
      <CommandList>
        {(group: (typeof groups)[number]) => (
          <CommandGroup key={group.value} items={group.items}>
            <CommandGroupLabel>{group.value}</CommandGroupLabel>
            <CommandCollection>
              {(entry: Entry) => (
                <CommandItem key={entry.to} value={entry} onSelect={() => onPick(entry)} className="grid gap-0.5 py-2">
                  <span className="text-sm font-medium">{entry.label}</span>
                  <span className="line-clamp-1 text-xs text-muted-foreground in-data-[highlighted]:text-current">{entry.description}</span>
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
