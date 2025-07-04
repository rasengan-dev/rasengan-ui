export const componentCategories = {
	MARKETING: "marketing",
	APPLICATION_UI: "application-ui",
	ECOMMERCE: "ecommerce",
} as const;

export type ComponentCategoryLabel =
	(typeof componentCategories)[keyof typeof componentCategories];

export type ComponentCategory = {
	label: ComponentCategoryLabel;
	name: string;
	description: string;
	components: ComponentGroup[];
};

export type ComponentGroup = {
	label: string; // eg. page-section
	name: string;
	componentsType: ComponentType[];
};

export type ComponentType = {
	label: string; // eg. heroes
	name: string;
	description: string;
	image: string;
	components: Component[];
};

export type Component = {
	label: string;
	name: string;
	link: string;
	code?: string;
	height?: number;
	isDarkEnabled: boolean;
	pricing: "free" | "premium";
};
