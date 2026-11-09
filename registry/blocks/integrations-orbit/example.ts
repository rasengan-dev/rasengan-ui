import type { IntegrationsOrbitContent } from "./schema";

const mark = (name: string) => ({ name: name[0].toUpperCase() + name.slice(1), src: `/placeholders/logo-${name}.svg`, width: 96, height: 96 });

export const example: IntegrationsOrbitContent = {
	eyebrow: "Integrations",
	title: "Works with the tools you already use",
	subline: "Senbon sends invoices out, brings payments in and keeps your books in step, without copy and paste.",
	product: { name: "Senbon" },
	integrations: [
		{ name: "Orbel", logo: mark("orbel"), category: "Accounting" },
		{ name: "Vantra", logo: mark("vantra"), category: "Payments" },
		{ name: "Kelvo", logo: mark("kelvo"), category: "CRM" },
		{ name: "Nimbra", logo: mark("nimbra"), category: "File storage" },
		{ name: "Tolva", logo: mark("tolva"), category: "Calendar" },
		{ name: "Zephly", logo: mark("zephly"), category: "Team chat" },
	],
	cta: { label: "See all integrations", href: "/integrations" },
	labels: { pause: "Pause the orbit" },
};
