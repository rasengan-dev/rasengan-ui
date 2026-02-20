import { Button } from "@/components/ui/button";
import { ArrowUp, Mic, Paperclip } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Props = {
	placeholder?: string;
	className?: ComponentProps<"div">["className"];
	value?: string;
};

export const Input2 = ({ placeholder, className, value }: Props) => {
	return (
		<div
			className={cn(
				"relative rounded-3xl border max-w-[600px] w-full h-auto bg-background dark:bg-input/70 mx-auto",
				className
			)}
		>
			<div
				contentEditable
				data-placeholder={placeholder}
				className='w-full min-h-[75px] max-h-[200px] h-auto peer empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:block empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
				// dangerouslySetInnerHTML={{ __html: value || "" }}
			></div>
			<div className='flex items-center justify-between px-2'>
				<div className='p-2 py-3 absolutef left-2 bottom-2 text-muted-foreground'>
					<Select>
						<SelectTrigger className='rounded-xl w-[140px] text-[12px]'>
							<SelectValue placeholder='Select a source' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='1'>Facebook</SelectItem>
							<SelectItem value='2'>Twitter</SelectItem>
							<SelectItem value='3'>Instagram</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className='flex items-center gap-2'>
					<Button
						className='rounded-xl text-[12px] px-3 size-8 h-auto sm:size-auto sm:h-8 text-foreground'
						variant='outline'
					>
						<Paperclip size={18} />
						<span className='hidden sm:block'>Attach</span>
					</Button>
					<Button
						className='rounded-xl text-[12px] px-3 size-8 h-auto sm:size-auto sm:h-8 text-foreground'
						variant='outline'
					>
						<Mic size={18} />
						<span className='hidden sm:block'>Voice</span>
					</Button>
					<Button
						className='rounded-xl text-[12px] px-3 size-8 h-auto sm:size-auto sm:h-8'
						variant='default'
					>
						<ArrowUp size={18} />
						<span className='hidden sm:block'>Send</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
