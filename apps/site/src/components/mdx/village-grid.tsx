import { villages, type Village } from '@rasengan-ui/villages';
import { VillageScope } from '@/lib/village-scope';
import { getComponent } from '@/catalogue';

const schemes = ['light', 'dark'] as const;

/**
 * `<VillageGrid name="button" />`: the demo once per village, light and dark, in the page's
 * nature and tint. Each cell is a VillageScope, so its popups open in that village too.
 * `demo="scroll-stack-still"` shows another demo of the folder: for components whose main demo needs the page's own
 * scroll (a cell clips, and sticky stops sticking in it).
 */
export function VillageGrid({ name, demo }: { name: string; demo?: string }) {
  const component = getComponent(name);
  const Demo = demo ? component.demos[demo]?.Demo : component.Demo;
  if (demo && !Demo) throw new Error(`No demo "${demo}" in registry/components/${name} (expected ${demo}.demo.tsx)`);
  if (!Demo) return null;
  return (
    <div className="my-6 grid gap-3">
      {(Object.keys(villages) as Village[]).flatMap((village) =>
        schemes.map((scheme) => (
          <VillageScope
            key={`${village}-${scheme}`}
            village={village}
            scheme={scheme}
            as="figure"
            data-slot="village-cell"
            className="m-0 flex flex-col overflow-hidden rounded-lg border-village"
          >
            <figcaption className="border-b-(length:--border-width) px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {villages[village].title} · {scheme}
            </figcaption>
            <div className="flex min-h-48 flex-1 items-center justify-center p-6">
              <Demo />
            </div>
          </VillageScope>
        )),
      )}
    </div>
  );
}
