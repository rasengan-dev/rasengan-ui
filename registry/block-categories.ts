/**
 * The block families and categories (RFC-0008, "Categories"; RFC-0009 adds integrations, comparison, booking, offers and
 * team, and contact for marketing; RFC-0013 adds the portfolio family with projects, case-study, awards and experience),
 * in the order the site lists them. Every block's meta.ts names a family, or several,
 * and a category of each; `pnpm registry` refuses anything else.
 */
export const blockFamilies = {
	marketing: { title: "Marketing", description: "Sections for product and startup landing pages." },
	storefront: { title: "Storefront", description: "Sections for local businesses: menus, services, hours, ordering." },
	portfolio: { title: "Portfolio", description: "Sections for people and studios showing their work: projects, case studies, awards." },
} as const;

export type BlockFamily = keyof typeof blockFamilies;

export const blockCategories = {
	navbar: { title: "Navbars", families: ["marketing", "storefront", "portfolio"] },
	hero: { title: "Heroes", families: ["marketing", "storefront", "portfolio"] },
	logos: { title: "Logos", families: ["marketing"] },
	features: { title: "Features", families: ["marketing"] },
	bento: { title: "Bento grids", families: ["marketing"] },
	steps: { title: "Steps", families: ["marketing", "portfolio"] },
	showcase: { title: "Showcases", families: ["marketing"] },
	integrations: { title: "Integrations", families: ["marketing"] },
	comparison: { title: "Comparison", families: ["marketing"] },
	stats: { title: "Stats", families: ["marketing"] },
	menu: { title: "Menus", families: ["storefront"] },
	services: { title: "Services", families: ["storefront"] },
	booking: { title: "Booking", families: ["storefront"] },
	offers: { title: "Offers", families: ["storefront"] },
	projects: { title: "Projects", families: ["portfolio"] },
	"case-study": { title: "Case studies", families: ["portfolio"] },
	gallery: { title: "Galleries", families: ["storefront", "portfolio"] },
	awards: { title: "Awards", families: ["portfolio"] },
	experience: { title: "Experience", families: ["portfolio"] },
	hours: { title: "Opening hours", families: ["storefront"] },
	location: { title: "Location", families: ["storefront"] },
	order: { title: "Ordering", families: ["storefront"] },
	about: { title: "About", families: ["storefront"] },
	team: { title: "Team", families: ["marketing", "storefront", "portfolio"] },
	testimonials: { title: "Testimonials", families: ["marketing", "storefront", "portfolio"] },
	pricing: { title: "Pricing", families: ["marketing"] },
	faq: { title: "FAQ", families: ["marketing"] },
	cta: { title: "Calls to action", families: ["marketing"] },
	newsletter: { title: "Newsletter", families: ["marketing"] },
	contact: { title: "Contact", families: ["marketing", "storefront", "portfolio"] },
	footer: { title: "Footers", families: ["marketing", "storefront", "portfolio"] },
} as const satisfies Record<string, { title: string; families: readonly BlockFamily[] }>;

export type BlockCategory = keyof typeof blockCategories;
