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
import { useMemo, useState } from "react";
import SidebarNavigation from "./sidebar";
import { AnimatePresence, motion } from "motion/react";

export const SidebarBanner = () => {
	const [open, setOpen] = useState(false);

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
		<div className='w-full relative'>
			<div className='relative z-30 h-15 w-full border-b-[1px] border-b-border bg-background px-4 flex items-center gap-4'>
				<Button
					size={"icon"}
					variant={"ghost"}
					className='text-foreground/70'
					onClick={() => setOpen(!open)}
				>
					<AlignLeft />
				</Button>

				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to='/ui-components'>Components</Link>
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

			<motion.div
				className='fixed bottom-0 left-0 top-[120px] bg-background z-30'
				animate={{ x: open ? 0 : "-100%" }}
				// exit={{ x: open ? 0 : -100 }}
			>
				<SidebarNavigation onClose={() => setOpen(false)} />
			</motion.div>

			<AnimatePresence>
				{open && (
					<motion.div
						className='fixed inset-0 bg-black/80 backdrop-blur-mdf z-20'
						animate={{ opacity: open ? 1 : 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={() => setOpen(false)}
					></motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
