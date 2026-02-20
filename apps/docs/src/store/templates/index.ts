import { Template, templateProductsList } from "@/data/products";
import { createStore } from "@rasenganjs/kurama";

type State = {
	templates: Template[];
};

type Actions = {
	getTemplate: (name: string) => Template | undefined;
};

export const useTemplateStore = createStore<State & Actions>((_, get) => ({
	templates: templateProductsList,

	getTemplate: (name: string) => {
		return get().templates.find((template) => template.slug === name);
	},
}));
