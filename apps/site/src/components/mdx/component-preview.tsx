import { useState } from 'react';
import { RotateCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getComponent } from '@/catalogue';
import { cn } from '@/lib/utils';
import { SourceCode } from './code-block';

/**
 * `<ComponentPreview name="button" />`: the component's demo, and its source in a second tab.
 * `demo="button-sizes"` shows another demo of the same folder (`button-sizes.demo.tsx`).
 * A motion component's preview has a Replay button, which mounts the demo again.
 */
export function ComponentPreview({ name, demo, className }: { name: string; demo?: string; className?: string }) {
  const component = getComponent(name);
  const { title } = component;
  const { Demo, source } = demo ? (component.demos[demo] ?? missing(name, demo)) : component;
  const [run, setRun] = useState(0);
  const motion = component.category === 'motion';
  return (
    <Tabs defaultValue="preview" className={cn('my-6', className)}>
      <TabsList aria-label={`${title} example`}>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        data-slot="component-preview"
        data-demo={demo ?? name}
        className="relative flex min-h-72 items-center justify-center rounded-lg border-village p-10"
      >
        {Demo ? <Demo key={run} /> : null}
        {motion && (
          <Button variant="ghost" size="sm" className="absolute end-2 top-2" onClick={() => setRun((n) => n + 1)}>
            <RotateCcwIcon aria-hidden="true" />
            Replay
          </Button>
        )}
      </TabsContent>
      <TabsContent value="code" className="overflow-hidden rounded-lg border-village bg-card">
        {source ? <SourceCode source={source} /> : null}
      </TabsContent>
    </Tabs>
  );
}

function missing(name: string, demo: string): never {
  throw new Error(`No demo "${demo}" in registry/components/${name} (expected ${demo}.demo.tsx)`);
}
