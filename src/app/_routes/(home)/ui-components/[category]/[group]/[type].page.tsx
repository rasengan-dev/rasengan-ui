import { SidebarBanner } from "@/components/common/layout/sidebar-banner";
import ComponentItem from "@/components/features/ui-components/component-item";
import {
	PageComponent,
	useLocation,
	useParams,
	useSearchParams,
} from "rasengan";
import { useComponentStore } from "@/store/components";
import { useEffect, useMemo } from "react";
import { ComponentCategoryLabel, ComponentType } from "@/data/components/type";

const Page: PageComponent = () => {
	const { components } = useComponentStore();

	const { category, group: groupName, type: typeName } = useParams();
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (typeof window === undefined) return;

		(() => {
			console.log(hash);
			const compomentItemElement = document.getElementById(hash.slice(1));

			if (compomentItemElement) {
				compomentItemElement.scrollIntoView({ behavior: "smooth" });
			}
		})();
	}, [hash]);

	const { componentsList } = useMemo(() => {
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
				return { componentsList: componentsByType };
			}
		}

		return { componentsList: null };
	}, [components, category, groupName, typeName]);

	if (!componentsList) {
		return null;
	}

	return (
		<section className='relative'>
			<div id='top'></div>

			<div className='fixed inset-x-0 top-15 z-20'>
				<SidebarBanner />
			</div>

			<div className='p-4 w-full border-b-[1px] border-b-border flex flex-col gap-4 pt-24'>
				<h1 className='text-[50px] lg:text-[60px] leading-[60px] text-start max-w-[700px] text-foreground text-pretty'>
					{componentsList.name}
				</h1>
				<p className='max-w-[700px] text-start mt-2 text-foreground text-pretty'>
					{componentsList.description}
				</p>
			</div>

			<div className='w-full'>
				{componentsList.components.map((component) => (
					<ComponentItem
						key={component.label}
						component={component}
						category={components[category as ComponentCategoryLabel].name}
						categoryLabel={category as ComponentCategoryLabel}
						groupName={groupName || ""}
						typeLabel={typeName || ""}
						disableSeeMore
					/>
				))}
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Marketing - Page Section - Hero",
	description: "Rasengan UI components",
};

export default Page;
