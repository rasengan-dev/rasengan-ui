import { ArrowRight, Dot } from "lucide-react";
import { Button } from "../ui/button";
import ComponentPreview from "./component-preview";
import { Component, ComponentCategoryLabel } from "@/data/components/type";
import { Link } from "rasengan";

type Props = {
	component: Component;
	category: string;
	categoryLabel: ComponentCategoryLabel;
	groupName: string;
	typeLabel: string;
	disableSeeMore?: boolean;
};

export default function ComponentItem({
	component,
	category,
	categoryLabel,
	groupName,
	typeLabel,
	disableSeeMore = false,
}: Props) {
	return (
		<section className='w-full h-auto'>
			{/* Header Info */}
			<div className='flex flex-col gap-2 md:flex-row md:items-center justify-between p-2'>
				<div className='flex flex-row flex-wrap sm:items-center gap-1'>
					<h2 className='text-foreground text-sm'>{component.name}</h2>
					{/* <h2 className='text-foreground text-sm'>Hero Section with Image</h2> */}
					<Dot className='text-foreground hiddenf sm:block' />
					<span className='text-foreground/70 text-sm'>{category}</span>
				</div>

				<div>
					{!disableSeeMore && (
						<Link to={`/components/${categoryLabel}/${groupName}/${typeLabel}`}>
							<Button
								size='sm'
								variant='outline'
								className='text-foreground/70'
							>
								<span className='text-sm'>See more</span>
								<ArrowRight size={16} />
							</Button>
						</Link>
					)}
				</div>
			</div>

			{/* Component Preview */}
			<div className='w-full'>
				<ComponentPreview
					component={component}
					category={categoryLabel}
					group={groupName}
					type={typeLabel}
				/>
			</div>
		</section>
	);
}
