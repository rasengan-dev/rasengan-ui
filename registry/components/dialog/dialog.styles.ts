/* Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines"). */
export const dialogStyles = {
	backdrop:
		"fixed inset-0 z-50 bg-overlay duration-base ease-out ui-open:animate-in ui-open:fade-in-0 ui-closed:animate-out ui-closed:fade-out-0",
	popup:
		"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border-village bg-popover p-6 text-popover-foreground shadow-lg outline-none backdrop-blur-surface duration-base ease-out sm:max-w-lg ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95",
	close:
		"absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 outline-none transition-opacity duration-fast hover:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring [&_svg]:size-4",
	header: "flex flex-col gap-1.5 text-center sm:text-left",
	footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
	title: "font-display text-lg leading-none font-semibold tracking-display",
	description: "text-sm text-muted-foreground",
};
