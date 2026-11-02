/** Brand colours in, OKLCH out (RFC-0006, "The engine", step 2). */

export interface Lch {
	l: number;
	c: number;
	h: number;
}

const toLinear = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);

/** sRGB channels, 0 to 1, to OKLCH (Björn Ottosson's matrices). */
export function srgbToOklch(r: number, g: number, b: number): Lch {
	const [R, G, B] = [r, g, b].map(toLinear);
	const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
	const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
	const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
	const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
	const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
	const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
	const c = Math.hypot(a, bb);
	return { l: L, c, h: c < 1e-4 ? 0 : ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 };
}

/** `#rgb`, `#rrggbb`, `rgb(r g b)` / `rgb(r, g, b)` or `oklch(L C H)`; undefined for anything else. */
export function parseColor(input: string): Lch | undefined {
	const value = input.trim().toLowerCase();
	const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
	if (hex) {
		const digits = hex[1].length === 3 ? [...hex[1]].map((d) => d + d) : hex[1].match(/../g)!;
		const [r, g, b] = digits.map((d) => parseInt(d, 16) / 255);
		return srgbToOklch(r, g, b);
	}
	const rgb = value.match(/^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})\s*(?:[,/][^)]*)?\)$/);
	if (rgb) {
		const [r, g, b] = rgb.slice(1, 4).map((d) => Number(d) / 255);
		return r > 1 || g > 1 || b > 1 ? undefined : srgbToOklch(r, g, b);
	}
	const oklch = value.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/[^)]*)?\)$/);
	if (oklch) {
		const l = Number(oklch[1]) / (oklch[2] ? 100 : 1);
		return l > 1 ? undefined : { l, c: Number(oklch[3]), h: Number(oklch[4]) % 360 };
	}
	return undefined;
}

/** A number as a village file writes it: no float noise, no trailing zeros. */
export const num = (n: number, digits = 4) => String(Math.round(n * 10 ** digits) / 10 ** digits);
