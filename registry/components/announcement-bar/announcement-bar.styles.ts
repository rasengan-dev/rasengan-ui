import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0012. A band across the top of the page, in the tone: soft (the tone's wash and its colour for words) or solid
 * (the tone's fill and its foreground), the pairs the contract holds to 4.5:1. Links inside take the band's text colour,
 * underlined. The close button sits at the end, inside the band's padding, so the message stays centred.
 */
const tones = {
	neutral: "tone-neutral",
	primary: "tone-primary",
	success: "tone-success",
	warning: "tone-warning",
	info: "tone-info",
	destructive: "tone-destructive",
};

export const announcementBarVariants = cva(
	"relative flex w-full items-center justify-center gap-3 px-12 text-center font-sans [&_a]:font-medium [&_a]:text-current [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:no-underline",
	{
		variants: {
			variant: {
				soft: "border-b-(length:--border-width) border-tone-edge bg-tone-soft text-tone-text",
				solid: "bg-tone text-tone-foreground",
			},
			tone: tones,
			size: {
				sm: "min-h-9 py-1.5 text-xs",
				default: "min-h-11 py-2 text-sm",
			},
		},
		defaultVariants: { variant: "soft", tone: "primary", size: "default" },
	},
);

export type AnnouncementBarVariantProps = VariantProps<typeof announcementBarVariants>;

export const announcementBarStyles = {
	marquee: "min-w-0 flex-1 [&_[data-slot=button]]:text-current",
	close:
		"absolute end-2 top-1/2 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-control text-current opacity-80 outline-none transition-[opacity,background-color] duration-fast ease-out hover:bg-current/10 hover:opacity-100 focus-visible:focus-ring focus-visible:opacity-100 [&_svg]:size-4",
};
