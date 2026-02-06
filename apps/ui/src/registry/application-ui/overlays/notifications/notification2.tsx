import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const Notification2 = () => {
	return (
		<article className='w-full md:w-[400px] rounded-lg border border-border p-4 bg-background dark:bg-input/40 flex justify-between items-center gap-4'>
			<div className='flex items-center gap-4'>
				<div>
					<span className='block font-medium text-foreground'>
						Successfully saved!
					</span>
				</div>
			</div>
			<div>
				<Button size={"icon"} variant={"ghost"} className='text-foreground'>
					<X />
				</Button>
			</div>
		</article>
	);
};
