import { Button } from "@/components/ui/button";
import { NavigationData, NavigationItem } from "@/data/components/navigation";
import { ChevronDown, FlaskConical, Rocket, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "rasengan";
import { ComponentProps, Fragment, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	className?: ComponentProps<"aside">["className"];
	onClose?: () => void;
};

export default function SidebarNavigation({ className, onClose }: Props) {
	const { pathname } = useLocation();

	const isActive = (path: string) => {
		return pathname.includes(path);
	};

	const sortNavigation = (nav: NavigationItem[]) => {
		if (nav.some((item) => item.level === 4)) {
			return nav;
		}

		// sort by name
		return nav.sort((a, b) => a.name.localeCompare(b.name));
	};

	return (
		<aside
			className={twMerge(
				"w-[280px] border-r-[1px] border-r-border/60 text-foreground bg-background",
				className
			)}
		>
			<section className='lg:sticky w-full h-screen overflow-y-auto pb-16 p-6'>
				<div className='flex flex-col gap-4 text-sm border-b-[1px] border-b-border pb-8f'>
					<Link to='/'>
						<div className='flex items-center mb-6 gap-2 cursor-pointer'>
							<div className='size-10 rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center'>
								<Tag size={20} className='text-primary' />
							</div>

							<div className='flex flex-col gap-1'>
								<span>Rasengan UI Kit</span>
								<span className='text-[12px] text-foreground/60'>v1.0.0</span>
							</div>
						</div>
					</Link>
				</div>

				{NavigationData.map((nav) => {
					return (
						<div key={nav.id} className='mt-8'>
							<div className='flex items-center gap-2 text-foreground/60'>
								{nav.icon}
								<span className='font-mono text-[12px]'>{nav.name}</span>
							</div>

							<div className='flex flex-col w-full text-sm py-4'>
								{nav.children &&
									sortNavigation(nav.children).map((item) => {
										if (item.visible === false) return null;

										return (
											<Fragment key={item.id}>
												<NavItem
													item={item}
													isActive={isActive}
													onClose={onClose}
												/>
											</Fragment>
										);
									})}
							</div>
						</div>
					);
				})}

				<div className='mt-4 border rounded-lg p-4 text-foreground bg-background'>
					<h2 className='font-bold text-lg'>Rasengan UI</h2>

					<p className='text-foreground/70 my-4 text-sm text-pretty'>
						Build modern web applications faster with ready to use React
						components and templates powered by{" "}
						<span className='text-foreground font-medium'>Shadcn UI.</span>
					</p>

					<Link to='https://ui.rasengan.dev/pricing' target='_blank'>
						<Button className='h-10  w-full'>
							<Rocket />
							<span>Get Started</span>
						</Button>
					</Link>
				</div>
			</section>
		</aside>
	);
}

type NavItemProps = {
	item: NavigationItem;
	className?: ComponentProps<"div">["className"];
	isActive: (path: string) => boolean;
	onClose?: () => void;
};

export const NavItem = ({
	item,
	className,
	isActive,
	onClose,
}: NavItemProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const active = hasActiveChild();

		if (active) {
			setIsOpen(true);
		}
	}, []);

	const hasActiveChild = () => {
		if (!item.children) return false;

		return item.children.some((item) => {
			let active: boolean = false;

			active = isActive(item.link ?? "#nothing");

			if (!active && item.children) {
				active = item.children.some((item) =>
					isActive(item.link ?? "#nothing")
				);
			}

			return active;
		});
	};

	const handleNavigate = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		link?: string
	) => {
		e.preventDefault();

		navigate(link || "#");

		if (onClose) onClose();
	};

	const sortNavigation = (nav: NavigationItem[]) => {
		if (nav.some((item) => item.level === 4)) {
			return nav;
		}

		// sort by name
		return nav.sort((a, b) => a.name.localeCompare(b.name));
	};

	return item.link ? (
		<Link to={item.link} onClick={(e) => handleNavigate(e, item.link)}>
			<div
				className={twMerge(
					"flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border  cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all duration-300 pr-2",
					className,
					isActive(item.link)
						? "text-primary border-l-primary bg-primary/10 hover:text-primary hover:border-l-primary font-lexend-medium"
						: "text-foreground/90",
					item.isComingSoon && "text-foreground/40 hover:text-foreground/40"
				)}
				onClick={() => {
					setIsOpen((prev) => !prev);
					if (onClose) onClose();
				}}
			>
				{item.isBeta ? (
					<div className='flex items-center gap-2'>
						<span>{item.name}</span>
						<FlaskConical size={16} className='text-green-500' />
					</div>
				) : (
					<span className='flex-nowrap text-nowrap overflow-hidden text-ellipsis'>
						{item.name}
					</span>
				)}

				{item.isNew && (
					<span className='text-[10px] text-primary-foreground bg-primary px-2 py-1 rounded-full'>
						New
					</span>
				)}

				{item.isComingSoon && (
					<span className='text-[10px] text-primary-foreground bg-orange-500 px-2 py-1 rounded-full'>
						Coming Soon
					</span>
				)}

				{item.children && item.children.length > 0 && (
					<ChevronDown
						size={16}
						className={twMerge(
							"transition-all duration-300",
							isOpen ? "" : "-rotate-90"
						)}
					/>
				)}
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key={item.id}
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { height: "auto" },
							collapsed: { height: 0 },
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className='overflow-hidden'
					>
						{item.children &&
							sortNavigation(item.children).map((item) => {
								if (item.visible === false) return null;

								return (
									<NavItem
										key={item.id}
										item={item}
										className={item.level === 2 ? "" : "pl-8"}
										isActive={isActive}
										onClose={onClose}
									/>
								);
							})}
					</motion.div>
				)}
			</AnimatePresence>
		</Link>
	) : (
		<div>
			<div
				className={twMerge(
					"flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border text-foreground/90 cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all pr-2",
					className,
					hasActiveChild()
						? "text-primary border-l-primary hover:text-primary hover:border-l-primary font-lexend-medium"
						: "text-foreground/90"
				)}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span>{item.name}</span>

				{item.children && item.children.length > 0 && (
					<ChevronDown
						size={16}
						className={twMerge(
							"transition-all duration-300",
							isOpen ? "" : "-rotate-90"
						)}
					/>
				)}
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key={item.id}
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { height: "auto" },
							collapsed: { height: 0 },
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className='overflow-hidden'
					>
						{item.children &&
							sortNavigation(item.children).map((item) => {
								if (item.visible === false) return null;

								return (
									<NavItem
										key={item.id}
										item={item}
										className={
											item.level === 2
												? ""
												: item.level === 3
												? "pl-8"
												: "pl-12"
										}
										isActive={isActive}
										onClose={onClose}
									/>
								);
							})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
