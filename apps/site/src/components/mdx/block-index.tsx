import { Link } from 'rasengan';
import { blockGroups } from '@/blocks-catalogue';
import { NewDot } from '@/components/layout/new-dot';

/** `<BlockIndex />`: every block, by family then category, as cards linking to their pages. */
export function BlockIndex() {
  return (
    <div className="my-8 flex flex-col gap-10">
      {blockGroups.map((family) => (
        <section key={family.id} aria-labelledby={`family-${family.id}`}>
          <h2 id={`family-${family.id}`} className="font-display text-xl font-semibold tracking-display case-heading">
            {family.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{family.description}</p>
          {family.categories.map((category) => (
            <div key={category.id} className="mt-5">
              <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{category.title}</h3>
              <ul className="mt-2 grid list-none gap-3 p-0 sm:grid-cols-2">
                {category.blocks.map((block) => (
                  <li key={block.name}>
                    <Link
                      to={block.href}
                      className="flex h-full flex-col gap-1 rounded-lg border-village p-4 outline-none transition-colors hover:bg-accent focus-visible:focus-ring"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        {block.title}
                        {block.isNew && <NewDot />}
                      </span>
                      <span className="text-sm text-muted-foreground">{block.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
