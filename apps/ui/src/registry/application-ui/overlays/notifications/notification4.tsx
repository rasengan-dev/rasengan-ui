import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";

export const Notification4 = () => {
	return (
		<article className='w-full md:w-[400px] rounded-lg border border-border p-4 bg-background dark:bg-input/40 flex justify-between items-center gap-4'>
			<div className='flex items-center gap-4'>
				<div className='flex gap-4 items-center'>
					<img
						src='/static/images/avatars/1.jpeg'
						className='size-10 rounded-full'
					/>
					<div>
						<span className='block font-medium text-foreground'>
							Dilane Kombou
						</span>
						<span className='block font-medium text-foreground/70'>
							Hello world
						</span>
					</div>
				</div>
			</div>
			<div>
				<Button className=''>
					<Reply />
					<span>Reply</span>
				</Button>
			</div>
		</article>
	);
};
