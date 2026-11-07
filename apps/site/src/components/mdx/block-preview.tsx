import { useState } from 'react';
import { MonitorIcon, SmartphoneIcon, TabletIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getBlock } from '@/blocks-catalogue';
import { cn } from '@/lib/utils';
import { SourceCode } from './code-block';

/* The frame's widths. Blocks answer their container, not the window (ADR-0013), so narrowing a div is enough. */
const widths = {
  phone: { label: 'Phone', width: '375px', Icon: SmartphoneIcon },
  tablet: { label: 'Tablet', width: '768px', Icon: TabletIcon },
  desktop: { label: 'Desktop', width: '100%', Icon: MonitorIcon },
} as const;

type Width = keyof typeof widths;

/**
 * `<BlockPreview name="cta-banner" />`: the block with its example content, in a frame set to a phone's, a tablet's or
 * the page's width, and the block's source in a second tab.
 */
export function BlockPreview({ name, className }: { name: string; className?: string }) {
  const { title, Demo, source } = getBlock(name);
  const [width, setWidth] = useState<Width>('desktop');
  return (
    <Tabs defaultValue="preview" className={cn('my-6', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList aria-label={`${title} example`}>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <ToggleGroup
          size="sm"
          variant="outline"
          value={[width]}
          onValueChange={(value) => value[0] && setWidth(value[0] as Width)}
          aria-label="Preview width"
          className="max-md:hidden"
        >
          {Object.entries(widths).map(([id, { label, Icon }]) => (
            <ToggleGroupItem key={id} value={id} aria-label={label}>
              <Icon aria-hidden="true" />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <TabsContent value="preview" data-slot="block-preview" data-block={name} className="overflow-hidden rounded-lg border-village bg-muted/40">
        <div
          data-width={width}
          style={{ width: widths[width].width }}
          className="mx-auto max-w-full bg-background transition-[width] duration-(--duration-normal) ease-(--ease-out) data-[width=desktop]:border-x-0 not-data-[width=desktop]:border-x-(length:--border-width)"
        >
          {Demo ? <Demo /> : null}
        </div>
      </TabsContent>
      <TabsContent value="code" className="overflow-hidden rounded-lg border-village bg-card">
        {source ? <SourceCode source={source} /> : null}
      </TabsContent>
    </Tabs>
  );
}
