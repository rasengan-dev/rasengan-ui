import { cva, type VariantProps } from "class-variance-authority";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;
const accented = ["neutral", "success", "warning", "info", "destructive"] as const;

/* As on Button: the variant is the style, the tone the colour; outline stays neutral in primary, secondary is grey. */
export const badgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-badge border-village border-transparent font-control font-semibold tracking-control case-control transition-[color,background-color,border-color] duration-fast ease-out focus-visible:focus-ring [&>svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-tone text-tone-foreground [a&]:hover:bg-tone/90",
				secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
				outline: "border-input text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				soft: "border-tone-edge bg-tone-soft text-tone-text [a&]:hover:bg-tone-soft/70",
				destructive: "tone-destructive bg-tone text-tone-foreground [a&]:hover:bg-tone/90",
			},
			tone: Object.fromEntries(tones.map((tone) => [tone, ""])) as Record<(typeof tones)[number], string>,
			size: {
				sm: "px-1.5 py-0 text-[0.6875rem] [&>svg]:size-2.5",
				default: "px-2 py-0.5 text-xs [&>svg]:size-3",
				lg: "px-2.5 py-1 text-sm [&>svg]:size-3.5",
			},
		},
		compoundVariants: [
			...tones.flatMap((tone) => (["default", "outline", "soft"] as const).map((variant) => ({ variant, tone, class: `tone-${tone}` }))),
			...accented.map((tone) => ({
				variant: "outline" as const,
				tone,
				class: "border-tone-border/50 text-tone-text [a&]:hover:bg-tone-soft [a&]:hover:text-tone-text",
			})),
		],
		defaultVariants: { variant: "default", tone: "primary", size: "default" },
	},
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
