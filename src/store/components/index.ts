import { componentsData } from "@/data/components";
import {
	Component,
	ComponentCategory,
	ComponentCategoryLabel,
} from "@/data/components/type";
import { create } from "zustand";

type State = {
	components: {
		[K in ComponentCategoryLabel]: ComponentCategory;
	};
};

type Actions = {
	getPopularComponents: () => {
		category: string;
		categoryLabel: ComponentCategoryLabel;
		components: Component[];
		groupName: string;
		typeLabel: string;
	}[];
};

export const useComponentStore = create<State & Actions>((_, get) => ({
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
			groupName: string;
			typeLabel: string;
			components: Component[];
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
									components: [component],
									groupName: group.label,
									typeLabel: type.label,
								});
							} else {
								popularComponents[categoryIndex].components.push(component);
							}
						}
					}
				}
			}
		}

		return popularComponents;
	},
}));
