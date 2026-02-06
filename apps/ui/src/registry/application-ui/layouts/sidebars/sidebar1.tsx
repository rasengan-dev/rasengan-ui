import AppLogo from "@/components/common/atoms/app-logo";
import {
	LayoutDashboard,
	NotebookPen,
	Package2,
	Palette,
	RefreshCcw,
	ShieldCheck,
	ThumbsUp,
	TrendingUp,
} from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarData = [
	{
		title: "ANALYTICS",
		shortTile: "ANALYTICS",
		children: [
			{
				label: "Dashboard",
				icon: <LayoutDashboard size={20} />,
				link: "#",
				active: true,
			},
			{
				label: "Performance",
				icon: <TrendingUp size={20} />,
				link: "#",
				active: false,
			},
		],
	},
	{
		title: "CONTENT",
		shortTile: "CONTENT",
		children: [
			{
				label: "Guides",
				icon: <NotebookPen size={20} />,
				link: "#",
				active: false,
			},
			{
				label: "Hotspots",
				icon: <RefreshCcw size={20} />,
				link: "#",
				active: false,
				badge: {
					value: 4,
					color: "#F1323B",
				},
			},
			{
				label: "Checklists",
				icon: <ShieldCheck size={20} />,
				link: "#",
				active: false,
			},
			{
				label: "Feedbacks",
				icon: <ThumbsUp size={20} />,
				link: "#",
				active: false,
			},
		],
	},

	{
		title: "CUSTOMIZATION",
		shortTile: "CUSTOM.",
		children: [
			{
				label: "Segments",
				icon: <Package2 size={20} />,
				link: "#",
				active: false,
				badge: {
					value: 24,
					color: "#F1323B",
				},
			},
			{
				label: "Themes",
				icon: <Palette size={20} />,
				link: "#",
				active: false,
			},
		],
	},
];

type Props = {
	className?: ComponentProps<"aside">["className"];
	expanded?: boolean;
};

export const Sidebar1 = ({ className, expanded = true }: Props) => {
	return (
		<aside
			className={twMerge(
				"relative h-full flex flex-col border-r p-4 border-border border-dashed bg-background transition-all duration-300 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-0",
				className,
				expanded ? "w-[280px]" : "w-[80px]"
			)}
		>
			<div
				className={twMerge(
					"pb-4 border-b border-b-border",
					!expanded && "flex items-center justify-center"
				)}
			>
				<AppLogo size='sm' minimal={!expanded} />
			</div>

			<div className='mt-6 flex flex-col gap-8'>
				{sidebarData.map((group) => (
					<div
						className={twMerge("flex flex-col", !expanded && "items-center")}
					>
						<h2
							className={twMerge(
								"text-[11px] text-muted-foreground ml-3",
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
							{group.children.map((item) =>
								expanded ? (
									<SidebarItem item={item} expanded={expanded} />
								) : (
									<TooltipProvider>
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
					</div>
				))}
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
