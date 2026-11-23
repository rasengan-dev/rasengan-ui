import { cva, type VariantProps } from "class-variance-authority";

/*
 * The root is the track; the bar inside it scales from 0 to the scroll progress (RFC-0010). `fixed` pins the track to
 * the top of the viewport, above the page; `inline` leaves it where it is written (a sticky header, a card). Until the
 * progress is linked (no JavaScript, `final`), the track is invisible rather than an empty line.
 */
export const scrollProgressVariants = cva("pointer-events-none w-full overflow-hidden [&:not([data-scroll-linked])]:invisible", {
	variants: {
		variant: {
			default: "bg-transparent",
			track: "bg-tone-soft",
		},
		tone: {
			neutral: "tone-neutral",
			primary: "tone-primary",
			success: "tone-success",
			warning: "tone-warning",
			info: "tone-info",
			destructive: "tone-destructive",
		},
		size: {
			sm: "h-0.5",
			default: "h-1",
			lg: "h-1.5",
		},
		position: {
			fixed: "fixed inset-x-0 top-0 z-50",
			inline: "relative",
		},
	},
	defaultVariants: { variant: "default", tone: "primary", size: "default", position: "fixed" },
});

export type ScrollProgressVariantProps = VariantProps<typeof scrollProgressVariants>;

export const scrollProgressStyles = {
	bar: "h-full w-full origin-left bg-tone [transform:scaleX(var(--scroll-progress,0))] rtl:origin-right",
};
