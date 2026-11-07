import { cva, type VariantProps } from "class-variance-authority";

/*
 * The root carries the tone and size; the parts read them: the range fills with the tone (primary by default), the
 * thumb's ring takes the tone's edge (3:1 on the page, even in amber), and the size sets the track and the thumb.
 * The track's edge is drawn inside it (::before), under the range: it takes no room, the range lines up with the
 * track and covers the edge where it fills it (Iwa).
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
				sm: "[--slider-track:calc(0.25rem*var(--track-scale))] [--thumb-size:var(--indicator-sm)]",
				default: "[--slider-track:calc(0.375rem*var(--track-scale))] [--thumb-size:var(--indicator-md)]",
				lg: "[--slider-track:calc(0.5rem*var(--track-scale))] [--thumb-size:var(--indicator-lg)]",
			},
		},
		defaultVariants: { tone: "primary", size: "default" },
	},
);

export type SliderVariantProps = VariantProps<typeof sliderVariants>;

export const sliderStyles = {
	control: "flex w-full touch-none items-center py-2 select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0",
	track: "relative grow overflow-visible rounded-pill bg-control-track select-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border-village before:border-track-border before:content-[''] data-[orientation=horizontal]:h-(--slider-track) data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--slider-track)",
	indicator: "rounded-pill bg-tone select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
	thumb: "block size-(--thumb-size) shrink-0 cursor-grab rounded-pill -translate-y-[calc(var(--lip)*0.5)] border-2 border-tone-border bg-background shadow-knob lip-tone transition-[outline-color,scale] duration-fast ease-out select-none has-[:focus-visible]:focus-ring data-[dragging]:cursor-grabbing data-[dragging]:scale-110 ui-disabled:pointer-events-none",
};
