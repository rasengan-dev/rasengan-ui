import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";
import { ArrowRight, Rocket } from "lucide-react";
import { Link, PageComponent } from "rasengan";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<div className={cn("bg-background", isDark ? "dark" : "light")}>
			<div className='w-full fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 lg:px-10 max-w-[1500px] mx-auto py-4'>
				<AppLogo size='sm' className='' />

				<div className='flex gap-4'>
					<ThemeButton />
				</div>
			</div>

			<div className='size-[300px] rounded-full bg-primary fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 blur-[180px] dark:blur-[340px]'></div>

			<section className='grid-section relative w-screen h-screen flex flex-col items-center justify-center bg-background'>
				{/* Hero */}
				<section className='relative w-full flex flex-col items-center'>
					<h1 className='font-bold text-[40px] lg:text-[50px] leading-[60px] text-center max-w-[700px] text-foreground/70 text-pretty px-4'>
						Build Faster. Style Sharper with{" "}
						<span className='text-primary'>Rasengan UI Kit</span>
					</h1>
					<p className='max-w-[700px] text-center mt-2 text-foreground text-pretty px-4'>
						<span className='font-medium text-pretty'>
							Customizable UI sections for any React app — Rasengan.js, Next.js,
							Remix, TanStack, React Router, and more.
						</span>{" "}
						<span className='text-pretty'>
							Themeable, responsive, and powered by Shadcn UI — just drop them
							into your project and build faster.
						</span>
					</p>

					<div className='mt-6 w-full items-center justify-center flex flex-col sm:flex-row gap-2 px-4'>
						<Link to='https://ui.rasengan.dev/pricing' target='_blank'>
							<Button className='h-10  w-full'>
								<Rocket />
								<span>Get Started</span>
							</Button>
						</Link>
						<Link
							to='https://ui.rasengan.dev/templates'
							target='_blank'
							className='w-full sm:w-auto'
						>
							<Button
								className='h-10 text-foreground/70 border border-primary/30 w-full'
								variant='outline'
							>
								Explore Templates
							</Button>
						</Link>
					</div>
				</section>
			</section>

			<div className='fixed bottom-0 right-0 p-4 text-foreground'>
				<div>
					<span>Powered by</span>
					<Link
						to='https://rasengan.dev'
						target='_blank'
						className='hover:underline'
					>
						<div className='flex items-center gap-2 text-foreground/70 hover:text-foreground transition-all'>
							<ArrowRight size={16} />
							<span className='text-sm'>Rasengan.js</span>
						</div>
					</Link>
					<Link
						to='https://ui.shadcn.com'
						target='_blank'
						className='hover:underline'
					>
						<div className='flex items-center gap-2 text-foreground/70 hover:text-foreground transition-all'>
							<ArrowRight size={16} />
							<span className='text-sm'>Shadcn UI</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

Page.metadata = {
	title: "Welcome - Rasengan UI Kit",
	description: "Welcome to Rasengan UI Kit",
};

export default Page;
