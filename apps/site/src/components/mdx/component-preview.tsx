import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getComponent } from '@/catalogue';
import { cn } from '@/lib/utils';
import { SourceCode } from './code-block';

/** `<ComponentPreview name="button" />`: the component's demo, and its source in a second tab. */
export function ComponentPreview({ name, className }: { name: string; className?: string }) {
  const { Demo, source, title } = getComponent(name);
  return (
    <Tabs defaultValue="preview" className={cn('my-6', className)}>
      <TabsList aria-label={`${title} example`}>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" data-slot="component-preview" className="flex min-h-72 items-center justify-center rounded-lg border-village p-10">
        {Demo ? <Demo /> : null}
      </TabsContent>
      <TabsContent value="code" className="overflow-hidden rounded-lg border-village bg-card">
        {source ? <SourceCode source={source} /> : null}
      </TabsContent>
    </Tabs>
  );
}
