import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { Link } from "rasengan";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	className?: ComponentProps<"div">["className"];
	enableTheme?: boolean;
};

/**
 * Navbar 2
 *
 * Navbar with centered text menu
 */
export const Navbar2 = ({ className, enableTheme }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header
			className={twMerge(
				"bg-background w-full h-[60px] border-b-[1px] border-b-border flex items-center justify-between px-4",
				className
			)}
		>
			<div>
				<AppLogo size='sm' />
			</div>

			<nav className='hidden md:block'>
				<ul className='flex items-center gap-8 text-foreground'>
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

			<div className='flex items-center gap-2'>
				{enableTheme && <ThemeButton />}
				<Button>Start now</Button>

				<Button
					size='icon'
					className='md:hidden'
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<AlignJustify />
				</Button>
			</div>

			<div
				className={twMerge(
					"fixed right-0 top-0 bottom-0 max-w-[300px] w-full bg-background z-30 p-4 transition-all duration-300",
					isOpen ? "translate-x-0" : "translate-x-full"
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
		</header>
	);
};
