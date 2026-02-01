import { Button } from "@/components/ui/button";
import {
	ChevronDown,
	Ellipsis,
	ImagePlus,
	Mic,
	Plus,
	Send,
	Sparkles,
	Video,
	File,
	Map,
	Music,
	Timer,
} from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@rasenganjs/theme";

type Props = {
	placeholder?: string;
	className?: ComponentProps<"div">["className"];
};

export const Input5 = ({ placeholder, className }: Props) => {
	const { isDark } = useTheme();

	return (
		<div
			className={cn(
				"relative rounded-2xl border max-w-[600px] w-full h-auto bg-background dark:bg-input/70 mx-auto",
				className
			)}
		>
			<div
				contentEditable
				data-placeholder={placeholder}
				className='w-full min-h-[55px] max-h-[200px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
			></div>
			<div className='flex items-center justify-between px-1 border-t border-t-border'>
				<div className='p-2 text-muted-foreground flex gap-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className='rounded-md text-[12px] px-3 text-foreground'
								variant='outline'
								size={"icon"}
							>
								<Plus size={18} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={cn("w-56", isDark && "dark")}
							align='start'
						>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<div className='flex items-center gap-2'>
										<ImagePlus size={18} />
										<span>Add photos or Video</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className='flex items-center gap-2'>
										<File size={18} />
										<span>Add Document</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className='flex items-center gap-2'>
										<Map size={18} />
										<span>Add Location</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className='flex items-center gap-2'>
										<Music size={18} />
										<span>Add Audio</span>
									</div>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button
									className='rounded-md text-[12px] px-3 text-foreground'
									variant='ghost'
									size={"icon"}
								>
									<Mic size={18} />
								</Button>
							</TooltipTrigger>
							<TooltipContent side='top'>Record voice</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className='hidden sm:block'>
								<Button
									className='rounded-md text-[12px] px-3 text-foreground'
									variant='ghost'
									size={"icon"}
								>
									<Video size={18} />
								</Button>
							</TooltipTrigger>
							<TooltipContent side='top'>Upload a video</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button
									className='rounded-md text-[12px] px-3 text-foreground'
									variant='ghost'
									size={"icon"}
								>
									<Sparkles size={18} />
								</Button>
							</TooltipTrigger>
							<TooltipContent side='top'>Use AI</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button
									className='rounded-md text-[12px] px-3 text-foreground'
									variant='ghost'
									size={"icon"}
								>
									<Ellipsis size={18} />
								</Button>
							</TooltipTrigger>
							<TooltipContent side='top'>More Actions</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className='flex items-center gap-2'>
					<Button
						className='rounded-md text-[12px] px-3 text-foreground'
						variant='ghost'
						size={"icon"}
					>
						<Send size={18} />
					</Button>
					<div className='w-[1px] h-4 bg-primary/20'></div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className='rounded-md text-[12px] px-3 text-foreground'
								variant='ghost'
								size={"icon"}
							>
								<ChevronDown size={18} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={cn("w-56", isDark && "dark")}
							align='start'
						>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<div className='flex items-center gap-2'>
										<Send size={18} />
										<span>Send</span>
									</div>
									<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className='flex items-center gap-2'>
										<Timer size={18} />
										<span>Schedule</span>
									</div>
									<DropdownMenuShortcut>⇧⌘K</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};
