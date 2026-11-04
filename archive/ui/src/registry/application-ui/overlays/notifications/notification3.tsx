import { Button } from "@/components/ui/button";
import { Archive, Trash, Undo, X } from "lucide-react";

export const Notification3 = () => {
	return (
		<article className='w-full md:w-[450px] rounded-lg border border-border p-4 bg-background dark:bg-input/40 flex justify-between items-start gap-4'>
			<div className='flex items-start gap-4'>
				<Archive className='text-foreground/70' size={28} />
				<div>
					<span className='block font-medium text-foreground'>
						Discussion moved
					</span>
					<span className='block text-foreground/70 text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum
						tenetur.
					</span>
					<div className='mt-4 flex gap-4'>
						<Button variant={"outline"} className='text-foreground'>
							<Undo />
							<span>Undo</span>
						</Button>

						<Button
							variant={"outline"}
							className='text-red-500 dark:text-red-300 hover:text-red-600 hover:dark-tex-red-400'
						>
							<Trash />
							<span>Dismiss</span>
						</Button>
					</div>
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
