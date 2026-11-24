import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "waitlist",
	title: "Waitlist",
	family: "marketing",
	category: "waitlist",
	status: "beta",
	added: "2026-11-24",
	summary: "A centred card to join a waitlist: a pill, the promise, the email field, the people already waiting, and its states.",
	useWhen: "A product before launch, or a private beta, collecting addresses through a waitlist provider or your own code.",
	avoidWhen: "A product people can already sign up for: use a sign-up call to action.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 3, minWords: 15, maxWords: 80 },
	components: ["badge", "button", "field", "input", "number-roll"],
	pairsWith: ["changelog", "logos-grid"],
} as const satisfies BlockMeta;
