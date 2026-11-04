import { cva } from "class-variance-authority";

/* A top-level item: a trigger with a panel, or a plain link styled the same way (navigationMenuTriggerStyle()). */
export const navigationMenuTriggerStyle = cva(
	"group/navigation-menu-trigger inline-flex h-control-sm w-max cursor-pointer items-center justify-center gap-1 rounded-control px-3 font-control text-sm font-medium tracking-control case-control text-foreground outline-none transition-[color,background-color] duration-fast ease-out hover:bg-accent hover:text-accent-foreground focus-visible:focus-ring data-active:bg-accent/60 ui-open:bg-accent ui-open:text-accent-foreground ui-disabled:pointer-events-none ui-disabled:opacity-50",
);

/*
 * One popup for every panel: it moves under the open trigger and resizes to the panel (--popup-width, --popup-height),
 * and panels slide in from the side they come from (data-activation-direction). Transitions, not keyframes, so a
 * switch between two triggers animates from where the popup is. Motion is the village's.
 */
export const navigationMenuStyles = {
	root: "relative flex max-w-max flex-1 items-center justify-center",
	list: "flex flex-1 list-none items-center justify-center gap-1",
	icon: "size-3.5 transition-transform duration-base ease-out ui-open:rotate-180",
	positioner:
		"z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-base ease-out data-instant:transition-none",
	popup:
		"relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-lg border-village bg-popover text-popover-foreground shadow-lg backdrop-blur-surface outline-none transition-[opacity,scale,width,height] duration-base ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
	viewport: "relative size-full overflow-hidden",
	content:
		"h-full w-[calc(100vw-2rem)] p-2 transition-[opacity,translate] duration-base ease-out sm:w-max sm:max-w-xl data-starting-style:opacity-0 data-ending-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-1/2 data-starting-style:data-[activation-direction=right]:translate-x-1/2 data-ending-style:data-[activation-direction=left]:translate-x-1/2 data-ending-style:data-[activation-direction=right]:-translate-x-1/2",
	link: "flex flex-col gap-1 rounded-[calc(var(--control-radius)*0.75)] p-2.5 text-sm outline-none transition-colors duration-fast hover:bg-accent hover:text-accent-foreground focus-visible:focus-ring data-active:bg-accent/60 [&_svg:not([class*='size-'])]:size-4",
};
