/*
 * Sonner runs unstyled: it keeps the stacking, the motion and the swipe, the village draws the rest.
 * Sonner's own focus shadow is unlayered, hence the one important utility; its loading spinner is centred
 * on the nearest positioned box, hence the relative icon.
 */
export const toastStyles = {
	toast:
		"group/toast flex w-(--width) items-start gap-3 rounded-lg border-village bg-popover p-4 font-sans text-popover-foreground shadow-lg backdrop-blur-surface has-[[data-close-button]]:pe-11 focus-visible:focus-ring focus-visible:shadow-lg!",
	icon: "relative mt-0.5 flex size-4 shrink-0 items-center justify-center [&_svg]:size-4",
	content: "grid min-w-0 flex-1 gap-1",
	title: "font-display text-sm leading-tight font-semibold tracking-display case-heading",
	description: "text-sm leading-snug text-muted-foreground",
	success: "[&_[data-icon]]:text-primary",
	info: "[&_[data-icon]]:text-muted-foreground",
	warning: "[&_[data-icon]]:text-primary",
	error: "[&_[data-icon]]:text-destructive [&_[data-title]]:text-destructive",
	action: "shrink-0 self-center",
	close:
		"absolute end-2.5 top-2.5 inline-flex size-7 cursor-pointer items-center justify-center rounded-control text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:focus-ring [&_svg]:size-4",
	spinner: "animate-spin",
};
