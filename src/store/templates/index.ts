import { Template, templateProductsList } from "@/data/products";
import { create } from "zustand";

type State = {
	templates: Template[];
};

type Actions = {
	getTemplate: (name: string) => Template | undefined;
};

export const useTemplateStore = create<State & Actions>((_, get) => ({
	templates: templateProductsList,

	getTemplate: (name: string) => {
		return get().templates.find((template) => template.slug === name);
	},
}));
