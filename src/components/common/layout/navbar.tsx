import { Button } from "@/components/ui/button";
import { AlignJustify, Coffee, Lock } from "lucide-react";
import { Link, useNavigate } from "rasengan";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import ThemeButton from "../atoms/theme-button";
import AppLogo from "../atoms/app-logo";
import { scrollToSection } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import ProfileDropdown from "../molecules/profile-dropdown";
import Image from "@rasenganjs/image";

type Props = {
	className?: ComponentProps<"header">["className"];
};

export const Navbar = ({ className }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	// const { user } = useAuthStore();

	const navigate = useNavigate();

	const handleNavigateToSection = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		sectionId: string
	) => {
		// Check if we are on the home page
		if (window.location.pathname === "/") {
			scrollToSection(e, sectionId);
			return;
		}

		// Redirect to the pricing page
		navigate("/#pricing");
	};

	return (
		<>
			<header
				id='navbar'
				className={twMerge(
					"bg-background backdrop-blur-mdc w-full h-[60px] border-b-[1px] border-b-border flex items-center justify-between px-4",
					className
				)}
			>
				<div className='flex items-center gap-1'>
					<Button
						size='icon'
						className='size-8 md:hidden text-foreground/70'
						variant={"ghost"}
						onClick={() => setIsOpen((prev) => !prev)}
					>
						<AlignJustify />
					</Button>

					<Link to='/' className='size-8'>
						<Button size={"icon"} variant={"ghost"} className='size-8'>
							<AppLogo size='sm' />
						</Button>
					</Link>

					<nav className='hidden md:block'>
						<ul className='flex items-center gap-1 text-foreground text-sm'>
							{/* <Link
								to='https://rasengan.dev'
								target='_blank'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Docs</li>
							</Link> */}
							<Link
								to='/ui-components'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Components</li>
							</Link>
							{/* <Link
								to='/templates'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Templates</li>
							</Link> */}
							<Link
								to='/pricing'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Pricing</li>
							</Link>
						</ul>
					</nav>
				</div>

				<div className='flex items-center gap-2'>
					<Link className='' to='/pricing'>
						<Button className='h-8 text-foreground/70' variant='outline'>
							<Lock />
							<span>Unlock Premium</span>
						</Button>
					</Link>
					<Link
						to='https://buymeacoffee.com/dilane3'
						target='_blank'
						className='h-8 hidden sm:flex'
					>
						<Button className='h-8  bg-[#FFC133] hover:bg-[#FFC133]/80 text-black'>
							<Coffee />
							<span>Buy me a coffee</span>
						</Button>
					</Link>

					{/* {user ? (
						<ProfileDropdown>
							<Image
								src={user.avatar || ""}
								alt='avatar'
								className='w-[32px] h-[32px] rounded-full'
								width={32}
								height={32}
							/>
						</ProfileDropdown>
					) : (
						<Link to='/auth/signin' className='h-8'>
							<Button className='h-8'>Sign In</Button>
						</Link>
					)} */}

					{/* vertical separator */}
					<div className='h-6 w-[1px] bg-border'></div>

					<ThemeButton />
				</div>
			</header>

			<div
				className={twMerge(
					"fixed left-0 top-0 bottom-0 max-w-[300px] w-full bg-background z-50 p-4 transition-all duration-300 flex flex-col justify-between",
					isOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<nav className='mt-10'>
					<ul className='flex flex-col justify-center gap-4 text-foreground'>
						{/* <Link
							to='https://rasengan.dev'
							target='_blank'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							onClick={() => setIsOpen(false)}
						>
							<li className='font-medium'>Docs</li>
						</Link> */}
						<Link
							to='/ui-components'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							onClick={() => setIsOpen(false)}
						>
							<li className='font-medium'>Components</li>
						</Link>
						{/* <Link
							to='/templates'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							onClick={() => setIsOpen(false)}
						>
							<li className='font-medium'>Templates</li>
						</Link> */}
						<Link
							to='/pricing'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							onClick={() => setIsOpen(false)}
						>
							<li className='font-medium'>Pricing</li>
						</Link>
					</ul>
				</nav>

				<div>
					<Link
						to='https://buymeacoffee.com/dilane3'
						target='_blank'
						className='h-8'
					>
						<Button className='w-full h-8 bg-[#FFC133] hover:bg-[#FFC133]/80 text-black'>
							<Coffee />
							<span>Buy me a coffee</span>
						</Button>
					</Link>
					<Link
						to='/pricing'
						onClick={(e) => {
							handleNavigateToSection(e, "pricing");
							setIsOpen(false);
						}}
					>
						<Button
							className='mt-2 h-8 text-foreground/70 w-full'
							variant='outline'
						>
							<Lock />
							<span>Unlock Premium</span>
						</Button>
					</Link>
				</div>
			</div>
			<div
				className={twMerge(
					"fixed top-0 right-0 left-0 bottom-0 bg-black/70 z-10",
					isOpen ? "block" : "hidden"
				)}
				onClick={() => setIsOpen(false)}
			></div>
		</>
	);
};
