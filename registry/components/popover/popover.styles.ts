/* Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines"). */
export const popoverStyles = {
	positioner: "z-50",
	popup:
		"flex w-72 origin-(--transform-origin) flex-col gap-3 rounded-lg border-village bg-popover p-4 text-popover-foreground shadow-lg backdrop-blur-surface outline-none duration-fast ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95",
	title: "font-display text-base leading-tight font-semibold tracking-display case-heading",
	description: "text-sm leading-snug text-muted-foreground",
};
