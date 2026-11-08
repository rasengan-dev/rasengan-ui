import { Link, useLocation } from 'rasengan';
import { blockGroups } from '@/blocks-catalogue';
import { groups } from '@/catalogue';
import { cn } from '@/lib/utils';
import { NewDot } from './new-dot';

/**
 * The docs pages, then the component pages by category, in the catalogue's order (the pager walks the same list). On a
 * block page, the blocks by family and category instead.
 */
export function Sidebar() {
  const { pathname } = useLocation();
  const current = pathname.replace(/\/$/, '');
  if (current.startsWith('/blocks')) return <BlocksSidebar current={current} />;
  return (
    <nav aria-label="Components" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="mb-1 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Get started</h2>
        <Item to="/" active={current === ''}>
          Overview
        </Item>
        <Item to="/docs/installation" active={current === '/docs/installation'}>
          Installation
        </Item>
        <Item to="/docs/cli" active={current === '/docs/cli'}>
          CLI
        </Item>
        <Item to="/docs/mcp" active={current === '/docs/mcp'}>
          MCP server
        </Item>
        <Item to="/docs/villages" active={current === '/docs/villages'}>
          Your own village
        </Item>
        <Item to="/components" active={current === '/components'}>
          All components
        </Item>
        <Item to="/blocks" active={false}>
          Blocks
        </Item>
      </div>
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-1">
          <h2 className="mb-1 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">{group.title}</h2>
          {group.id === 'motion' && (
            <Item to="/motion" active={current === '/motion'}>
              Gallery
            </Item>
          )}
          {group.components.map((c) => (
            <Item key={c.name} to={c.href} active={current === c.href} isNew={c.isNew}>
              {c.title}
            </Item>
          ))}
        </div>
      ))}
    </nav>
  );
}

function BlocksSidebar({ current }: { current: string }) {
  return (
    <nav aria-label="Blocks" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="mb-1 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Blocks</h2>
        <Item to="/blocks" active={current === '/blocks'}>
          All blocks
        </Item>
        <Item to="/examples/landing" active={false}>
          Example: landing page
        </Item>
        <Item to="/components" active={false}>
          Components
        </Item>
      </div>
      {blockGroups.flatMap((family) =>
        family.categories.map((category) => (
          <div key={`${family.id}-${category.id}`} className="flex flex-col gap-1">
            <h2 className="mb-1 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {category.title}
              <span className="sr-only">, {family.title}</span>
            </h2>
            {category.blocks.map((b) => (
              <Item key={b.name} to={b.href} active={current === b.href} isNew={b.isNew}>
                {b.title}
              </Item>
            ))}
          </div>
        )),
      )}
    </nav>
  );
}

/** A sidebar link; `isNew` adds a dot in the nature's colour (and "new" for screen readers). */
function Item({ to, active, isNew, children }: { to: string; active: boolean; isNew?: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-control px-3 py-1.5 text-sm transition-colors outline-none focus-visible:focus-ring',
        active ? 'bg-highlight font-medium text-highlight-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
    >
      <span className="flex items-center gap-2">
        {children}
        {isNew && <NewDot />}
      </span>
    </Link>
  );
}
