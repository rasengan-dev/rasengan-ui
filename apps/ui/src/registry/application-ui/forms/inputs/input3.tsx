import { Button } from "@/components/ui/button";
import { Paperclip, Send, Smile } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = {
	placeholder?: string;
	className?: ComponentProps<"div">["className"];
};

export const Input3 = ({ placeholder, className }: Props) => {
	return (
		<div
			className={cn(
				"relative rounded-xl flex items-end border max-w-[600px] w-full h-auto bg-background dark:bg-input/70 mx-auto",
				className
			)}
		>
			<div
				contentEditable
				data-placeholder={placeholder}
				className='w-full min-h-[50px] max-h-[200px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
			></div>
			<div className='flex items-center justify-between p-2 gap-2 min-h-[55px]'>
				<Button
					variant={"ghost"}
					size={"icon"}
					className='rounded-lg text-foreground/70'
				>
					<Smile size={18} />
				</Button>

				<Button
					variant={"ghost"}
					size={"icon"}
					className='rounded-lg text-foreground/70'
				>
					<Paperclip size={18} />
				</Button>

				<Button size={"icon"} className='rounded-lg'>
					<Send size={18} />
				</Button>
			</div>
		</div>
	);
};
