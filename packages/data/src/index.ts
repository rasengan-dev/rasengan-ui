import { getApplicationUIComponents } from "./components/application-ui";
import { getMarketingComponents } from "./components/marketing";
import {
	componentCategories,
	ComponentCategory,
	ComponentCategoryLabel,
} from "./type";

export const getComponentsData = (registryURL: string) => {
	const componentsData: {
		[K in ComponentCategoryLabel]: ComponentCategory;
	} = {
		// MARKETING and BUSINESS Components
		[componentCategories.MARKETING]: {
			label: componentCategories.MARKETING,
			name: "Marketing & Business",
			description: `Channel your chakra into landing pages, hero sections, pricing blocks, testimonials, and CTAs.
	Built to help you share your vision, capture leads, and grow your brand — faster than a Rasengan strike.`,
			components: getMarketingComponents(registryURL),
		},
	
		// APPLICATION UI Components
		[componentCategories.APPLICATION_UI]: {
			label: componentCategories.APPLICATION_UI,
			name: "Application UI",
			description: `Ready-to-use dashboards, settings panels, navbars, and content layouts.
	Seamlessly drop them into your React app to create polished user experiences that flow with your design system.`,
			components: getApplicationUIComponents(registryURL),
		},
	
		// ECOMMERCE Components
		// 	[componentCategories.ECOMMERCE]: {
		// 		label: componentCategories.ECOMMERCE,
		// 		name: "Ecommerce",
		// 		description: `Product showcases, feature sections, pricing tables, and checkout-ready blocks.
		// Crafted to convert, styled to impress — so you can focus on scaling your shop, not building it from scratch.`,
		// 		components: [],
		// 	},
	};

	return componentsData;
}

