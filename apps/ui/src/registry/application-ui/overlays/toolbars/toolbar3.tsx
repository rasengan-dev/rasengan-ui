import { Button } from "@/components/ui/button";
import {
	Braces,
	CalendarPlus,
	FileInput,
	Headphones,
	Info,
	Link2,
	Megaphone,
	MessageSquareText,
	ScreenShare,
	Video,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export const Toolbar3 = () => {
	const { isDark } = useTheme();

	return (
		<div
			className={cn(
				"min-h-[250px] rounded-full border border-border px-2 py-2 bg-background dark:bg-input/40 flex flex-col justify-between items-center gap-2",
				isDark ? "dark" : ""
			)}
		>
			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn("text-foreground rounded-full")}
						>
							<MessageSquareText />
						</Button>
					</TooltipTrigger>
					<TooltipContent alignOffset={20} side='left' sideOffset={20}>
						<span>Add note</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn("text-foreground rounded-full")}
						>
							<Info />
						</Button>
					</TooltipTrigger>
					<TooltipContent alignOffset={20} side='left' sideOffset={20}>
						<span>Info</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<span className='block w-4 h-[1px] bg-border'></span>

			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger>
						<Button size='icon' variant='ghost' className='text-foreground'>
							<Headphones />
						</Button>
					</TooltipTrigger>
					<TooltipContent alignOffset={20} side='left' sideOffset={20}>
						<span>Add Audio</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Popover>
				<PopoverTrigger>
					<Button size='icon' variant='ghost' className='text-foreground'>
						<Video />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					side='left'
					sideOffset={20}
					align='end'
					className={cn(isDark ? "dark" : "")}
				>
					<img
						src='/static/images/illustrations/3.jpeg'
						className='w-full h-auto rounded-md'
					/>

					<p className='text-sm text-foreground/70 mt-2 w-full'>
						Start a video call with your team mates in one click
					</p>

					<div className='mt-2 flex justify-between w-full'>
						<div className='relative w-[70px] h-8'>
							{/* avatars list with overlay */}
							<img
								src='/static/images/avatars/1.jpeg'
								className='size-6 rounded-full absolute left-0 top-1/2 -translate-y-1/2'
							/>
							<img
								src='/static/images/avatars/2.jpeg'
								className='size-6 rounded-full absolute left-4 top-1/2 -translate-y-1/2'
							/>
							<img
								src='/static/images/avatars/3.jpeg'
								className='size-6 rounded-full absolute left-8 top-1/2 -translate-y-1/2'
							/>
							<img
								src='/static/images/avatars/5.jpeg'
								className='size-6 rounded-full absolute left-12 top-1/2 -translate-y-1/2'
							/>
						</div>

						<Button>Start Call</Button>
					</div>
				</PopoverContent>
			</Popover>

			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className='text-foreground rounded-full'
						>
							<Megaphone />
						</Button>
					</TooltipTrigger>
					<TooltipContent alignOffset={20} side='left' sideOffset={20}>
						<span>Announce</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export function ToolbarMenu({ children }: { children: React.ReactNode }) {
	const { isDark } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn("w-56 mb-3", isDark ? "dark" : "")}
				align='center'
			>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<FileInput size={18} />
							<span>Share File</span>
						</div>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Link2 size={18} />
							<span>Open Link</span>
						</div>

						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Braces size={18} />
							<span>Embed Tool</span>
						</div>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<CalendarPlus size={18} />
							<span>Add Agenda</span>
						</div>
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<ScreenShare size={18} />
							<span>Share Screen</span>
						</div>
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
