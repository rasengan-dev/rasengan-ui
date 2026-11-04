/**
 * A recipe in a link (RFC-0006, "The workshop"): `https://ui.rasengan.dev/villages/create#r=<base64url JSON>`. The hash
 * never reaches a server, so nothing is stored; the CLI decodes it locally (`village create --from <link>`).
 */
import type { Recipe } from "./recipe.ts";

export const WORKSHOP_URL = "https://ui.rasengan.dev/villages/create";

const toBase64Url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromBase64Url = (text: string) => Uint8Array.from(atob(text.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

export function recipeLink(recipe: Recipe, base = WORKSHOP_URL): string {
	const { $schema, ...rest } = recipe;
	return `${base}#r=${toBase64Url(new TextEncoder().encode(JSON.stringify(rest)))}`;
}

/** The recipe in a workshop link, or undefined when the link carries none. Throws on a damaged one. */
export function recipeFromLink(link: string): unknown {
	const hash = link.match(/#(?:.*&)?r=([^&]*)/);
	if (!hash) return undefined;
	try {
		return JSON.parse(new TextDecoder().decode(fromBase64Url(hash[1])));
	} catch {
		throw new Error("The link's recipe is damaged: copy the whole link from the workshop again.");
	}
}
