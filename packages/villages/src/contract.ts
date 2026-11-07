/**
 * The token contract as data (RFC-0006, "The contract, written down"): every token a village may set, in the order a
 * village file lists them. contract.css is still what the browser reads; contract.test.ts keeps the two in step with
 * the built-in villages.
 */

export type TokenGroup =
	| "accent"
	| "shape"
	| "type"
	| "controls"
	| "focus"
	| "press"
	| "motion"
	| "colour"
	| "fields"
	| "tabs"
	| "lists"
	| "states"
	| "tracks"
	| "status"
	| "chart"
	| "depth"
	| "loading";

export type TokenKind =
	| "color"
	/** A colour or an image, such as a hatched gradient. */
	| "paint"
	| "image"
	| "shadow"
	| "number"
	| "percentage"
	| "hue"
	| "length"
	| "font"
	| "keyword"
	| "time"
	| "easing"
	| "animation";

export interface TokenSpec {
	group: TokenGroup;
	kind: TokenKind;
	/** May take another value under `.dark`. */
	schemes?: true;
	/** A grey: its chroma is multiplied by `--tint`, so `data-tint="neutral"` can take it to 0. */
	tinted?: true;
	/** contract.css gives it a value, so a village may leave it out. */
	default?: true;
	/** contract.css computes it from other tokens: a village leaves it alone. */
	derived?: true;
}

export const contract = {
	/* The default nature's hue, for a top-level scope of the village. */
	"--nature-hue": { group: "accent", kind: "hue" },

	"--radius": { group: "shape", kind: "length" },
	"--control-radius": { group: "shape", kind: "length" },
	"--pill-radius": { group: "shape", kind: "length", default: true },
	"--check-radius": { group: "shape", kind: "length", default: true },
	"--badge-radius": { group: "shape", kind: "length", default: true },
	"--border-width": { group: "shape", kind: "length" },

	"--font-body": { group: "type", kind: "font" },
	"--font-heading": { group: "type", kind: "font" },
	"--font-code": { group: "type", kind: "font" },
	"--display-tracking": { group: "type", kind: "length" },
	"--heading-case": { group: "type", kind: "keyword", default: true },

	"--control-sm": { group: "controls", kind: "length" },
	"--control-md": { group: "controls", kind: "length" },
	"--control-lg": { group: "controls", kind: "length" },
	"--control-px": { group: "controls", kind: "length" },
	"--input-px": { group: "controls", kind: "length", default: true },
	"--control-font": { group: "controls", kind: "font", default: true },
	"--control-text": { group: "controls", kind: "length", default: true },
	"--control-text-sm": { group: "controls", kind: "length", default: true, derived: true },
	"--control-text-lg": { group: "controls", kind: "length", default: true, derived: true },
	"--control-weight": { group: "controls", kind: "number", default: true },
	"--control-tracking": { group: "controls", kind: "length", default: true },
	"--control-case": { group: "controls", kind: "keyword", default: true },
	"--indicator-sm": { group: "controls", kind: "length", default: true },
	"--indicator-md": { group: "controls", kind: "length", default: true },
	"--indicator-lg": { group: "controls", kind: "length", default: true },

	"--focus-width": { group: "focus", kind: "length", default: true },
	"--focus-offset": { group: "focus", kind: "length", default: true },
	"--ring-alpha": { group: "focus", kind: "percentage", schemes: true, default: true },

	"--press-scale": { group: "press", kind: "number", default: true },
	"--press-offset": { group: "press", kind: "length", default: true },
	"--press-shadow": { group: "press", kind: "shadow", schemes: true, default: true },
	"--press-x": { group: "press", kind: "length", default: true },
	"--press-y": { group: "press", kind: "length", default: true },

	"--motion-fast": { group: "motion", kind: "time" },
	"--motion-base": { group: "motion", kind: "time" },
	"--motion-slow": { group: "motion", kind: "time" },
	"--motion-ease-out": { group: "motion", kind: "easing" },
	"--motion-ease-in-out": { group: "motion", kind: "easing" },

	"--background": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--foreground": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--card": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--card-foreground": {
		group: "colour",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},
	"--popover": { group: "colour", kind: "color", schemes: true, tinted: true, default: true },
	"--popover-foreground": {
		group: "colour",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},
	"--secondary": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--secondary-foreground": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--muted": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--muted-foreground": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--accent": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--accent-foreground": {
		group: "colour",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},
	"--destructive": { group: "colour", kind: "color", schemes: true },
	"--destructive-foreground": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--destructive-text": { group: "colour", kind: "color", schemes: true, default: true },
	"--border": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--input": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--overlay": { group: "colour", kind: "color", schemes: true, tinted: true },
	"--tooltip": { group: "colour", kind: "color", schemes: true, tinted: true, default: true },
	"--tooltip-foreground": {
		group: "colour",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},

	"--input-bg": { group: "fields", kind: "color", schemes: true, tinted: true, default: true },
	"--input-shadow": { group: "fields", kind: "shadow", schemes: true, tinted: true, default: true },
	"--field-filled": { group: "fields", kind: "color", schemes: true, tinted: true, default: true },
	"--field-filled-hover": {
		group: "fields",
		kind: "color",
		schemes: true,
		default: true,
		derived: true,
	},
	"--field-filled-edge": {
		group: "fields",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},

	"--tabs-list": { group: "tabs", kind: "color", schemes: true, tinted: true, default: true },
	"--tabs-list-padding": { group: "tabs", kind: "length", default: true },
	"--tab-active": { group: "tabs", kind: "color", schemes: true, tinted: true, default: true },
	"--tab-active-foreground": {
		group: "tabs",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},
	"--tab-active-shadow": {
		group: "tabs",
		kind: "shadow",
		schemes: true,
		tinted: true,
		default: true,
	},

	"--highlight": { group: "lists", kind: "color", schemes: true, tinted: true, default: true },
	"--highlight-foreground": {
		group: "lists",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},

	"--control-border": {
		group: "states",
		kind: "color",
		schemes: true,
		tinted: true,
		default: true,
	},
	"--control-track": { group: "states", kind: "color", schemes: true, tinted: true, default: true },

	"--switch-track": { group: "tracks", kind: "color", schemes: true, tinted: true, default: true },
	"--switch-thumb": { group: "tracks", kind: "color", schemes: true, tinted: true, default: true },
	"--track-border": { group: "tracks", kind: "color", schemes: true, tinted: true, default: true },
	"--track-scale": { group: "tracks", kind: "number", default: true },

	/* The primary: the nature gives the hue, the village its strength and the text on it. */
	"--primary-l": { group: "accent", kind: "number", schemes: true },
	"--primary-c": { group: "accent", kind: "number", schemes: true },
	"--on-primary": { group: "accent", kind: "color", schemes: true, tinted: true },
	"--tone-text-l": { group: "accent", kind: "number", schemes: true, default: true },
	"--primary-border-l": { group: "accent", kind: "number", schemes: true, default: true },
	"--soft-alpha": { group: "accent", kind: "percentage", schemes: true, default: true },
	"--soft-edge-alpha": { group: "accent", kind: "percentage", schemes: true, default: true },

	"--success-hue": { group: "status", kind: "hue", default: true },
	"--warning-hue": { group: "status", kind: "hue", default: true },
	"--info-hue": { group: "status", kind: "hue", default: true },
	"--status-l": { group: "status", kind: "number", schemes: true, default: true },
	"--status-c": { group: "status", kind: "number", schemes: true, default: true },
	"--on-status": { group: "status", kind: "color", schemes: true, tinted: true, default: true },
	"--warning-l": { group: "status", kind: "number", schemes: true, default: true },
	"--warning-c": { group: "status", kind: "number", schemes: true, default: true },
	"--on-warning": { group: "status", kind: "color", schemes: true, default: true },
	"--warning-text-l": { group: "status", kind: "number", schemes: true, default: true },
	"--warning-text-c": { group: "status", kind: "number", schemes: true, default: true },
	"--success": { group: "status", kind: "color", default: true, derived: true },
	"--success-foreground": { group: "status", kind: "color", default: true, derived: true },
	"--success-text": { group: "status", kind: "color", default: true, derived: true },
	"--success-soft": { group: "status", kind: "color", default: true, derived: true },
	"--success-border": { group: "status", kind: "color", default: true, derived: true },
	"--warning": { group: "status", kind: "color", default: true, derived: true },
	"--warning-foreground": { group: "status", kind: "color", default: true, derived: true },
	"--warning-text": { group: "status", kind: "color", default: true, derived: true },
	"--warning-soft": { group: "status", kind: "color", default: true, derived: true },
	"--warning-border": { group: "status", kind: "color", default: true, derived: true },
	"--info": { group: "status", kind: "color", default: true, derived: true },
	"--info-foreground": { group: "status", kind: "color", default: true, derived: true },
	"--info-text": { group: "status", kind: "color", default: true, derived: true },
	"--info-soft": { group: "status", kind: "color", default: true, derived: true },
	"--info-border": { group: "status", kind: "color", default: true, derived: true },
	"--destructive-soft": { group: "status", kind: "color", default: true, derived: true },
	"--destructive-border": { group: "status", kind: "color", default: true, derived: true },
	"--neutral": { group: "status", kind: "color", default: true, derived: true },
	"--neutral-foreground": { group: "status", kind: "color", default: true, derived: true },
	"--neutral-text": { group: "status", kind: "color", default: true, derived: true },
	"--neutral-soft": { group: "status", kind: "color", default: true, derived: true },
	"--neutral-border": { group: "status", kind: "color", default: true, derived: true },

	"--chart-l": { group: "chart", kind: "number", schemes: true },
	"--chart-c": { group: "chart", kind: "number", schemes: true },

	"--elevation-sm": { group: "depth", kind: "shadow", schemes: true, tinted: true },
	"--elevation-md": { group: "depth", kind: "shadow", schemes: true, tinted: true },
	"--elevation-lg": { group: "depth", kind: "shadow", schemes: true, tinted: true },
	"--thumb-shadow": { group: "depth", kind: "shadow", schemes: true, tinted: true, default: true },
	/* The lip (Kusa): a solid edge under controls and surfaces, that they sink into when pressed. */
	"--lip": { group: "depth", kind: "length", default: true },
	"--lip-shade": { group: "depth", kind: "percentage", schemes: true, default: true },
	"--lip-edge": { group: "depth", kind: "color", schemes: true, tinted: true, default: true },
	"--surface-blur": { group: "depth", kind: "length", default: true },
	"--texture": { group: "depth", kind: "image", schemes: true, tinted: true, default: true },

	"--skeleton-fill": {
		group: "loading",
		kind: "paint",
		schemes: true,
		tinted: true,
		default: true,
	},
	"--skeleton-motion": { group: "loading", kind: "animation", default: true },
} as const satisfies Record<string, TokenSpec>;

export type Token = keyof typeof contract;

/** The tokens every village must set: those contract.css gives no value. */
export const requiredTokens = (Object.keys(contract) as Token[]).filter((token) => !("default" in contract[token]));
