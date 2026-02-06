import AppLogo from "@/components/common/atoms/app-logo";
import {
	Bell,
	ChevronLeft,
	CircleCheck,
	House,
	Info,
	MessagesSquare,
	Package2,
	Palette,
	RefreshCcw,
	Settings,
	ShieldCheck,
	ThumbsUp,
	TrendingUp,
	Users,
	Users2,
} from "lucide-react";
import { ComponentProps, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Image from "@rasenganjs/image";
import ProfileDropdown from "@/components/common/molecules/dropdowns/profile-dropdown";

const sidebarData = [
	{
		title: "Menu",
		shortTile: "Menu",
		children: [
			{
				label: "Home",
				icon: <House size={20} />,
				link: "#",
				active: true,
			},
			{
				label: "Tasks",
				icon: <CircleCheck size={20} />,
				link: "#",
				active: false,
				badge: {
					value: 2,
					color: "#F1323B",
				},
			},
			{
				label: "Activities",
				icon: <TrendingUp size={20} />,
				link: "#",
				active: false,
			},
			{
				label: "Users",
				icon: <Users2 size={20} />,
				link: "#",
				active: false,
			},
			{
				label: "Notifications",
				icon: <Bell size={20} />,
				link: "#",
				active: false,
				badge: {
					value: 54,
					color: "#F1323B",
				},
			},
		],
	},

	{
		title: "CONTENT",
		shortTile: "CONTENT",
		children: [
			{
				label: "Groups",
				icon: <Users size={20} />,
				link: "#",
				active: false,
				badge: {
					value: 24,
					color: "#F1323B",
				},
			},
			{
				label: "Discussions",
				icon: <MessagesSquare size={20} />,
				link: "#",
				active: false,
				badge: {
					value: 12,
					color: "#F1323B",
				},
			},
		],
	},

	{
		title: "CUSTOMIZATION",
		shortTile: "CUSTOM.",
		children: [
			{
				label: "Settings",
				icon: <Settings size={20} />,
				link: "#",
				active: false,
			},
			{
				label: "Supports",
				icon: <Info size={20} />,
				link: "#",
				active: false,
			},
		],
	},
];

type Props = {
	className?: ComponentProps<"aside">["className"];
};

export const Sidebar2 = ({ className }: Props) => {
	const [expanded, setExpanded] = useState(true);

	return (
		<aside
			className={twMerge(
				"relative h-full shrink-0 flex flex-col border-r border-border border-dashed bg-background transition-all duration-300",
				className,
				expanded ? "w-[280px]" : "w-[80px]"
			)}
		>
			<div
				className={twMerge(
					"p-4 relative border-b border-b-border h-[70px]",
					!expanded && "flex items-center justify-center"
				)}
			>
				<AppLogo size='sm' minimal={!expanded} />

				<Button
					variant={"outline"}
					size={"icon"}
					onClick={() => setExpanded((prev) => !prev)}
					className='size-8 absolute -right-4 top-1/2 -translate-y-1/2 rounded-full'
				>
					<ChevronLeft
						className={twMerge(
							"text-foreground transition-all",
							!expanded && "rotate-180"
						)}
					/>
				</Button>
			</div>

			<div className='flex flex-col gap-8 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-0'>
				{sidebarData.map((group, index) => (
					<div
						key={index}
						className={twMerge("flex flex-col", !expanded && "items-center")}
					>
						<h2
							className={twMerge(
								"text-[12px] text-muted-foreground ml-3",
								!expanded && "ml-0"
							)}
						>
							{expanded ? group.title : group.shortTile}
						</h2>

						<div
							className={twMerge(
								"mt-4 flex flex-col gap-2",
								!expanded && "items-center"
							)}
						>
							{group.children.map((item, index) =>
								expanded ? (
									<SidebarItem key={index} item={item} expanded={expanded} />
								) : (
									<TooltipProvider key={index}>
										<Tooltip>
											<TooltipTrigger>
												<SidebarItem item={item} expanded={expanded} />
											</TooltipTrigger>
											<TooltipContent side='right'>{item.label}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)
							)}
						</div>

						{sidebarData.length - 1 > index && (
							<div className='w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mt-4'></div>
						)}
					</div>
				))}
			</div>

			<div className='px-4 w-full mt-auto flex items-center shrink-0 overflow-hidden  h-[70px] border-t border-b-border'>
				<ProfileDropdown>
					<div
						className={twMerge(
							"w-full flex items-center gap-2 hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition-all duration-300",
							expanded ? "h-12" : "size-12"
						)}
					>
						<div className='size-[30px]'>
							<Image
								src={"/static/images/avatars/1.jpeg"}
								alt='avatar'
								className='size-[30px] aspect-square rounded-full'
								width={30}
								height={30}
							/>
						</div>

						{expanded && (
							<div className='flex flex-col items-start'>
								<span className='text-foreground text-sm break-keep text-nowrap'>
									Dilane Kombou
								</span>
								<span className='text-foreground text-[12px] break-keep text-nowrap'>
									@dilane_3
								</span>
							</div>
						)}
					</div>
				</ProfileDropdown>
			</div>
		</aside>
	);
};

const SidebarItem = ({
	item,
	expanded,
}: {
	item: {
		label: string;
		icon: ReactNode;
		link: string;
		active: boolean;
		badge?: { value: number; color: string };
	};
	expanded: boolean;
}) => {
	return (
		<div
			className={twMerge(
				"relative flex items-center h-12 gap-2 text-muted-foreground py-2 px-3 rounded-lg cursor-pointer transition-all duration-300 break-keep text-nowrap",
				item.active
					? "bg-[#ECEEFD] dark:bg-[#ECEEFD]/5 text-[#4461D0]"
					: "hover:bg-[#ECEEFD] hover:dark:bg-[#ECEEFD]/5 hover:text-[#4461D0]",
				!expanded && "size-12 p-0 justify-center"
			)}
		>
			<div>{item.icon}</div>

			{expanded && (
				<div className={twMerge("flex items-center gap-2")}>
					<span className='font-medium text-sm'>{item.label}</span>
					{item.badge && (
						<span className='font-medium rounded-full px-2 py-0 text-[12px] bg-[#F1323B]/20 dark:bg-[#F1323B] text-[#F1323B] dark:text-foreground'>
							{item.badge.value}
						</span>
					)}
				</div>
			)}

			{item.badge && !expanded && (
				<span
					className='block absolute top-2 right-2 size-3 rounded-full border-3 border-background'
					style={{ backgroundColor: item.badge.color }}
				></span>
			)}
		</div>
	);
};
