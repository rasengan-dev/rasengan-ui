import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * The contract's utilities (RFC-0002), so that tailwind-merge does not mistake
 * them for others: without this, text-control reads as a text colour and is
 * dropped by text-primary-foreground, and border-village by border-input.
 */
const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [{ text: ["control"] }],
			"font-family": [{ font: ["control"] }],
			"font-weight": [{ font: ["control-weight"] }],
			tracking: [{ tracking: ["control", "display"] }],
			"border-w": ["border-village"],
			rounded: [{ rounded: ["control", "pill", "check", "badge"] }],
			shadow: [{ shadow: ["input"] }],
		},
	},
});

/** Joins class names and lets the last Tailwind utility win (installed as `@/lib/utils`, like shadcn). */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
