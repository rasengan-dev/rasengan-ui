import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { Check, Copy } from 'lucide-react';
import { getIconForLanguageExtension } from '@rasenganjs/mdx';
import { cn } from '@/lib/utils';

/** rehype-pretty-code's wrapper: holds the optional title and the `<pre>`. */
export function CodeFigure({ className, ...props }: ComponentProps<'figure'>) {
  return <figure className={cn('my-6 overflow-hidden rounded-lg border-village bg-card text-card-foreground', className)} {...props} />;
}

/** A block's ```lang title="…" ``` caption. */
export function CodeTitle({ className, children, ...props }: ComponentProps<'figcaption'>) {
  const language = (props as { 'data-language'?: string })['data-language'];
  return (
    <figcaption
      className={cn(
        'flex items-center gap-2 border-b-(length:--border-width) px-5 py-2.5 font-mono text-[13px] text-muted-foreground [&_svg]:size-4 [&_svg]:opacity-70',
        className,
      )}
      {...props}
    >
      {language ? getIconForLanguageExtension(language) : null}
      {children}
    </figcaption>
  );
}

/** Copies `text`, or the text of the element `target` points at. */
export function CopyButton({ text, target, className }: { text?: string; target?: React.RefObject<HTMLElement | null>; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text ?? target?.current?.textContent ?? '');
      setCopied(true);
    } catch {
      /* Clipboard refused (insecure context, permissions): nothing to show. */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={cn(
        'absolute top-2.5 right-2.5 inline-flex size-8 cursor-pointer items-center justify-center rounded-control border-village bg-card text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100 focus-visible:focus-ring',
        className,
      )}
    >
      {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
    </button>
  );
}

export function CodePre({ className, children, ...props }: ComponentProps<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  return (
    <div className="group relative">
      <pre ref={ref} className={cn('m-0 overflow-x-auto py-4 font-mono text-[13.5px] leading-[1.7] hide-scrollbar', className)} {...props}>
        {children}
      </pre>
      <CopyButton target={ref} />
    </div>
  );
}

/** Inline `code` gets a chip; a block's `code` (it has `data-language`) is left to the theme. */
export function InlineCode({ className, ...props }: ComponentProps<'code'>) {
  if ('data-language' in props) return <code className={className} {...props} />;
  // A URL longer than the line breaks rather than widening the page; words that fit stay whole (tables keep their columns).
  return <code className={cn('rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground break-words', className)} {...props} />;
}

/** Code highlighted at build time by the `?source` import (rasengan.config.js), with a copy button. */
export function SourceCode({ source, className }: { source: { code: string; html: string }; className?: string }) {
  return (
    <div className={cn('group relative', className)}>
      <div
        className="max-h-[32rem] overflow-auto font-mono text-[13.5px] leading-[1.7] [&_pre]:m-0 [&_pre]:w-max [&_pre]:min-w-full [&_pre]:bg-transparent! [&_pre]:py-4 [&_pre]:outline-none [&_.line]:px-5"
        dangerouslySetInnerHTML={{ __html: source.html }}
      />
      <CopyButton text={source.code} />
    </div>
  );
}
