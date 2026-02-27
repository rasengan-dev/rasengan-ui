export const productsList = [
	{
		id: 633656,
		name: "Templates Pack",
		description:
			"Unlock the full power of Rasengan UI with all templates in one purchase.",
		image: "",
		price: 149.99,
		newPrice: 30,
		currency: "EUR",
		symbol: "€",
		duration: "lifetime access",
		pricing: "one-time",
		isPopular: false,
		features: {
			description: "Everything you need to build world-class UIs:",
			items: [
				"All templates included",
				"Responsive design out of the box",
				"Dark mode support",
				"Lifetime license for v1.x",
				"Commercial use included",
				"One-time payment (no subscription)",
				"Free updates",
			],
		},
		link: "https://rasengan-ui.mychariow.shop/templates-pack",
		isActive: true,
		discount: {
			percentage: 40,
			duration: "1 month",
			code: "RASENGANUI40",
		},
		children: [],
	},
];

export const templateProductsList = [
	{
		id: 1,
		name: "Levelup",
		slug: "levelup",
		heading: "Personal website template",
		description:
			"Stunning and cute portfolio website to showcase your work online.",
		images: [
			"/static/images/templates/levelup1/1.png",
			"/static/images/templates/levelup1/2.png",
		],
		preview: "https://rasengan-ui-levelup.vercel.app",
		price: 36,
		newPrice: 19,
		currency: "EUR",
		symbol: "€",
		duration: "lifetime access",
		pricing: "one-time",
		isPopular: false,
		features: {
			description:
				"Stunning and cute portfolio website to showcase your work online.",
			items: ["Unlimited projects", "Free updates", "Simple .zip file"],
		},
		link: "https://rasengan-ui.mychariow.shop/levelup",
		isActive: true,
	},
	{
		id: 2,
		name: "Plus Ultra",
		slug: "plus-ultra",
		heading: "Personal website template",
		description:
			"Developer portfolio to showcase your work and experience in your domain.",
		inspiration: {
			name: "Valery Melou",
			url: "https://valerymelou.com",
		},
		images: [
			"/static/images/templates/plus-ultra/1.png",
			"/static/images/templates/plus-ultra/2.png",
		],
		preview: "https://rasengan-ui-plus-ultra.vercel.app",
		price: 36,
		newPrice: 19,
		currency: "EUR",
		symbol: "€",
		duration: "lifetime access",
		pricing: "one-time",
		isPopular: false,
		features: {
			description:
				"Stunning and cute portfolio website to showcase your work online.",
			items: ["Unlimited projects", "Free updates", "Simple .zip file"],
		},
		link: "https://rasengan-ui.mychariow.shop/plus-ultra",
		isActive: true,
	},
	{
		id: 3,
		name: "Kira Board",
		slug: "kira-board",
		heading: "Kanban board template",
		description:
			"A beautiful kanban board template to manage your tasks and projects.",
		images: [
			"/static/images/templates/kira-board/1.png",
			"/static/images/templates/kira-board/2.png",
		],
		preview: "https://rasengan-ui-kira-board.vercel.app",
		price: 0,
		currency: "EUR",
		symbol: "€",
		duration: "lifetime access",
		pricing: "one-time",
		isPopular: false,
		features: {
			description:
				"A beautiful kanban board template to manage your tasks and projects.",
			items: ["Unlimited projects", "Free updates", "Open source"],
		},
		link: "https://github.com/rasengan-dev/kira-board-template",
		isActive: true,
	},
];

export type Template = (typeof templateProductsList)[0];