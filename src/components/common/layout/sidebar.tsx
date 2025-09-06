import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "rasengan";
import { ComponentCategoryLabel, ComponentType } from "@/data/components/type";
import { useComponentStore } from "@/store/components";
import { useMemo } from "react";

export const SidebarBanner = () => {
	const { components } = useComponentStore();

	const {
		category: categoryLabel,
		group: groupName,
		type: typeName,
	} = useParams();

	const { type, category } = useMemo(() => {
		// Get components by categories
		const componentsByCategory =
			components[categoryLabel as ComponentCategoryLabel];

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
				return {
					type: componentsByType.name,
					category: componentsByCategory.name,
				};
			}
		}

		return { type: "", category: "" };
	}, [components, categoryLabel, groupName, typeName]);

	return (
		<div className='h-15 w-full border-b-[1px] border-b-border bg-background/80 backdrop-blur-md px-4 flex items-center gap-4'>
			<Button size={"icon"} variant={"ghost"} className='text-foreground/70'>
				<AlignLeft />
			</Button>

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='/components'>Components</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<span>{category}</span>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{type}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};
