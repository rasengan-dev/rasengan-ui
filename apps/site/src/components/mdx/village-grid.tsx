import { villages, type Village } from '@rasengan-ui/villages';
import { VillageScope } from '@/lib/village-scope';
import { getComponent } from '@/catalogue';

const schemes = ['light', 'dark'] as const;

/**
 * `<VillageGrid name="button" />`: the demo once per village, light and dark, in the page's
 * nature and tint. Each cell is a VillageScope, so its popups open in that village too.
 */
export function VillageGrid({ name }: { name: string }) {
  const { Demo } = getComponent(name);
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
