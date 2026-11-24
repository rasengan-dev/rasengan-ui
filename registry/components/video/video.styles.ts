import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0012. The video fills a frame of the village's radius (16:9 unless you set another aspect), on the muted
 * surface while it loads. Before it plays, the poster and a large round play button in the tone, standing on its lip
 * in Kusa; once it plays, the browser's own controls. A background loop has a small pause button in a corner, on the
 * popover surface so it reads over any picture. The play button is centred with `inset-0 m-auto`, not a translate:
 * pressing writes the `translate` property (`pressable`), which would throw a translated button off centre.
 */
export const videoPlayVariants = cva(
	"absolute inset-0 m-auto inline-flex cursor-pointer items-center justify-center rounded-full bg-tone text-tone-foreground shadow-md lip-tone outline-none transition-[scale,translate,box-shadow,background-color] duration-fast ease-out hover:bg-tone/90 focus-visible:focus-ring pressable [&_svg]:fill-current",
	{
		variants: {
			tone: {
				neutral: "tone-neutral",
				primary: "tone-primary",
				success: "tone-success",
				warning: "tone-warning",
				info: "tone-info",
				destructive: "tone-destructive",
			},
			size: {
				sm: "size-12 [&_svg]:size-4",
				default: "size-16 [&_svg]:size-6",
				lg: "size-20 [&_svg]:size-8",
			},
		},
		defaultVariants: { tone: "primary", size: "default" },
	},
);

export type VideoPlayVariantProps = VariantProps<typeof videoPlayVariants>;

export const videoStyles = {
	root: "relative isolate aspect-video w-full overflow-hidden rounded-lg bg-muted",
	video: "size-full object-cover",
	toggle:
		"absolute end-3 bottom-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-village bg-popover/90 text-popover-foreground shadow-sm outline-none backdrop-blur-surface transition-[background-color,scale] duration-fast ease-out hover:bg-popover focus-visible:focus-ring pressable [&_svg]:size-4",
	dialog: "gap-0 overflow-hidden p-0 sm:max-w-4xl [&_[data-slot=dialog-close]]:z-10 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-popover/90 [&_[data-slot=dialog-close]]:p-1.5 [&_[data-slot=dialog-close]]:opacity-100 [&_[data-slot=dialog-close]]:top-3 [&_[data-slot=dialog-close]]:right-3",
	dialogVideo: "rounded-none",
};
