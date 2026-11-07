/**
 * The block families and categories (RFC-0008, "Categories"), in the order the site lists them. Every block's meta.ts
 * names a family and one of that family's categories; `pnpm registry` refuses anything else.
 */
export const blockFamilies = {
	marketing: { title: "Marketing", description: "Sections for product and startup landing pages." },
	storefront: { title: "Storefront", description: "Sections for local businesses: menus, services, hours, ordering." },
} as const;

export type BlockFamily = keyof typeof blockFamilies;

export const blockCategories = {
	navbar: { title: "Navbars", families: ["marketing", "storefront"] },
	hero: { title: "Heroes", families: ["marketing", "storefront"] },
	logos: { title: "Logos", families: ["marketing"] },
	features: { title: "Features", families: ["marketing"] },
	bento: { title: "Bento grids", families: ["marketing"] },
	steps: { title: "Steps", families: ["marketing"] },
	showcase: { title: "Showcases", families: ["marketing"] },
	stats: { title: "Stats", families: ["marketing"] },
	menu: { title: "Menus", families: ["storefront"] },
	services: { title: "Services", families: ["storefront"] },
	gallery: { title: "Galleries", families: ["storefront"] },
	hours: { title: "Opening hours", families: ["storefront"] },
	location: { title: "Location", families: ["storefront"] },
	order: { title: "Ordering", families: ["storefront"] },
	about: { title: "About", families: ["storefront"] },
	testimonials: { title: "Testimonials", families: ["marketing", "storefront"] },
	pricing: { title: "Pricing", families: ["marketing"] },
	faq: { title: "FAQ", families: ["marketing"] },
	cta: { title: "Calls to action", families: ["marketing"] },
	newsletter: { title: "Newsletter", families: ["marketing"] },
	contact: { title: "Contact", families: ["storefront"] },
	footer: { title: "Footers", families: ["marketing", "storefront"] },
} as const satisfies Record<string, { title: string; families: readonly BlockFamily[] }>;

export type BlockCategory = keyof typeof blockCategories;
