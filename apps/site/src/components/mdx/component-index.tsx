import { Link } from 'rasengan';
import { groups } from '@/catalogue';
import { NewDot } from '@/components/layout/new-dot';

/** `<ComponentIndex />`: every component, as links to their pages, by category. */
export function ComponentIndex() {
  return (
    <div className="my-8 flex flex-col gap-8">
      {groups
        .filter((group) => group.components.length > 0)
        .map((group) => (
          <section key={group.id} aria-labelledby={`category-${group.id}`}>
            <h2
              id={`category-${group.id}`}
              className="font-display text-lg font-semibold tracking-display case-heading"
            >
              {group.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
            <ul className="mt-3 grid list-none gap-x-8 gap-y-1 p-0 sm:grid-cols-2 md:grid-cols-3">
              {group.components.map((c) => (
                <li key={c.name}>
                  <Link
                    to={c.href}
                    className="flex items-center gap-2 rounded-control py-1.5 font-medium underline-offset-4 outline-none hover:underline focus-visible:focus-ring"
                  >
                    {c.title}
                    {c.isNew && <NewDot />}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
