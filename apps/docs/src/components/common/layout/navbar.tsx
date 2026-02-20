import { Button } from "@/components/ui/button";
import { AlignJustify, Coffee, ExternalLink, Lock } from "lucide-react";
import { Link, useNavigate } from "rasengan";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import ThemeButton from "../atoms/theme-button";
import AppLogo from "../atoms/app-logo";
import { scrollToSection } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Search from "@/components/common/molecules/search";


type Props = {
	className?: ComponentProps<"header">["className"];
};

export const Navbar = ({ className }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

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
					"bg-background backdrop-blur-mdc w-full h-[60px] border-b-[1px] border-b-border dark:border-b-input flex items-center justify-between px-4",
					className
				)}
			>
				<div className='flex items-center gap-1'>
					<Button
						size='icon'
						className='size-8 lg:hidden text-foreground/70'
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

					<nav className='hidden lg:block'>
						<ul className='flex items-center gap-1 text-foreground text-sm'>
							{/* <Link
								to='/ui-components'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Components</li>
							</Link> */}
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
							{/* <Link
								to='/pricing'
								className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							>
								<li className='font-medium'>Pricing</li>
							</Link> */}
							{/* <Link to='https://ui-kit.rasengan.dev' target='_blank'>
								<li className='font-medium hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center gap-2 rounded-md h-8'>
									<span>Playground</span>
									<ExternalLink className='size-4' />
								</li>
							</Link> */}
						</ul>
					</nav>
				</div>

				<div className='flex items-center gap-2'>
					{/* <Link className='' to='/pricing'>
						<Button className='h-8 text-foreground/70' variant='outline'>
							<Lock />
							<span>Unlock Premium</span>
						</Button>
					</Link> */}
					{/* <Link
						to='https://buymeacoffee.com/dilane3'
						target='_blank'
						className='h-8 hidden sm:flex'
					>
						<Button className='h-8  bg-[#FFC133] hover:bg-[#FFC133]/80 text-black'>
							<Coffee />
							<span>Buy me a coffee</span>
						</Button>
					</Link> */}

					<div className="px-4">
						<Search
							applicationId="06YAZFOHSQ"
							apiKey="94b6afdc316917b6e6cdf2763fa561df"
							indexName="algolia_podcast_sample_dataset"
							attributes={{
								primaryText: "title",
								secondaryText: "description",
								tertiaryText: "itunesAuthor",
								url: "url",
								image: "imageUrl",
							}}
						/>
						{/* <Input className="h-8 w-[280px] placeholder:text-foreground placeholder:font-medium dark:bg-muted/70 dark:border-input" placeholder="Search documentation..." /> */}
					</div>

					{/* vertical separator */}
					<div className='h-4 w-[1px] bg-border dark:bg-input'></div>

					<Link to="https://github.com/rasengan-dev/rasengan-ui-registry" target='_blank'>
						<div className="flex items-center gap-2 text-foreground px-4">
							<svg viewBox="0 0 1024 1024" fill="currentColor" className="size-4">
								<path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor" />
							</svg>

							{/* <span className="text-sm font-medium text-muted-foreground">10</span> */}
						</div>
					</Link>

					{/* vertical separator */}
					<div className='h-4 w-[1px] bg-border dark:bg-input'></div>

					<ThemeButton />

					{/* vertical separator */}
					<div className='h-4 w-[1px] bg-border dark:bg-input hidden sm:flex'></div>

					<Link
						to='https://buymeacoffee.com/dilane3'
						target='_blank'
						className='h-8 hidden sm:flex'
					>
						<Button className='h-8'>
							<Coffee />
							<span>Support us</span>
						</Button>
					</Link>
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
						<Link
							to='/ui-components'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							onClick={() => setIsOpen(false)}
						>
							<li className='font-medium'>Components</li>
						</Link>
						<Link
							to='/templates'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							onClick={() => setIsOpen(false)}
						>
							<li className='font-medium'>Templates</li>
						</Link>
						<Link
							to='/pricing'
							className='hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center rounded-md h-8'
							onClick={() => setIsOpen(false)}
						>
							<li className='font-medium'>Pricing</li>
						</Link>
						<Link to='https://ui-kit.rasengan.dev' target='_blank'>
							<li className='font-medium hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-4 flex items-center gap-2 rounded-md h-8'>
								<span>Playground</span>
								<ExternalLink className='size-4' />
							</li>
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
