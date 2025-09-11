import { SidebarBanner } from "@/components/common/layout/sidebar-banner";
import ComponentItem from "@/components/features/component-item";
import { PageComponent, useParams } from "rasengan";
import { useComponentStore } from "@/store/components";
import { useMemo } from "react";
import { ComponentCategoryLabel, ComponentType } from "@/data/components/type";

const Page: PageComponent = () => {
	const { components } = useComponentStore();

	const {
		category,
		group: groupName,
		type: typeName,
		component: componentName,
	} = useParams();

	const { component } = useMemo(() => {
		// Get components by categories
		const componentsByCategory = components[category as ComponentCategoryLabel];

		// Find the current group component list
		const componentsByGroup = componentsByCategory.components.find(
			(group) => group.label === groupName
		);

		if (componentsByGroup) {
			// Find the current type component list
			const componentsByType: ComponentType | undefined =
				componentsByGroup.componentsType.find(
					(type) => type.label === typeName
				);

			if (componentsByType) {
				// Find the current component
				const component = componentsByType.components.find(
					(component) => component.label === componentName
				);

				if (component) {
					return { component };
				}
			}
		}

		return { component: null };
	}, [components, category, groupName, typeName, componentName]);

	if (!component) {
		return null;
	}

	return (
		<section className='relative h-screen w-screen overflow-hidden'>
			<iframe src={`${component.link}`} className='w-full h-full'></iframe>
		</section>
	);
};

Page.metadata = {
	title: "Preview Component",
	description: "Preview Component",
};

export default Page;
