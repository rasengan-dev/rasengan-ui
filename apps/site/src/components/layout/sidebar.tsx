import { Link, useLocation } from 'rasengan';
import { components } from '@/catalogue';
import { cn } from '@/lib/utils';

/** Every component page, in the catalogue's order (the pager walks the same list). */
export function Sidebar() {
  const { pathname } = useLocation();
  const current = pathname.replace(/\/$/, '');
  return (
    <nav aria-label="Components" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="mb-1 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Get started</h2>
        <Item to="/" active={current === ''}>
          Overview
        </Item>
        <Item to="/components" active={current === '/components'}>
          All components
        </Item>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="mb-1 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Components</h2>
        {components.map((c) => (
          <Item key={c.name} to={c.href} active={current === c.href}>
            {c.title}
          </Item>
        ))}
      </div>
    </nav>
  );
}

function Item({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-control px-3 py-1.5 text-sm transition-colors outline-none focus-visible:focus-ring',
        active ? 'bg-highlight font-medium text-highlight-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
    >
      {children}
    </Link>
  );
}
