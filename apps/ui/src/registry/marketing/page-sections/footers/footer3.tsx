import AppLogo from "@/components/common/atoms/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer3 = () => {
	return (
		<footer className='w-full py-4 lg:py-8 px-4 lg:px-20 bg-muted dark:bg-muted/30 text-foreground/70 border-t'>
			<div className='w-full flex flex-col md:flex-row gap-4 justify-between pb-8 border-b'>
				<div className='flex flex-col items-start gap-2 w-full md:w-1/3'>
					<AppLogo size='sm' />

					<span className='font-medium max-w-[220px] text-pretty text-foreground'>
						Collection of well crafted React components
					</span>
				</div>

				<div className='flex flex-col md:flex-row gap-8 md:gap-4 w-full md:w-2/3'>
					<div className='w-full md:w-1/5'>
						<h2 className='font-medium text-foreground text-md'>Products</h2>
						<ul className='flex flex-col gap-2 mt-2'>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									Components
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									UI Kits
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									Templates
								</a>
							</li>
						</ul>
					</div>

					<div className='w-full md:w-1/5'>
						<h2 className='font-medium text-foreground text-md'>Company</h2>
						<ul className='flex flex-col gap-2 mt-2'>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									Home
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									About
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div className='w-full md:w-3/5'>
						<h2 className='font-medium text-foreground text-md'>
							Subscribe to our newsletter
						</h2>

						<div className='relative mt-2'>
							<Input
								type='email'
								placeholder='Enter your email'
								className='h-12 rounded-full pl-6 pr-[120px]'
							/>
							<Button className='absolute h-10 rounded-full right-1 top-1/2 -translate-y-1/2'>
								Subscribe
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full flex flex-col md:flex-row gap-2 justify-between items-center pt-4'>
				<span>© 2025 Rasengan Labs</span>
				<span>All rights reserved.</span>
			</div>
		</footer>
	);
};
