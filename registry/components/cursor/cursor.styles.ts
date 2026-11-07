import { cva, type VariantProps } from "class-variance-authority";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;

/*
 * The cursor is drawn in a fixed layer above the page and never takes the pointer. A ring is the tone's edge around
 * nothing; a dot is filled with the tone. Over a target both become a soft wash of the tone around it; with a label
 * they become a pill with the tone's words. Corners follow the target's own radius.
 */
export const cursorVariants = cva(
	"pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center overflow-hidden whitespace-nowrap rounded-pill font-control text-control-sm font-control-weight tracking-control case-control opacity-0 transition-[opacity,background-color,border-color,color] duration-fast ease-out data-[visible]:opacity-100",
	{
		variants: {
			variant: {
				ring: "border-2 border-tone-text data-[over]:border-tone-edge data-[over]:bg-tone-soft/60",
				dot: "bg-tone-text data-[over]:bg-tone-soft/70 data-[label]:bg-tone data-[label]:text-tone-foreground",
			},
			tone: Object.fromEntries(tones.map((tone) => [tone, `tone-${tone}`])) as Record<(typeof tones)[number], string>,
		},
		defaultVariants: { variant: "ring", tone: "primary" },
	},
);

export type CursorVariantProps = VariantProps<typeof cursorVariants>;

export const cursorStyles = {
	area: "relative",
	label: "px-3",
};

/** Diameter of the idle cursor, in pixels, per size and variant. */
export const cursorSizes = {
	ring: { sm: 20, default: 28, lg: 40 },
	dot: { sm: 8, default: 12, lg: 18 },
} as const;
