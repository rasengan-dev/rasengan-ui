import { NavigationLink, NavigationSection } from "@/components/features/docs/layouts/sidebar";
import { componentsData } from "@/data/components";
import {
	Component,
	ComponentCategory,
	ComponentCategoryLabel,
} from "@/data/components/type";
import { capitalize } from "@/lib/utils";
import { createStore } from "@rasenganjs/kurama";

type State = {
	components: {
		[K in ComponentCategoryLabel]: ComponentCategory;
	};
};

type Actions = {
	getPopularComponents: () => {
		category: string;
		categoryLabel: ComponentCategoryLabel;
		components: {
			component: Component;
			groupName: string;
			typeLabel: string;
		}[];
	}[];

	getNavigation: () => NavigationSection[],

	getCompoment: (label: string) => Component,
};

export const useComponentStore = createStore<State & Actions>((_, get) => ({
	components: componentsData,

	// Actions

	/**
	 * Get popular components
	 * @returns { category: string; components: Component[] }[]
	 */
	getPopularComponents: () => {
		const categories = get().components;

		const popularComponents: {
			category: string;
			categoryLabel: ComponentCategoryLabel;
			components: {
				component: Component;
				groupName: string;
				typeLabel: string;
			}[];
		}[] = [];

		for (const [, category] of Object.entries(categories)) {
			for (const group of category.components) {
				for (const type of group.componentsType) {
					for (const component of type.components) {
						if (component.isPopular) {
							// Check if the category already exists
							const categoryIndex = popularComponents.findIndex(
								(c) => c.category === category.name
							);

							if (categoryIndex === -1) {
								popularComponents.push({
									category: category.name,
									categoryLabel: category.label,
									components: [
										{
											component,
											groupName: group.label,
											typeLabel: type.label,
										},
									],
								});
							} else {
								popularComponents[categoryIndex].components.push({
									component,
									groupName: group.label,
									typeLabel: type.label,
								});
							}
						}
					}
				}
			}
		}

		return popularComponents;
	},

	getNavigation: () => {
		const categories = get().components;
		const navigationSections: NavigationSection[] = [];

		// Add Getting Started section
		navigationSections.push({
			title: "Getting Started",
			items: [
				{ label: "Overview", to: "/docs", level: 1 },
				{ label: "Installation", to: "/docs/installation", level: 1 },
			]
		});

		// Add Components section
		const componentsSection: NavigationSection = {
			title: "Components",
			items: []
		};

		// Add components to the Components section
		for (const [categoryLabel, category] of Object.entries(categories)) {
			for (const group of category.components) {
				for (const type of group.componentsType) {
					componentsSection.items.push({
						label: capitalize(type.name),
						// label: capitalize(component.label.replace(/-/g, " ")),
						to: `/docs/components/${categoryLabel}/${type.label}`,
						level: 3
					});
				}
			}
		}

		// Sort the component list asc by alpha numeric order
		componentsSection.items.sort((a, b) => a.label.localeCompare(b.label));

		navigationSections.push(componentsSection);

		// Add Resources section
		navigationSections.push({
			title: "Resources",
			items: [
				{ label: "Roadmap", to: "/docs/resources/roadmap", level: 1 },
				{ label: "Changelog", to: "/docs/resources/changelog", level: 1 },
				{ label: "FAQ", to: "/docs/resources/faq", level: 1 },
			]
		});

		return navigationSections;
	},

	getCompoment(label) {
		const categories = get().components;

		for (const [categoryLabel, category] of Object.entries(categories)) {
			for (const group of category.components) {
				for (const type of group.componentsType) {
					const component = type.components.find(comp => comp.label === label);
					if (component) return component;
				}
			}
		}

		throw new Error(`Component with label "${label}" not found`);
	}
}));
