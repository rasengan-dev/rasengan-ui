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
	X,
	Users,
	User,
	Network,
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

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const Input6 = ({ placeholder, className }: Props) => {
	const { isDark } = useTheme();

	return (
		<div
			className={cn(
				"relative rounded-2xl border max-w-[800px] w-full h-auto bg-background dark:bg-input/70 mx-auto",
				className
			)}
		>
			<div className='w-full min-h-12 flex items-center justify-between rounded-t-2xl p-2 border-b-[1px] border-b-border'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div
							className={cn(
								"flex items-center gap-2 hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition-all duration-300"
							)}
						>
							<div className='size-[30px]'>
								<img
									src={`${registryUrl}/static/images/avatars/3.jpeg`}
									alt='avatar'
									className='size-[30px] aspect-square rounded-full'
									width={30}
									height={30}
								/>
							</div>

							<div className='flex flex-col items-start'>
								<span className='text-foreground text-sm break-keep text-nowrap'>
									Dilane Kombou
								</span>
								<span className='text-foreground text-[12px] break-keep text-nowrap'>
									visibility: Everyone
								</span>
							</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className={cn("w-56", isDark && "dark")}
						align='start'
					>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className='flex items-center gap-2'>
									<Users size={18} />
									<span>Everyone</span>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className='flex items-center gap-2'>
									<User size={18} />
									<span>Only Me</span>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className='flex items-center gap-2'>
									<Network size={18} />
									<span>My Contacts</span>
								</div>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>

				<div className='flex items-center gap-2'>
					<Button variant='ghost' size='icon' className='text-foreground/70'>
						<X size={18} />
					</Button>
				</div>
			</div>

			<section className='relative'>
				<div
					contentEditable
					data-placeholder={placeholder}
					className='w-full min-h-[300px] max-h-[200px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
				></div>
			</section>
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
										<span>Add photos</span>
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
