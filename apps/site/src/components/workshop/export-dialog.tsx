import { DownloadIcon } from 'lucide-react';
import type { Recipe, Village } from '@rasengan-ui/villages/engine';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/components/mdx/code-block';
import { cn } from '@/lib/utils';

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function Code({ title, text, file, type, wrap }: { title: string; text: string; file?: string; type?: string; wrap?: boolean }) {
  return (
    <figure className="m-0 grid overflow-hidden rounded-lg border-village bg-card text-card-foreground">
      <figcaption className="flex items-center justify-between gap-2 border-b-(length:--border-width) py-1.5 ps-4 pe-1.5">
        <span className="truncate font-mono text-xs text-muted-foreground">{title}</span>
        <span className="flex items-center gap-1">
          {file ? (
            <Button variant="ghost" size="icon-sm" aria-label={`Download ${file}`} onClick={() => download(file, text, type ?? 'text/plain')}>
              <DownloadIcon />
            </Button>
          ) : null}
          <CopyButton text={text} className="static border-transparent opacity-100" />
        </span>
      </figcaption>
      <pre className={cn('max-h-80 overflow-auto p-4 font-mono text-xs leading-relaxed', wrap && 'break-all whitespace-pre-wrap')}>
        <code>{text}</code>
      </pre>
    </figure>
  );
}

/** The village out of the workshop: a CLI command with the recipe link, the CSS file, or the recipe. */
export function ExportDialog({ village, recipe, link, disabled }: { village?: Village; recipe: Recipe; link: string; disabled?: boolean }) {
  const name = village?.name ?? recipe.name;
  const command = `npx rasengan-ui village create ${name} --from "${link}"`;
  const json = `${JSON.stringify(recipe, null, 2)}\n`;
  return (
    <Dialog>
      <DialogTrigger render={<Button disabled={disabled} />}>
        <DownloadIcon />
        Export
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Export {village?.title ?? name}</DialogTitle>
          <DialogDescription>One CSS file, in the shape of the built-in villages: every component, VillageScope and the natures work with it.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="install" className="min-w-0 gap-4">
          <TabsList>
            <TabsTrigger value="install">Install</TabsTrigger>
            <TabsTrigger value="css">CSS file</TabsTrigger>
            <TabsTrigger value="recipe">Recipe</TabsTrigger>
          </TabsList>
          <TabsContent value="install" className="grid gap-3">
            <p className="text-sm text-muted-foreground">
              In your project: the CLI decodes the recipe from the link (nothing is stored anywhere), makes the village with your contract,
              writes it, imports it, saves the recipe in rasengan-ui.json and switches to it.
            </p>
            <Code title="Terminal" text={command} wrap />
          </TabsContent>
          <TabsContent value="css" className="grid gap-3">
            <p className="text-sm text-muted-foreground">For a project without the CLI: put it next to the other villages, after contract.css and before natures.css.</p>
            <Code title={`styles/rasengan/villages/${name}.css`} text={village?.css ?? ''} file={`${name}.css`} type="text/css" />
          </TabsContent>
          <TabsContent value="recipe" className="grid gap-3">
            <p className="text-sm text-muted-foreground">The source of the village: `village create --from` takes it, and the CLI regenerates the village from it when the contract grows.</p>
            <Code title={`${name}.recipe.json`} text={json} file={`${name}.recipe.json`} type="application/json" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
