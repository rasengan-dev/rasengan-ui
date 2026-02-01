import AppLogo from "@/components/common/atoms/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer5 = () => {
	return (
		<footer className='w-full p-4'>
			<div className='z-10 w-full flex flex-col items-center justify-end text-center px-4 md:px-10 pb-20'>
				<h1 className='relative z-20 text-[40px] lg:text-[50px] leading-[50px] lg:leading-[60px] max-w-[600px] font-medium text-center text-foreground text-pretty'>
					Ready to Take Control of Your Health?
				</h1>
				<p className='relative z-20 text-sm text-center text-foreground/60 max-w-[500px] mt-4 text-pretty'>
					Get expert care for weight loss, sexual health, wellness and more -
					all from the comfort of home, no insurance needed
				</p>

				<div className='relative z-20 mt-10 flex gap-4'>
					<Button className='bg-primary hover:bg-primary/80'>
						<span>Start Now</span>
					</Button>

					<Button className='text-foreground' variant='outline'>
						<span>Contact Us</span>
					</Button>
				</div>
			</div>

			<div className='w-full rounded-xl py-4 lg:py-8 px-4 lg:px-20 bg-muted dark:bg-muted/30 text-foreground/70 border'>
				<div className='w-full flex flex-col sm:flex-row gap-8 justify-between pb-8 border-b'>
					<div className='flex flex-col items-start gap-2 w-full md:w-2/5'>
						<AppLogo size='sm' />

						<div className='w-full max-w-[300px]'>
							<h2 className='font-medium text-foreground text-md'>
								Subscribe to our newsletter
							</h2>

							<div className='w-full relative mt-2'>
								<Input
									type='email'
									placeholder='Enter your email'
									className='h-12 rounded-full pl-6 pr-[120px]'
								/>
								<Button className='absolute h-10 rounded-full right-1 top-1/2 -translate-y-1/2'>
									Subscribe
								</Button>
							</div>

							<p className='w-full text-sm mt-2'>
								By subscribing to our newsletter you agree to our Privacy Policy
								and provide consent to receive updates from our company
							</p>
						</div>

						{/* <span className='font-medium max-w-[220px] text-pretty text-foreground'>
						Collection of well crafted React components
					</span> */}
					</div>

					<div className='flex flex-col md:flex-row gap-4 w-full md:w-3/5'>
						<div className='w-full md:w-1/3'>
							<h2 className='font-medium text-foreground text-md'>
								Quick Links
							</h2>
							<ul className='flex flex-col gap-2 mt-2'>
								<li>
									<a
										href='#'
										className='text-foreground/70 text-sm hover:text-foreground transition-all'
									>
										Home Page
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
								<li>
									<a
										href='#'
										className='text-foreground/70 text-sm hover:text-foreground transition-all'
									>
										Our Services
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 text-sm hover:text-foreground transition-all'
									>
										Blog Posts
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 text-sm hover:text-foreground transition-all'
									>
										Case studies
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
							<h2 className='font-medium text-foreground text-md'>
								Developers
							</h2>
							<ul className='flex flex-col gap-2 mt-2'>
								<li>
									<a
										href='#'
										className='text-foreground/70 text-sm hover:text-foreground transition-all'
									>
										Documentation
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 text-sm hover:text-foreground transition-all'
									>
										Changelog
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 text-sm hover:text-foreground transition-all'
									>
										Support
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='w-full flex flex-col md:flex-row gap-2 justify-center items-center pt-4'>
					<span>© 2025 Rasengan Labs</span>
				</div>
			</div>
		</footer>
	);
};
