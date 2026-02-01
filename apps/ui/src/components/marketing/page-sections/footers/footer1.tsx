import AppLogo from "@/components/common/atoms/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer1 = () => {
	return (
		<footer className='w-full py-4 lg:py-8 px-4 lg:px-20 bg-[#111111] text-white/70'>
			<div className='w-full flex flex-col sm:flex-row gap-4 justify-between sm:items-center pb-4 border-b border-b-white/20'>
				<AppLogo size='sm' className='text-white' />

				<span className='font-medium'>
					Collection of well crafted React components
				</span>
			</div>

			<div className='w-full flex flex-col md:flex-row justify-start items-start gap-8 py-4 border-b border-b-white/20'>
				<div className='w-full md:w-1/4'>
					<h2 className='font-medium text-white text-md'>Products</h2>
					<ul className='flex flex-col gap-2 mt-2'>
						<li>
							<a
								href='#'
								className='text-white/70 text-sm hover:text-white transition-all'
							>
								Components
							</a>
						</li>
						<li>
							<a
								href='#'
								className='text-white/70 text-sm hover:text-white transition-all'
							>
								UI Kits
							</a>
						</li>
						<li>
							<a
								href='#'
								className='text-white/70 text-sm hover:text-white transition-all'
							>
								Templates
							</a>
						</li>
					</ul>
				</div>

				<div className='w-full md:w-1/4'>
					<h2 className='font-medium text-white text-md'>Company</h2>
					<ul className='flex flex-col gap-2 mt-2'>
						<li>
							<a
								href='#'
								className='text-white/70 text-sm hover:text-white transition-all'
							>
								Home
							</a>
						</li>
						<li>
							<a
								href='#'
								className='text-white/70 text-sm hover:text-white transition-all'
							>
								About
							</a>
						</li>
						<li>
							<a
								href='#'
								className='text-white/70 text-sm hover:text-white transition-all'
							>
								Contact
							</a>
						</li>
						<li>
							<a
								href='#'
								className='text-white/70 text-sm hover:text-white transition-all'
							>
								Blog
							</a>
						</li>
					</ul>
				</div>

				<div className='w-full md:w-2/4 flex flex-col items-start md:items-end gap-2 mt-2'>
					<h2 className='font-medium text-white text-md'>
						Subscribe to newsletter
					</h2>
					<p className='text-white/70 text-sm'>
						Get the latest news and updates
					</p>
					<div className='flex gap-2 mt-4'>
						<Input
							type='email'
							placeholder='Enter your email'
							className='border-white/20'
						/>
						<Button className='bg-white text-black'>Subscribe</Button>
					</div>
				</div>
			</div>

			<div className='w-full flex flex-col md:flex-row gap-2 justify-between items-center pt-4'>
				<span>© 2025 Rasengan Labs. All rights reserved.</span>

				<div className='flex flex-row gap-1'>
					<Button
						variant='link'
						className='text-white/70 hover:text-white transition-all'
					>
						Privacy policy
					</Button>
					<Button
						variant='link'
						className='text-white/70 hover:text-white transition-all'
					>
						Terms of service
					</Button>
				</div>
			</div>
		</footer>
	);
};
