/** The "new" mark of a component (its `added` date is recent): a dot in the nature's colour, "new" for screen readers. */
export function NewDot() {
  return (
    <>
      <span aria-hidden="true" data-slot="new-dot" className="size-1.5 shrink-0 rounded-pill bg-primary" />
      <span className="sr-only">, new</span>
    </>
  );
}
