import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import AppLogo from "@/components/common/atoms/app-logo";
import { Link } from "rasengan";
import { Input2 } from "@/registry/application-ui/forms/inputs";
import { useState, useEffect, useRef } from "react";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Footer4 } from "../../page-sections/footers/footer4";

const useTypewriter = (
	words = [
		"a blog about...",
		"a portfolio website to...",
		"a website to...",
		"a landing page about...",
	],
	typingSpeed = 70,
	deletingSpeed = 40,
	pause = 1200,
	loop = true
) => {
	const [display, setDisplay] = useState("");
	const [wordIndex, setWordIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;

		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (!mountedRef.current) return;

		const currentWord = words[wordIndex % words.length];
		let timeout: number;

		if (!isDeleting) {
			// Typing
			if (display.length < currentWord.length) {
				timeout = setTimeout(() => {
					setDisplay(currentWord.slice(0, display.length + 1));
				}, typingSpeed);
			} else {
				// finished typing the word
				if (loop) {
					timeout = setTimeout(() => setIsDeleting(true), pause);
				}
				// if not looping, just stay at full word (no deleting / next)
			}
		} else {
			// Deleting
			if (display.length > 0) {
				timeout = setTimeout(() => {
					setDisplay(currentWord.slice(0, display.length - 1));
				}, deletingSpeed);
			} else {
				// finished deleting -> next word
				setIsDeleting(false);
				setWordIndex((prev) => prev + 1);
			}
		}

		return () => {
			clearTimeout(timeout);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		display,
		isDeleting,
		wordIndex,
		words,
		typingSpeed,
		deletingSpeed,
		pause,
		loop,
	]);

	// If not looping and we've typed the last word fully, just show it forever
	const isLastWordAndDone =
		!loop &&
		wordIndex >= words.length - 1 &&
		display === words[words.length - 1];

	return {
		display,
		isLastWordAndDone,
	};
};

/**
 * Hero 14
 *
 * Hero with left bottom text and background image
 */
export const LandingPage1 = () => {
	const { display, isLastWordAndDone } = useTypewriter();

	const scroll = useScroll();

	return (
		<section className='w-full min-h-screen bg-[#080808] overflow-x-hidden dark'>
			<section className='w-full h-auto min-h-screen flex flex-col justify-start relative overflow-hidden'>
				<div
					className={cn(
						"fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 lg:px-10 py-4 max-w-[1500px] mx-auto transition-all duration-300",
						scroll > 100 && "bg-[#282725]/50 backdrop-blur-2xl"
					)}
				>
					<div className='flex items-center gap-4'>
						<AppLogo size='sm' className='text-white' />
					</div>

					<nav className='hidden lg:block px-4 py-2'>
						<ul className='flex items-center gap-4 text-white/70 text-sm'>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>Home</li>
							</Link>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>
									About
								</li>
							</Link>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>
									Contact
								</li>
							</Link>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>Blog</li>
							</Link>
						</ul>
					</nav>

					<div className='flex gap-4'>
						<Button className='bg-transparent text-white hover:bg-input/40 rounded-full'>
							Login
						</Button>
						<Button className='rounded-full bg-[#202020] hover:bg-[#202020]/80 text-white hover:text-white border border-[#434343]'>
							<User />
							<span>Create Account</span>
						</Button>
					</div>
				</div>

				{/* Floating blured circles */}
				<div className='absolute -top-20 -left-20 size-[400px] bg-[#202020] blur-[150px]'></div>
				<div className='absolute -bottom-20 -right-20 size-[400px] bg-[#202020] blur-[150px]'></div>

				<div className='relative w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-foreground mt-[150px] lg:mt-[240px] px-4'>
					<h1 className='text-[50px] lg:text-[60px] leading-[60px] lg:leading-[80px] max-w-[900px] font-bold text-center text-white relative z-20'>
						Build something Lovable
					</h1>
					<p className='text-lg text-center mt-4 max-w-[600px] relative z-20 text-pretty'>
						Create apps and websites by chatting with AI
					</p>

					<div className='mt-10 flex gap-4 w-full relative z-20'>
						<Input2
							placeholder={`Ask Konoha AI to build ${display}`}
							className='dark:bg-[#282725] w-full max-w-[800px]'
						/>
					</div>

					<div className='absolute top-32 left-1/2 -translate-x-1/2 size-[800px] bg-[#576CAA] blur-[150px]'></div>
					<div className='absolute top-32 left-1/2 -translate-x-1/2 size-[500px] bg-[#F05918] blur-[150px]'></div>
				</div>

				<section className='px-4'>
					<div className='w-full mx-auto max-w-[1500px] p-4 lg:p-8 dark:bg-[#282725] relative z-20 mt-[180px] border rounded-lg'>
						<h2 className='text-2xl font-bold text-foreground'>
							From the community
						</h2>

						<div className='flex justify-between items-start gap-8 mt-4'>
							<div className='flex flex-col md:flex-row md:items-center gap-2 w-full'>
								<div className='relative'>
									<Input
										placeholder='Search projects'
										className='border-ring pl-8 text-foreground'
									/>

									<Search
										className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
										size={14}
									/>
								</div>

								<Select>
									<SelectTrigger className='border-ring w-[140px] text-foreground'>
										<SelectValue placeholder='Sort by' />
									</SelectTrigger>
									<SelectContent className='text-foreground'>
										<SelectItem value='1'>Most Popular</SelectItem>
										<SelectItem value='2'>Latest</SelectItem>
										<SelectItem value='3'>Most liked</SelectItem>
									</SelectContent>
								</Select>

								<Select>
									<SelectTrigger className='border-ring w-[140px] text-foreground'>
										<SelectValue placeholder='Order' />
									</SelectTrigger>
									<SelectContent className='text-foreground'>
										<SelectItem value='1'>Ascending</SelectItem>
										<SelectItem value='2'>Descending</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<Button
									variant='ghost'
									className='text-foreground hover:bg-ring/50 border border-ring'
								>
									<span className='text-sm text-muted-foreground text-nowrap'>
										View all
									</span>
								</Button>
							</div>
						</div>

						<section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'>
							{Array.from({ length: 40 }).map((_, index) => (
								<ProjectCard key={index} />
							))}
						</section>
					</div>
				</section>

				<div className='mt-20 relative z-20'>
					<Footer4 className='dark:bg-[#282725]' />
				</div>
			</section>
		</section>
	);
};

const ProjectCard = () => {
	return (
		<div className='w-full h-auto flex flex-col rounded-lg bg-background dark:bg-input/70'>
			<img
				src='/static/images/gradients/3.jpeg'
				alt=''
				className='w-full aspect-[16/9] rounded-lg border border-ring'
			/>

			<div className='flex items-center gap-2 py-4'>
				<img
					src='/static/images/avatars/4.jpeg'
					alt=''
					className='size-8 rounded-full'
				/>
				<div className='flex flex-col gap-1 leading-4'>
					<h3 className='text-md font-medium text-foreground'>
						Candy Portfolio
					</h3>
					<p className='text-sm text-muted-foreground'>6477 Remixed</p>
				</div>
				{/* <div>
          <Button variant='ghost' className='text-foreground hover:bg-ring/50'>
            <span className='text-sm text-muted-foreground text-nowrap'>
              View project
            </span>
          </Button>
        </div> */}
			</div>
		</div>
	);
};
