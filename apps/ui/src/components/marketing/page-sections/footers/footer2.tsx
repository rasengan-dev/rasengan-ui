import AppLogo from "@/components/common/atoms/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer2 = () => {
	return (
		<footer className='w-full py-4 lg:py-8 px-4 lg:px-20 bg-muted dark:bg-muted/30 text-foreground/70 border-t'>
			<div className='w-full min-h-[250px] mt-16 flex flex-col lg:flex-row md:items-center text-white md:justify-between gap-8 rounded-4xl bg-[#0C4243] px-8 md:px-12 lg:py-20 py-10'>
				<div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-start'>
					<h1 className='text-4xl md:text-5xl font-bold lg:max-w-[500px] mb-4 text-pretty'>
						Subscribe to our newsletter
					</h1>
					<p className='md:max-w-[500px] text-pretty'>
						Subscribe to our newsletter and be the first to receive our
						insights, updates and experts tips on new components added
					</p>
				</div>

				<div className='w-full lg:w-1/2 max-w-[700px] lg:max-w-[500px]'>
					<span className='font-medium'>Stay up to date</span>
					<div className='flex flex-col sm:flex-row gap-2 mt-2'>
						<Input
							type='email'
							placeholder='Enter your email'
							className='border-white/20 bg-[#1F534B] text-white placeholder:text-white/70 rounded-full h-12 px-6'
						/>
						<Button className='bg-[#C4EBA2]/70 hover:bg-[#C4EBA2] text-[#0C4243] rounded-full h-12 px-6'>
							Subscribe
						</Button>
					</div>
					<span className='block text-white/70 mt-2 text-sm'>
						By subscribing you agree to our{" "}
						<a href='#' className='text-white ml-1 hover:underline'>
							Privacy policy
						</a>
					</span>
				</div>
			</div>

			<div className='w-full mt-20 flex flex-col sm:flex-row gap-4 justify-between pb-8 border-b'>
				<div className='flex flex-col items-start gap-2'>
					<AppLogo size='sm' />

					<span className='font-medium max-w-[220px] text-pretty text-foreground'>
						Collection of well crafted React components
					</span>
				</div>

				<div className='flex flex-col md:flex-row gap-4 w-1/2'>
					<div className='w-full md:w-1/3'>
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

					<div className='w-full md:w-1/3'>
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

					<div className='w-full md:w-1/3'>
						<h2 className='font-medium text-foreground text-md'>Legal</h2>

						<ul className='flex flex-col gap-2 mt-2'>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									Privacy policy
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									Terms of service
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-foreground/70 text-sm hover:text-foreground transition-all'
								>
									Brands
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='w-full flex flex-col md:flex-row gap-2 justify-between items-center pt-4'>
				<span>© 2025 Rasengan Labs. All rights reserved.</span>
			</div>
		</footer>
	);
};
