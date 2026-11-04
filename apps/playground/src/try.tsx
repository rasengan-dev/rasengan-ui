import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";

/**
 * Your scratch area: import what you added with `pnpm playground ui add …` and try it here.
 *
 *   import { Button } from '@/components/ui/button';
 *
 *   export default function Try() {
 *     return <Button>Deploy</Button>;
 *   }
 *
 * `pnpm playground reset` doesn't touch this file; put it back yourself if it imports
 * components that a reset removed.
 */
export default function Try() {
  return <>
    <Dialog>
      <DialogTrigger>
        <Button variant={"soft"} tone="neutral">Deploy</Button>
      </DialogTrigger>
      <DialogContent>
        <p>Hello from Hiraiship</p>
      </DialogContent>
    </Dialog>
  </>;
}
