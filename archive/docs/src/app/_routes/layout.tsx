import { Outlet, LayoutComponent, Link } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/common/layout/navbar";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { useState } from "react";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<section
			className={twMerge(
				"app-container w-screen min-h-screen overflow-x-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<Analytics framework='rasengan' />

			<div className='fixed top-0 left-0 right-0 z-30'>
				<Navbar onSetIsOpen={() => setIsOpen(prev => !prev)} />
			</div>


			<Outlet />
			<Toaster />


			<div
				className={twMerge(
					"fixed left-0 top-0 bottom-0 max-w-[300px] w-full bg-background z-40 p-4 transition-all duration-300 flex flex-col justify-between",
					isOpen ? "translate-x-0" : "-translate-x-full"
				)}
				style={{ zIndex: 100 }}
			>
				<nav className='mt-10'>
					<ul className='flex flex-col justify-center gap-4 text-foreground'>
						<Link
							to='/docs'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-2 flex items-center rounded-md h-8'
						>
							<li className='font-semibold'>Docs</li>
						</Link>
						<Link
							to='/docs/components'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-2 flex items-center rounded-md h-8'
						>
							<li className='font-semibold'>Components</li>
						</Link>
						<Link
							to='/templates'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-2 flex items-center rounded-md h-8'
						>
							<li className='font-semibold'>Templates</li>
						</Link>
					</ul>
				</nav>

				<div>
					<Link
						to='https://buymeacoffee.com/dilane3'
						target='_blank'
						className='h-8'
					>
						<Button className='w-full h-8 bg-primary hover:bg-primary/80'>
							<Coffee />
							<span>Support us</span>
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
		</section>
	);
};

Layout.metadata = {};

export default Layout;
