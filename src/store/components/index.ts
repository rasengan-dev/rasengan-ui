import { componentsData } from "@/data/components";
import {
	ComponentCategory,
	ComponentCategoryLabel,
} from "@/data/components/type";
import { create } from "zustand";

type State = {
	components: {
		[K in ComponentCategoryLabel]: ComponentCategory;
	};
};

export const useComponentStore = create<State>(() => ({
	components: componentsData,
}));
