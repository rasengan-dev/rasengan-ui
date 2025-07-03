import { Button } from "@/components/ui/button";
import { AlignJustify, Lock } from "lucide-react";
import { Link } from "rasengan";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import ThemeButton from "../atoms/theme-button";
import AppLogo from "../atoms/app-logo";

type Props = {
	className?: ComponentProps<"header">["className"];
};

export const Navbar = ({ className }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<header
				className={twMerge(
					"bg-background backdrop-blur-mdd w-full h-[60px] border-b-[1px] border-b-border flex items-center justify-between px-4",
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
							<Link
								to='https://rasengan.dev'
								target='_blank'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Docs</li>
							</Link>
							<Link
								to='/components'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Components</li>
							</Link>
							<Link
								to='/templates'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Templates</li>
							</Link>
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
					<Button className='h-8 text-foreground/70' variant='outline'>
						<Lock />
						<span>Unlock Premium</span>
					</Button>
					<Button className='h-8'>Sign In</Button>

					{/* vertical separator */}
					<div className='h-6 w-[1px] bg-border'></div>

					<ThemeButton />
				</div>
			</header>

			<div
				className={twMerge(
					"fixed left-0 top-0 bottom-0 max-w-[300px] w-full bg-background z-50 p-4 transition-all duration-300",
					isOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<nav className='mt-10'>
					<ul className='flex flex-col justify-center gap-8 text-foreground'>
						<Link to='#'>
							<li className='font-medium text-md'>Home</li>
						</Link>
						<Link to='#'>
							<li className='font-medium text-md'>About</li>
						</Link>
						<Link to='#'>
							<li className='font-medium text-md'>Contact</li>
						</Link>
						<Link to='#'>
							<li className='font-medium text-md'>Blog</li>
						</Link>
					</ul>
				</nav>
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
