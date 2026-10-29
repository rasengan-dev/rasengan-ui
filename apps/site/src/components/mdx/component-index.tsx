import { Link } from 'rasengan';
import { components } from '@/catalogue';

/** `<ComponentIndex />`: every component, as links to their pages. */
export function ComponentIndex() {
  return (
    <ul className="my-8 grid list-none gap-x-8 gap-y-1 p-0 sm:grid-cols-2 md:grid-cols-3">
      {components.map((c) => (
        <li key={c.name}>
          <Link
            to={c.href}
            className="block rounded-control py-1.5 font-medium underline-offset-4 outline-none hover:underline focus-visible:focus-ring"
          >
            {c.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
