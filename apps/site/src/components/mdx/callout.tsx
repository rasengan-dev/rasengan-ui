import type { ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, TriangleAlert } from 'lucide-react';

type Props = {
  title?: string;
  variant?: 'note' | 'warning';
  children: ReactNode;
};

/** `<Note>` or `<Callout variant="warning">` in MDX, drawn with the Alert component. */
export function Callout({ title, variant = 'note', children }: Props) {
  return (
    <Alert role="note" variant={variant === 'warning' ? 'destructive' : 'default'} className="my-6">
      {variant === 'warning' ? <TriangleAlert /> : <Info />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="[&_p]:m-0 [&_p+p]:mt-2">{children}</AlertDescription>
    </Alert>
  );
}
