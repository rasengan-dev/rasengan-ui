import { cva, type VariantProps } from "class-variance-authority";

/*
 * The group draws Input's field (its variants and sizes, from the Field around it) and the control inside is bare.
 * ghost: no border or fill until hovered, as Select's trigger. A block addon or a textarea makes the group grow.
 */
export const inputGroupVariants = cva(
	[
		"group/input-group relative flex w-full min-w-0 items-center rounded-control border-village font-sans text-foreground transition-[color,background-color,border-color,outline-color,box-shadow] duration-fast ease-out",
		"has-[>:is(input,textarea):focus-visible]:border-primary has-[>:is(input,textarea):is([data-invalid],[aria-invalid=true])]:border-destructive has-[>:is(input,textarea):is([data-invalid],[aria-invalid=true])]:[--ring:color-mix(in_oklab,var(--destructive)_40%,transparent)]",
		"has-[>:is(input,textarea):disabled]:cursor-not-allowed has-[>:is(input,textarea):disabled]:opacity-60",
		"has-[>textarea]:h-auto has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
	].join(" "),
	{
		variants: {
			variant: {
				default: "border-input bg-input-bg shadow-input has-[>:is(input,textarea):focus-visible]:focus-ring",
				filled: "border-field-filled-edge bg-field-filled hover:bg-field-filled-hover has-[>:is(input,textarea):focus-visible]:bg-input-bg has-[>:is(input,textarea):focus-visible]:focus-ring",
				underline: "rounded-none border-x-0 border-t-0 border-input bg-transparent has-[>:is(input,textarea):focus-visible]:shadow-[0_var(--border-width)_0_0_var(--primary)]",
				ghost: "border-transparent bg-transparent hover:bg-accent has-[>:is(input,textarea):focus-visible]:border-transparent has-[>:is(input,textarea):focus-visible]:focus-ring",
			},
			size: {
				sm: "h-control-sm",
				default: "h-control",
				lg: "h-control-lg",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);

export type InputGroupVariantProps = VariantProps<typeof inputGroupVariants>;

/*
 * Where the addon sits. Inline addons pad the side the control gives up; a button inside sits closer to the edge.
 * Underline has no side padding, so its addons keep a gap toward the control instead.
 */
export const inputGroupAddonVariants = cva(
	"flex h-auto cursor-text items-center justify-center gap-2 text-sm font-medium text-muted-foreground select-none [&>kbd]:rounded-[calc(var(--control-radius)*0.5)] [&>svg:not([class*='size-'])]:size-4",
	{
		variants: {
			align: {
				"inline-start": "order-first ps-input-x has-[>button]:ps-1 group-data-[variant=underline]/input-group:ps-0 group-data-[variant=underline]/input-group:pe-2",
				"inline-end": "order-last pe-input-x has-[>button]:pe-1 group-data-[variant=underline]/input-group:pe-0 group-data-[variant=underline]/input-group:ps-2",
				"block-start": "order-first w-full justify-start px-input-x pt-2.5 group-data-[variant=underline]/input-group:px-0",
				"block-end": "order-last w-full justify-start px-input-x pb-2.5 group-data-[variant=underline]/input-group:px-0",
			},
		},
		defaultVariants: { align: "inline-start" },
	},
);

export type InputGroupAddonVariantProps = VariantProps<typeof inputGroupAddonVariants>;

/* Buttons sized to fit inside the field: xs and icon-xs in any group, sm and icon-sm in a large one or a block addon. */
export const inputGroupButtonSizes = {
	xs: "h-6 gap-1 px-2 text-xs rounded-[calc(var(--control-radius)*0.75)] [&>svg:not([class*='size-'])]:size-3.5",
	sm: "h-control-sm gap-1.5 px-2.5",
	"icon-xs": "size-6 p-0 rounded-[calc(var(--control-radius)*0.75)] [&>svg:not([class*='size-'])]:size-3.5",
	"icon-sm": "size-control-sm p-0",
} as const;

export const inputGroupStyles = {
	/* The control inside: no border, fill, shadow or ring of its own; less padding on a side that has an addon. */
	control:
		"h-full flex-1 rounded-none border-0! bg-transparent! shadow-none! outline-hidden! ui-disabled:opacity-100 group-has-[>[data-align=inline-start]]/input-group:ps-1.5 group-has-[>[data-align=inline-end]]/input-group:pe-1.5 group-data-[variant=underline]/input-group:px-0",
	textarea: "resize-none py-3 group-has-[>[data-align=block-start]]/input-group:pt-1.5 group-has-[>[data-align=block-end]]/input-group:pb-1.5",
	text: "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
};
