import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

export const Notification1 = () => {
	return (
		<article className='w-full md:w-[450px] rounded-lg border border-border p-4 bg-background dark:bg-input/40 flex justify-between items-start gap-4'>
			<div className='flex items-start gap-4'>
				<CheckCircle className='text-green-400' size={20} />
				<div>
					<span className='block font-medium text-foreground'>
						Successfully saved!
					</span>
					<span className='block text-foreground/70 text-sm'>
						Anyone with a link can now view this file. Close
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
