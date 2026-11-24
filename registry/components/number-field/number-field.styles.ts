/*
 * RFC-0012. The group is Input Group's field (its variants and sizes, from the Field around it): the number is a bare
 * input in the middle, centred, in tabular figures, and the two buttons sit inside the field's edges. The buttons are
 * pressable, so they scale in Konoha and Kiri, sink in Iwa and drop in Kusa; their size follows the group's.
 */
export const numberFieldStyles = {
	root: "flex flex-col gap-2",
	input: "h-full w-full min-w-0 flex-1 border-0 bg-transparent px-1 text-center font-sans text-base tabular-nums text-foreground outline-none sm:text-sm group-data-[size=lg]/input-group:text-base",
	button:
		"mx-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[calc(var(--control-radius)*0.75)] text-muted-foreground outline-none transition-[color,background-color,scale,translate] duration-fast ease-out select-none hover:bg-accent hover:text-accent-foreground focus-visible:focus-ring pressable ui-disabled:pointer-events-none ui-disabled:opacity-50 group-data-[size=sm]/input-group:size-5 group-data-[size=lg]/input-group:size-8 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
};
