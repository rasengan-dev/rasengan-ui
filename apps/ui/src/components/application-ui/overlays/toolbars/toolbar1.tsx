import { Button } from "@/components/ui/button";
import {
	Braces,
	CalendarPlus,
	FileInput,
	Grid2X2Plus,
	Hand,
	Link2,
	LogOut,
	Mic,
	MicOff,
	ScreenShare,
	Video,
	VideoOff,
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";

export const Toolbar1 = () => {
	const [videoOpen, setVideoOpen] = useState(false);
	const [micOpen, setMicOpen] = useState(false);
	const [handOpen, setHandOpen] = useState(false);

	return (
		<div className='min-w-[250px] rounded-full border border-border px-2 py-2 bg-background dark:bg-input/40 flex justify-between items-center gap-2'>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn(
								"text-foreground rounded-full",
								!videoOpen &&
									"bg-red-400 hover:bg-red-400/70 hover:text-white text-white"
							)}
							onClick={() => setVideoOpen(!videoOpen)}
						>
							{videoOpen ? <Video /> : <VideoOff />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>{videoOpen ? "Disable video" : "Enable video"}</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn(
								"text-foreground rounded-full",
								handOpen &&
									"bg-red-400 hover:bg-red-400/70 hover:text-white text-white"
							)}
							onClick={() => setHandOpen(!handOpen)}
						>
							<Hand />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>{handOpen ? "Lower hand" : "Raise hand"}</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<ToolbarMenu>
				<Button size='icon' variant='ghost' className='text-foreground'>
					<Grid2X2Plus />
				</Button>
			</ToolbarMenu>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn(
								"text-foreground rounded-full",
								!micOpen &&
									"bg-red-400 hover:bg-red-400/70 hover:text-white text-white"
							)}
							onClick={() => setMicOpen(!micOpen)}
						>
							{micOpen ? <Mic /> : <MicOff />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>{micOpen ? "Mute" : "Unmute"}</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<span className='block h-4 w-[1px] bg-border'></span>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className='text-foreground rounded-full'
						>
							<LogOut />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>Leave the call</span>
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
