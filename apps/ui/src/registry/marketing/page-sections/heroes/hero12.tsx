import { Button } from "@/components/ui/button";
import AppLogo from "@/registry/application-ui/granulars/logos/logo1";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 10
 *
 * Hero with left bottom text and background image
 */
export const Hero12 = () => {
	return (
		<section className='w-full h-screen bg-[#020208] min-h-[600px] max-h-[1000px] flex flex-col justify-start relative overflow-x-hidden'>
			<div className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 lg:px-10 py-4 max-w-[1500px] mx-auto'>
				<div className='flex items-center gap-4'>
					<AppLogo size='sm' className='text-white' />

					<nav className='hidden lg:block px-4 py-2'>
						<ul className='flex items-center gap-4 text-white/70 text-sm'>
							<a href='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>Home</li>
							</a>
							<a href='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>
									About
								</li>
							</a>
							<a href='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>
									Contact
								</li>
							</a>
							<a href='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>Blog</li>
							</a>
						</ul>
					</nav>
				</div>

				<div className='flex gap-4'>
					<Button className='bg-transparent text-white'>Login</Button>
					<Button className='bg-primary/70 text-white'>Get Started</Button>
				</div>
			</div>

			<div className='z-10 w-full flex flex-col items-center justify-end text-center mt-[140px] md:mt-[200px] px-4 md:px-10 pb-20'>
				<h1 className='relative z-20 text-[40px] lg:text-[50px] leading-[50px] lg:leading-[60px] max-w-[600px] font-medium text-center text-white text-pretty'>
					Stay Ahead With Real Time Price Alerts
				</h1>
				<p className='relative z-20 text-sm text-center text-white/60 max-w-[400px] mt-4 text-pretty'>
					Automatically monitor competitor prices and adjust your offers to stay
					competitive 24/7.
				</p>

				<div className='relative z-20 mt-10 flex gap-4'>
					<Button className='bg-white hover:bg-white/80 text-black'>
						<span>Start Tracking</span>
					</Button>

					<Button className='bg-primary/70 text-white'>
						<span>See Live Chart</span>
					</Button>
				</div>
			</div>

			<div className='relative z-20 w-full flex flex-col items-center gap-4 mt-auto pb-20 px-4'>
				<p className='text-white/70 text-center'>
					Tracking data from{" "}
					<span className='text-white font-medium'>1000+ most popular</span>{" "}
					stores worldwide
				</p>
				<Brands1 />
			</div>

			<div className='absolute top-24 left-0 right-0 bottom-0 w-full'>
				<img
					src={`${registryUrl}/static/images/bg/12.png`}
					alt='Background Image'
					className='object-cover w-full h-full'
				/>
			</div>

			{/* <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/80'></div> */}
		</section>
	);
};


export const Brands1 = () => {
	return (
		<div className='flex items-start justify-center flex-wrap gap-x-8 gap-y-4'>
			<img
				src={`${registryUrl}/static/images/brands/white/1.png`}
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src={`${registryUrl}/static/images/brands/white/2.png`}
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src={`${registryUrl}/static/images/brands/white/3.png`}
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src={`${registryUrl}/static/images/brands/white/4.png`}
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src={`${registryUrl}/static/images/brands/white/5.png`}
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
		</div>
	);
};