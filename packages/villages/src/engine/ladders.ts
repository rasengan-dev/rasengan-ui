/**
 * The colour ladders (RFC-0006, "The engine"): one per contrast level, each taken from the village that made it —
 * standard from Konoha, soft from Kiri, high from Iwa. A grey is [lightness, chroma, hue role, alpha?]: the role picks
 * the surface hue, the ink hue or the hue between them (`neutrals`), and the chroma is scaled by `neutrals.chroma`.
 * Strings are written as they are.
 */
import type { Contrast, Depth, Motion, Density } from "./recipe.ts";

export type Role = "s" | "i" | "m";
export type Grey = readonly [l: number, c: number, role: Role, alpha?: number];
export type Entry = string | Grey;

export interface Ladder {
	light: Record<string, Entry>;
	dark: Record<string, Entry>;
}

export const ladders: Record<Contrast, Ladder> = {
	standard: {
		light: {
			"--background": [0.985, 0.004, "s"],
			"--foreground": [0.22, 0.012, "i"],
			"--card": "oklch(1 0 0)",
			"--popover": "oklch(1 0 0)",
			"--secondary": [0.95, 0.008, "s"],
			"--secondary-foreground": [0.27, 0.012, "i"],
			"--muted": [0.95, 0.008, "s"],
			"--muted-foreground": [0.5, 0.014, "i"],
			"--accent": [0.94, 0.012, "s"],
			"--destructive": "oklch(0.55 0.21 27)",
			"--destructive-foreground": [0.99, 0.005, "s"],
			"--border": [0.9, 0.01, "s"],
			"--input": [0.87, 0.012, "s"],
			"--control-border": [0.63, 0.014, "m"],
			"--input-bg": "oklch(1 0 0)",
			"--overlay": [0.2, 0.02, "i", 40],
			"--primary-l": "0.52",
			"--primary-c": "0.18",
			"--on-primary": [0.99, 0.005, "s"],
			"--tone-text-l": "0.46",
			"--status-c": "0.12",
			"--destructive-text": "oklch(0.5 0.2 27)",
			"--chart-l": "0.66",
			"--chart-c": "0.16",
		},
		dark: {
			"--background": [0.17, 0.008, "i"],
			"--foreground": [0.96, 0.006, "s"],
			"--card": [0.205, 0.009, "i"],
			"--popover": [0.22, 0.01, "i"],
			"--secondary": [0.26, 0.01, "i"],
			"--secondary-foreground": "var(--foreground)",
			"--muted": [0.26, 0.01, "i"],
			"--muted-foreground": [0.72, 0.012, "m"],
			"--accent": [0.28, 0.012, "i"],
			"--destructive": "oklch(0.68 0.19 25)",
			"--destructive-foreground": [0.17, 0.008, "i"],
			"--border": "oklch(1 0 0 / 10%)",
			"--input": "oklch(1 0 0 / 16%)",
			"--control-border": [0.54, 0.012, "m"],
			"--input-bg": "oklch(1 0 0 / 4%)",
			"--overlay": "oklch(0 0 0 / 60%)",
			"--switch-thumb": "var(--foreground)",
			"--primary-l": "0.74",
			"--primary-c": "0.16",
			"--on-primary": [0.18, 0.01, "i"],
			"--tone-text-l": "var(--primary-l)",
			"--status-c": "0.13",
			"--warning-l": "0.8",
			"--soft-alpha": "16%",
			"--destructive-text": "var(--destructive)",
			"--chart-l": "0.72",
			"--chart-c": "0.15",
		},
	},
	soft: {
		light: {
			"--background": [0.965, 0.008, "s"],
			"--foreground": [0.3, 0.025, "i"],
			"--card": "oklch(1 0 0)",
			"--secondary": [0.93, 0.014, "s"],
			"--secondary-foreground": "var(--foreground)",
			"--muted": [0.93, 0.012, "s"],
			"--muted-foreground": [0.49, 0.022, "i"],
			"--accent": [0.91, 0.016, "s"],
			"--destructive": "oklch(0.54 0.15 20)",
			"--destructive-foreground": "oklch(0.99 0 0)",
			"--border": [0.3, 0.025, "i", 10],
			"--input": [0.3, 0.025, "i", 14],
			"--control-border": [0.62, 0.03, "m"],
			"--input-bg": "oklch(1 0 0)",
			"--overlay": [0.3, 0.03, "i", 22],
			"--primary-l": "0.53",
			"--primary-c": "0.1",
			"--on-primary": "oklch(0.99 0 0)",
			"--tone-text-l": "0.46",
			"--status-c": "0.1",
			"--warning-l": "0.84",
			"--warning-c": "0.11",
			"--on-warning": "oklch(0.3 0.04 60)",
			"--soft-alpha": "14%",
			"--destructive-text": "oklch(0.48 0.15 20)",
			"--chart-l": "0.6",
			"--chart-c": "0.09",
		},
		dark: {
			"--background": [0.2, 0.015, "i"],
			"--foreground": [0.93, 0.01, "s"],
			"--card": [0.25, 0.016, "i"],
			"--popover": [0.27, 0.018, "i"],
			"--secondary": [0.29, 0.016, "i"],
			"--muted": [0.26, 0.015, "i"],
			"--muted-foreground": [0.74, 0.015, "m"],
			"--accent": [0.3, 0.016, "i"],
			"--destructive": "oklch(0.72 0.12 20)",
			"--destructive-foreground": [0.2, 0.015, "i"],
			"--border": "oklch(1 0 0 / 9%)",
			"--input": "oklch(1 0 0 / 14%)",
			"--control-border": [0.56, 0.025, "m"],
			"--input-bg": "oklch(1 0 0 / 4%)",
			"--overlay": [0.1, 0.02, "i", 55],
			"--switch-thumb": "var(--foreground)",
			"--primary-l": "0.78",
			"--primary-c": "0.09",
			"--on-primary": [0.2, 0.02, "i"],
			"--tone-text-l": "var(--primary-l)",
			"--status-c": "0.09",
			"--warning-l": "0.84",
			"--soft-alpha": "16%",
			"--destructive-text": "var(--destructive)",
			"--chart-l": "0.76",
			"--chart-c": "0.08",
		},
	},
	high: {
		light: {
			"--background": [0.94, 0.006, "s"],
			"--foreground": [0.16, 0.005, "i"],
			"--card": [0.97, 0.004, "s"],
			"--secondary": [0.87, 0.008, "s"],
			"--secondary-foreground": "var(--foreground)",
			"--muted": [0.88, 0.008, "s"],
			"--muted-foreground": [0.4, 0.01, "i"],
			"--accent": [0.87, 0.008, "s"],
			"--destructive": "oklch(0.5 0.2 28)",
			"--destructive-foreground": "oklch(0.99 0 0)",
			"--border": [0.78, 0.01, "s"],
			"--input": [0.72, 0.012, "s"],
			"--control-border": [0.52, 0.014, "m"],
			"--input-bg": "oklch(1 0 0)",
			"--overlay": [0.16, 0.005, "i", 45],
			"--primary-l": "0.5",
			"--primary-c": "0.14",
			"--on-primary": "oklch(0.99 0 0)",
			"--tone-text-l": "0.44",
			"--status-c": "0.12",
			"--warning-l": "0.78",
			"--warning-c": "0.15",
			"--on-warning": "oklch(0.16 0 0)",
			"--soft-alpha": "18%",
			"--destructive-text": "oklch(0.46 0.19 28)",
			"--chart-l": "0.55",
			"--chart-c": "0.13",
		},
		dark: {
			"--background": [0.17, 0.004, "i"],
			"--foreground": [0.93, 0.006, "s"],
			"--card": [0.21, 0.005, "i"],
			"--secondary": [0.28, 0.006, "i"],
			"--muted": [0.25, 0.006, "i"],
			"--muted-foreground": [0.72, 0.008, "m"],
			"--accent": [0.28, 0.006, "i"],
			"--destructive": "oklch(0.66 0.19 28)",
			"--destructive-foreground": "oklch(0.15 0 0)",
			"--border": "oklch(1 0 0 / 14%)",
			"--input": "oklch(1 0 0 / 20%)",
			"--control-border": [0.6, 0.012, "m"],
			"--input-bg": "oklch(1 0 0 / 4%)",
			"--overlay": "oklch(0 0 0 / 60%)",
			"--primary-l": "0.74",
			"--primary-c": "0.14",
			"--on-primary": "oklch(0.15 0 0)",
			"--tone-text-l": "var(--primary-l)",
			"--status-c": "0.13",
			"--soft-alpha": "20%",
			"--destructive-text": "oklch(0.74 0.16 28)",
			"--chart-l": "0.72",
			"--chart-c": "0.12",
		},
	},
};

/** Control heights, padding and label size, in rem. */
export const densities: Record<Density, { sm: number; md: number; lg: number; px: number; text: number }> = {
	compact: { sm: 1.875, md: 2.125, lg: 2.625, px: 0.875, text: 0.8125 },
	default: { sm: 2, md: 2.25, lg: 2.75, px: 1, text: 0.875 },
	comfortable: { sm: 2.25, md: 2.625, lg: 3.125, px: 1.25, text: 0.90625 },
};

export const motions: Record<Motion, { fast: string; base: string; slow: string; out: string; inOut: string }> = {
	quick: { fast: "80ms", base: "140ms", slow: "220ms", out: "cubic-bezier(0.2, 0, 0, 1)", inOut: "cubic-bezier(0.4, 0, 0.2, 1)" },
	calm: { fast: "120ms", base: "200ms", slow: "360ms", out: "cubic-bezier(0.16, 1, 0.3, 1)", inOut: "cubic-bezier(0.65, 0, 0.35, 1)" },
	gentle: { fast: "160ms", base: "280ms", slow: "480ms", out: "cubic-bezier(0.22, 1, 0.36, 1)", inOut: "cubic-bezier(0.45, 0, 0.55, 1)" },
};

type Shadows = Record<"--elevation-sm" | "--elevation-md" | "--elevation-lg" | "--input-shadow", string> & Partial<Record<"--thumb-shadow", string>>;

/** Shadows per depth and scheme; `grey` writes a tinted ink colour. */
export function shadows(depth: Depth, grey: (g: Grey) => string): { light: Shadows; dark: Partial<Shadows> } {
	const ink = (c: number, alpha: number) => grey([0.2, c, "i", alpha]);
	const mist = (c: number, alpha: number) => grey([0.3, c, "i", alpha]);
	const inputShadow = `0 1px 2px ${ink(0.02, 5)}`;
	switch (depth) {
		case "flat":
			return { light: { "--elevation-sm": "none", "--elevation-md": "none", "--elevation-lg": "none", "--input-shadow": "none", "--thumb-shadow": "none" }, dark: {} };
		case "soft":
			return {
				light: {
					"--elevation-sm": `0 1px 2px ${ink(0.02, 8)}`,
					"--elevation-md": `0 1px 2px ${ink(0.02, 6)}, 0 6px 16px -4px ${ink(0.02, 12)}`,
					"--elevation-lg": `0 2px 4px ${ink(0.02, 6)}, 0 24px 48px -16px ${ink(0.02, 28)}`,
					"--input-shadow": inputShadow,
				},
				dark: {
					"--elevation-sm": "0 1px 2px oklch(0 0 0 / 30%)",
					"--elevation-md": "0 1px 2px oklch(0 0 0 / 30%), 0 8px 20px -6px oklch(0 0 0 / 45%)",
					"--elevation-lg": "0 24px 56px -16px oklch(0 0 0 / 65%)",
					"--input-shadow": "none",
				},
			};
		case "raised":
			return {
				light: {
					"--elevation-sm": `0 1px 2px ${mist(0.03, 5)}, 0 10px 24px -14px ${mist(0.04, 30)}`,
					"--elevation-md": `0 2px 4px ${mist(0.03, 6)}, 0 16px 36px -18px ${mist(0.04, 32)}`,
					"--elevation-lg": `0 24px 60px -20px ${mist(0.05, 35)}`,
					"--input-shadow": inputShadow,
				},
				dark: {
					"--elevation-sm": "0 10px 24px -14px oklch(0 0 0 / 60%)",
					"--elevation-md": "0 16px 36px -18px oklch(0 0 0 / 65%)",
					"--elevation-lg": "0 24px 60px -20px oklch(0 0 0 / 70%)",
					"--input-shadow": "none",
				},
			};
		case "hard":
			return {
				light: {
					"--elevation-sm": "3px 3px 0 0 var(--foreground)",
					"--elevation-md": "4px 4px 0 0 var(--foreground)",
					"--elevation-lg": "6px 6px 0 0 var(--foreground)",
					"--input-shadow": "none",
					"--thumb-shadow": "none",
				},
				dark: {},
			};
	}
}
