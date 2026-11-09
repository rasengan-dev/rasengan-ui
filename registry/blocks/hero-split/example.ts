import type { HeroSplitContent } from "./schema";

export const example: HeroSplitContent = {
	eyebrow: "Invoicing for small studios",
	headline: "Get paid for the work, not the paperwork",
	subline: "Senbon writes your invoices, takes cards, transfers and mobile money, and chases late payers so you never have to.",
	primary: { label: "Start free", href: "/signup" },
	secondary: { label: "Book a demo", href: "/demo" },
	chips: [
		{ value: "94%", label: "invoices paid on time" },
		{ value: "2 days", label: "from payment to your bank" },
		{ value: "12k", label: "studios and freelancers" },
	],
	image: { src: "/placeholders/person-founder.svg", alt: "A studio owner in a yellow blazer, smiling, holding a tablet.", width: 600, height: 750 },
};
