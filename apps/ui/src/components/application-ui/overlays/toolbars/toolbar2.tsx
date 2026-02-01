import { Button } from "@/components/ui/button";
import {
	Braces,
	CalendarPlus,
	ChevronDown,
	ChevronRight,
	Circle,
	Contact,
	Ellipsis,
	FileInput,
	Frame,
	Grid2X2Plus,
	Hand,
	ImagePlus,
	Link2,
	LogOut,
	MessageSquareText,
	Mic,
	MicOff,
	MousePointer,
	MousePointerClick,
	Scan,
	ScreenShare,
	Shapes,
	Square,
	Trash,
	Triangle,
	Upload,
	UserPlus,
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
	DropdownMenuSeparator,
	DropdownMenuLabel,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";

export const Toolbar2 = () => {
	return (
		<div className='min-w-[250px] rounded-md border border-border p-1 bg-background dark:bg-input/40 flex justify-between items-center gap-1'>
			<ShapeMenu>
				<Button size='icon' variant='ghost' className={cn("text-foreground")}>
					<Shapes />
				</Button>
			</ShapeMenu>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn("text-foreground")}
						>
							<Frame />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>Add Frame</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size='icon'
							variant='ghost'
							className={cn("text-foreground")}
						>
							<Scan />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>Selector</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<ToolbarMenu>
				<Button size='icon' variant='ghost' className='text-foreground'>
					<Ellipsis />
				</Button>
			</ToolbarMenu>

			<span className='block h-[32px] w-[1px] bg-border'></span>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button size='icon' variant='ghost' className='text-foreground'>
							<img
								src='/static/images/avatars/4.jpeg'
								className='size-6 rounded-full'
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>Your profile</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<span className='block h-[32px] w-[1px] bg-border'></span>

			<InviteMenu>
				<Button variant='outline' className='px-2 py-0'>
					<div className='flex items-center gap-2'>
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

						<ChevronDown className='text-foreground' />
					</div>
				</Button>
			</InviteMenu>
		</div>
	);
};

export function ToolbarMenu({ children }: { children: React.ReactNode }) {
	const { isDark } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn("w-56 mt-2", isDark ? "dark" : "")}
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
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<div className='flex items-center gap-2 text-red-600/70'>
						<Trash size={18} />
						<span>Delete File</span>
					</div>
					<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function InviteMenu({ children }: { children: React.ReactNode }) {
	const { isDark } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn("w-56 mt-2", isDark ? "dark" : "")}
				align='start'
			>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Button size='icon' variant='outline' className='size-8'>
								<MousePointerClick size={18} />
							</Button>
							<span>Everyone follow me</span>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Button size='icon' variant='outline' className='size-8'>
								<MessageSquareText size={18} />
							</Button>
							<span>Start group chat</span>
						</div>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel className='text-xs font-medium text-foreground/50'>
						COLLABORATORS
					</DropdownMenuLabel>

					{/* Collaborators */}
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<div className='flex w-full items-center justify-between gap-2 text-foreground/70'>
								<div className='flex items-center gap-2 text-foreground/70'>
									<img
										src='/static/images/avatars/4.jpeg'
										className='size-6 rounded-full'
									/>
									<span>John Doe</span>
								</div>
								{/* <ChevronRight size={18} /> */}
							</div>
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent className='mx-3 w-[200px]'>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<div className='flex items-center gap-2 text-foreground/70'>
										<Button size='icon' variant='outline' className='size-8'>
											<MousePointer size={18} />
										</Button>
										<span>Follow me</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className='flex items-center gap-2 text-foreground/70'>
										<Button size='icon' variant='outline' className='size-8'>
											<MessageSquareText size={18} />
										</Button>
										<span>Private chat</span>
									</div>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<div className='flex items-center gap-2 text-foreground/70'>
									<Button size='icon' variant='outline' className='size-8'>
										<Contact size={18} />
									</Button>
									<span>John Doe's Profile</span>
								</div>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<div className='flex w-full items-center justify-between gap-2 text-foreground/70'>
								<div className='flex items-center gap-2 text-foreground/70'>
									<img
										src='/static/images/avatars/5.jpeg'
										className='size-6 rounded-full'
									/>
									<span>Carine</span>
								</div>
								{/* <ChevronRight size={18} /> */}
							</div>
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent className='mx-3 w-[200px]'>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<div className='flex items-center gap-2 text-foreground/70'>
										<Button size='icon' variant='outline' className='size-8'>
											<MousePointer size={18} />
										</Button>
										<span>Follow me</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className='flex items-center gap-2 text-foreground/70'>
										<Button size='icon' variant='outline' className='size-8'>
											<MessageSquareText size={18} />
										</Button>
										<span>Private chat</span>
									</div>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<div className='flex items-center gap-2 text-foreground/70'>
									<Button size='icon' variant='outline' className='size-8'>
										<Contact size={18} />
									</Button>
									<span>Carine's Profile</span>
								</div>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<div className='flex w-full items-center justify-between gap-2 text-foreground/70'>
								<div className='flex items-center gap-2 text-foreground/70'>
									<img
										src='/static/images/avatars/6.jpeg'
										className='size-6 rounded-full'
									/>
									<span>Leo</span>
								</div>
								{/* <ChevronRight size={18} /> */}
							</div>
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent className='mx-3 w-[200px]'>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<div className='flex items-center gap-2 text-foreground/70'>
										<Button size='icon' variant='outline' className='size-8'>
											<MousePointer size={18} />
										</Button>
										<span>Follow me</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className='flex items-center gap-2 text-foreground/70'>
										<Button size='icon' variant='outline' className='size-8'>
											<MessageSquareText size={18} />
										</Button>
										<span>Private chat</span>
									</div>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<div className='flex items-center gap-2 text-foreground/70'>
									<Button size='icon' variant='outline' className='size-8'>
										<Contact size={18} />
									</Button>
									<span>Leo's Profile</span>
								</div>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>

					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Button size='icon' variant='outline' className='size-8'>
								<UserPlus size={18} />
							</Button>
							<span>Invite more people</span>
						</div>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function ShapeMenu({ children }: { children: React.ReactNode }) {
	const { isDark } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn("w-56 mt-2", isDark ? "dark" : "")}
				align='end'
			>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Button size='icon' variant='outline' className='size-8'>
								<Circle size={18} />
							</Button>

							<span>Circle</span>
						</div>
						<DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Button size='icon' variant='outline' className='size-8'>
								<Square size={18} />
							</Button>
							<span>Square</span>
						</div>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center gap-2 text-foreground/70'>
							<Button size='icon' variant='outline' className='size-8'>
								<Triangle size={18} />
							</Button>
							<span>Triangle</span>
						</div>
						<DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<div className='flex items-center gap-2 text-foreground/70'>
						<Button size='icon' variant='outline' className='size-8'>
							<ImagePlus size={18} />
						</Button>
						<span>Image</span>
					</div>
					<DropdownMenuShortcut>⇧⌘I</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
