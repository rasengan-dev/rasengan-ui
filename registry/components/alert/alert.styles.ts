import { cva, type VariantProps } from "class-variance-authority";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;

/*
 * default: a card; a tone other than neutral colours its icon and title. soft: a wash of the tone, its icon and title in
 * the tone's text colour, the description in the foreground. outline: no fill, a border in the tone.
 * destructive is the shadcn variant, kept as it was.
 */
export const alertVariants = cva(
	"relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-lg border-village px-4 py-3.5 text-sm backdrop-blur-surface has-[>svg]:grid-cols-[1.125rem_1fr] has-[>svg]:gap-x-3 [&>svg]:size-[1.125rem] [&>svg]:translate-y-px [&>svg]:text-current",
	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				soft: "border-tone-edge bg-tone-soft text-foreground [&>svg]:text-tone-text *:data-[slot=alert-description]:text-foreground *:data-[slot=alert-title]:text-tone-text",
				outline: "border-tone-border/60 bg-transparent text-foreground [&>svg]:text-tone-text *:data-[slot=alert-title]:text-tone-text",
				destructive: "border-destructive/50 bg-card text-destructive *:data-[slot=alert-description]:text-destructive",
			},
			tone: Object.fromEntries(tones.map((tone) => [tone, ""])) as Record<(typeof tones)[number], string>,
		},
		compoundVariants: [
			...tones.flatMap((tone) => (["default", "soft", "outline"] as const).map((variant) => ({ variant, tone, class: `tone-${tone}` }))),
			...tones
				.filter((tone) => tone !== "neutral")
				.map((tone) => ({ variant: "default" as const, tone, class: "[&>svg]:text-tone-text *:data-[slot=alert-title]:text-tone-text" })),
		],
		defaultVariants: { variant: "default", tone: "neutral" },
	},
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;

export const alertStyles = {
	title: "col-start-2 min-h-4 font-display font-semibold tracking-display case-heading",
	description: "col-start-2 grid justify-items-start gap-1 text-sm leading-relaxed text-muted-foreground [&_p]:leading-relaxed",
};
