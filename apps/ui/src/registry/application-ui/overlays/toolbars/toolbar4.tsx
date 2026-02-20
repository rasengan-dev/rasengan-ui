import { Button } from "@/components/ui/button";
import {
	Brush,
	Circle,
	Flag,
	Hexagon,
	ImagePlus,
	LineChart,
	Lock,
	Shapes,
	Square,
	Trash,
	Triangle,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export const Toolbar4 = () => {
	const { isDark } = useTheme();

	return (
		<div className='flex items-center gap-2'>
			<div className='min-w-[180px] rounded-md border border-border p-1 bg-background dark:bg-input/40 flex justify-between items-center gap-1'>
				<Popover>
					<PopoverTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn("text-foreground")}
						>
							<Shapes />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align='center'
						alignOffset={20}
						sideOffset={20}
						className={cn(
							"rounded-3xl shadow-md grid grid-cols-3 gap-2 p-4",
							isDark && "dark"
						)}
					>
						<div className='flex flex-col items-center justify-center gap-2 cursor-pointer text-foreground/70 hover:border hover:bg-accent aspect-square rounded-xl'>
							<Square size={20} />
							<span className='text-xs'>Square</span>
						</div>
						<div className='flex flex-col items-center justify-center gap-2 cursor-pointer text-foreground/70 hover:border hover:bg-accent aspect-square rounded-xl'>
							<Circle size={20} />
							<span className='text-xs'>Circle</span>
						</div>
						<div className='flex flex-col items-center justify-center gap-2 cursor-pointer text-foreground/70 hover:border hover:bg-accent aspect-square rounded-xl'>
							<Triangle size={20} />
							<span className='text-xs'>Triangle</span>
						</div>
						<div className='flex flex-col items-center justify-center gap-2 cursor-pointer text-foreground/70 hover:border hover:bg-accent aspect-square rounded-xl'>
							<Hexagon size={20} />
							<span className='text-xs'>Hexagon</span>
						</div>
						<div className='flex flex-col items-center justify-center gap-2 cursor-pointer text-foreground/70 hover:border hover:bg-accent aspect-square rounded-xl'>
							<LineChart size={20} />
							<span className='text-xs'>Line</span>
						</div>
						<div className='flex flex-col items-center justify-center gap-2 cursor-pointer text-foreground/70 hover:border hover:bg-accent aspect-square rounded-xl'>
							<ImagePlus size={20} />
							<span className='text-xs'>Image</span>
						</div>
					</PopoverContent>
				</Popover>

				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger disabled>
							<Button
								size='icon'
								variant='ghost'
								className={cn("text-foreground/50")}
							>
								<Brush />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<span>Add Frame</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger disabled>
							<Button
								size='icon'
								variant='ghost'
								className={cn("text-foreground/50")}
							>
								<Flag />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<span>Selector</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger disabled>
							<Button
								size='icon'
								variant='ghost'
								className='text-foreground/50'
							>
								<Trash />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<span>Delete</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className='rounded-md border border-border p-1 bg-background dark:bg-input/40 flex justify-between items-center gap-1'>
				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger disabled>
							<Button
								size='icon'
								variant='ghost'
								className={cn("text-foreground")}
							>
								<Lock />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<span>Lock File</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};
