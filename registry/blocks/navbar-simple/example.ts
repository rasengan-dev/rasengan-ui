import type { NavbarSimpleContent } from "./schema";

export const example: NavbarSimpleContent = {
	brand: { name: "Senbon", href: "/" },
	links: [
		{ label: "Features", href: "#features" },
		{ label: "Pricing", href: "#pricing" },
		{ label: "Customers", href: "#testimonials" },
		{ label: "FAQ", href: "#faq" },
	],
	menuLabel: "Menu",
	secondary: { label: "Sign in", href: "/login" },
	primary: { label: "Start free", href: "/signup" },
};
