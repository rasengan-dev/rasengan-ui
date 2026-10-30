import { cva, type VariantProps } from "class-variance-authority";

/*
 * The root carries the tone and size; the parts read them: the range fills with the tone (primary by default), the
 * thumb's ring takes the tone's edge (3:1 on the page, even in amber), and the size sets the track and the thumb.
 */
export const sliderVariants = cva(
	"relative w-full touch-none select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto ui-disabled:opacity-50",
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
				sm: "[--slider-track:0.25rem] [--thumb-size:var(--indicator-sm)]",
				default: "[--slider-track:0.375rem] [--thumb-size:var(--indicator-md)]",
				lg: "[--slider-track:0.5rem] [--thumb-size:var(--indicator-lg)]",
			},
		},
		defaultVariants: { tone: "primary", size: "default" },
	},
);

export type SliderVariantProps = VariantProps<typeof sliderVariants>;

export const sliderStyles = {
	control: "flex w-full touch-none items-center py-2 select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0",
	track: "relative grow overflow-visible rounded-pill border-village border-track-border bg-control-track select-none data-[orientation=horizontal]:h-(--slider-track) data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--slider-track)",
	indicator: "rounded-pill bg-tone select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
	thumb: "block size-(--thumb-size) shrink-0 cursor-grab rounded-pill border-2 border-tone-border bg-background shadow-thumb transition-[outline-color,scale] duration-fast ease-out select-none has-[:focus-visible]:focus-ring data-[dragging]:cursor-grabbing data-[dragging]:scale-110 ui-disabled:pointer-events-none",
};
