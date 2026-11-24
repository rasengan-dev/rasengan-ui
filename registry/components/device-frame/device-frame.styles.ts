import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0013. A frame around a screenshot or a video, drawn with the contract only: the browser is a card with a bar
 * (three dots, an address bar), the phone a bezel in the foreground's colour with a pill-shaped island. The browser
 * takes the village's large radius and shadow; the phone a radius derived from it, so it is square in Iwa and round in
 * Kusa. The screen clips what it holds; the chrome is decoration.
 */
export const deviceFrameVariants = cva("relative isolate w-full overflow-hidden", {
	variants: {
		variant: {
			browser: "flex flex-col rounded-xl border-village border-border bg-card text-card-foreground shadow-lg backdrop-blur-surface",
			phone:
				"mx-auto aspect-[390/844] max-w-xs rounded-[calc(var(--radius-xl)*2.4)] border-solid [border-width:calc(var(--border-width)*6_+_6px)] border-foreground bg-foreground shadow-lg",
		},
	},
	defaultVariants: { variant: "browser" },
});

export type DeviceFrameVariantProps = VariantProps<typeof deviceFrameVariants>;

export const deviceFrameStyles = {
	bar: "flex h-10 shrink-0 items-center gap-3 border-b-(length:--border-width) border-border bg-muted px-3",
	dots: "flex shrink-0 gap-1.5 [&>span]:size-2.5 [&>span]:rounded-full [&>span]:bg-muted-foreground/40",
	address:
		"mx-auto flex h-6 w-full max-w-sm min-w-0 items-center justify-center gap-1.5 rounded-pill bg-background px-3 text-xs text-muted-foreground [&>svg]:size-3 [&>svg]:shrink-0",
	browserScreen: "relative min-h-0 flex-1 [&>img]:block [&>img]:w-full [&>video]:block [&>video]:w-full",
	phoneScreen:
		"relative size-full overflow-hidden rounded-[calc(var(--radius-xl)*1.9)] bg-background [&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover",
	island: "absolute top-2.5 left-1/2 z-10 h-5 w-[30%] -translate-x-1/2 rounded-pill bg-foreground",
	homeBar: "absolute bottom-1.5 left-1/2 z-10 h-1 w-[35%] -translate-x-1/2 rounded-pill bg-foreground/40",
};
