import { Link, PageComponent, useParams } from "rasengan";
import { useComponentStore } from "@/store/components";
import { useMemo, useState } from "react";
import { ComponentCategoryLabel, ComponentType } from "@/data/components/type";
import { Button } from "@/components/ui/button";
import { ArrowRight, Laptop, Laptop2, Lock, Phone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeButton from "@/components/common/atoms/theme-button";

const Page: PageComponent = () => {
	const { components } = useComponentStore();

	const [isMobile, setIsMobile] = useState(false);

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
		<section className='bg-background relative h-screen w-screen overflow-hidden p-4'>
			<div className='flex h-[3rem] items-center justify-between'>
				<div>
					<div className='text-foreground flex gap-1'>
						<span>{category}</span>
						{"/"}
						<span>{groupName}</span>
						{"/"}
						<span>{typeName}</span>
						{"/"}
						<span>{componentName}</span>
					</div>
					<span className='text-muted-foreground text-sm'>
						{component.name}
					</span>
				</div>

				<div>
					<div className='flex items-center gap-2'>
						<Button
							size='icon'
							variant='outline'
							onClick={() => setIsMobile(false)}
							className={cn(
								"text-foreground",
								!isMobile &&
									"bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground dark:hover:bg-primary/80 dark:hover:text-primary-foreground"
							)}
						>
							<Laptop2 />
						</Button>
						<Button
							size='icon'
							variant='outline'
							onClick={() => {
								setIsMobile(true);
							}}
							className={cn(
								"text-foreground",
								isMobile &&
									"bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground dark:hover:bg-primary/80 dark:hover:text-primary-foreground"
							)}
						>
							<Tablet />
						</Button>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<Link to='/pricing' className='w-full sm:w-auto'>
						<Button
							className='w-full sm:w-auto'
							// variant='outline'
						>
							<Lock />
							<span>Get Code</span>
						</Button>
					</Link>
					<ThemeButton />
				</div>
			</div>
			<div className='w-full h-[calc(100vh-6rem)] overflow-hiddenf'>
				<iframe
					src={`${component.link}?view=preview`}
					className={`${
						isMobile ? "w-[375px] h-[667px] scale-95" : "w-full h-full"
					} border border-border rounded-lg mt-4 mx-auto transition-all duration-300`}
				></iframe>
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Preview Component",
	description: "Preview Component",
};

export default Page;
