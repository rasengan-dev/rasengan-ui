import { ArrowRight, Dot } from "lucide-react";
import { Button } from "../ui/button";
import ComponentPreview from "./component-preview";

export default function ComponentItem() {
	return (
		<section className='w-full h-auto'>
			{/* Header Info */}
			<div className='flex items-center justify-between p-2'>
				<div className='flex items-center gap-1'>
					<h2 className='text-foreground text-sm'>Tiny Text Input</h2>
					{/* <h2 className='text-foreground text-sm'>Hero Section with Image</h2> */}
					<Dot className='text-foreground' />
					<span className='text-foreground/70 text-sm'>
						{/* Marketing & Business */}
						Application UI
					</span>
				</div>

				<div>
					<Button size='sm' variant='outline' className='text-foreground/70'>
						<span className='text-sm'>See more</span>
						<ArrowRight size={16} />
					</Button>
				</div>
			</div>

			{/* Component Preview */}
			<div className='w-full'>
				<ComponentPreview />
			</div>
		</section>
	);
}
