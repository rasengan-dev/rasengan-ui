import { Button } from "@/components/ui/button";
import AppLogo from "@/registry/application-ui/granulars/logos/logo1";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 7
 *
 * Hero with centered text and image
 */
export const Hero7 = () => {
	return (
		<section className='dark w-full min-h-[800px] flex flex-col items-center relative bg-[#1C1C1C] overflow-hidden pb-20'>
			<div className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 lg:px-10 py-8 max-w-[1500px] mx-auto'>
				<AppLogo size='sm' />

				<nav className='hidden lg:block rounded-full h-12 px-4 py-2 border-foreground/10 border-[1px]'>
					<ul className='flex items-center gap-8 text-foreground text-sm'>
						<a href='#'>
							<li className='font-medium text-foreground px-3 py-1 rounded-full'>
								Home
							</li>
						</a>
						<a href='#'>
							<li className='font-medium text-foreground/70 px-3 py-1 rounded-full hover:text-foreground'>
								About
							</li>
						</a>
						<a href='#'>
							<li className='font-medium text-foreground/70 px-3 py-1 rounded-full hover:text-foreground'>
								Contact
							</li>
						</a>
						<a href='#'>
							<li className='font-medium text-foreground/70 px-3 py-1 rounded-full hover:text-foreground'>
								Blog
							</li>
						</a>
					</ul>
				</nav>

				<div className='flex gap-4'>
					<Button className='rounded-full h-12'>Sign In</Button>
					<Button
						variant={"outline"}
						className='rounded-full bg-transparent text-foreground h-12 border-foreground/10'
					>
						Get Started
					</Button>
				</div>
			</div>

			<div className='z-20 w-full flex flex-col items-center justify-center text-center px-4 mt-28'>
				<h1 className='text-[40px] lg:text-[60px] leading-[50px] lg:leading-[60px] max-w-[600px] lg:max-w-[1000px] font-bold text-center text-foreground'>
					The Ultimate Dashboard for Freelancers and Teams
				</h1>
				<p className='text-lg text-center text-foreground max-w-[700px] mt-4'>
					Boost your productivity and streamline your workflow with Organized,
					Track your achievements to stay motivated.
				</p>

				<div className='mt-10 flex gap-4'>
					<Button className='rounded-full h-12'>Get Started</Button>
					<Button
						variant={"outline"}
						className='rounded-full border-foreground/10 bg-transparent text-foreground h-12'
					>
						How it Works
					</Button>
				</div>
			</div>

			<div className='relative z-10 mt-6'>
				<div className='relative z-10 px-4'>
					<img
						src={`${registryUrl}/static/images/hero/3.png`}
						alt='Background Image'
						className='object-cover max-w-[1200px] w-full h-auto rounded-3xl '
						width={"100%"}
						height={"auto"}
					/>
				</div>

				<div className='absolute inset-0 bg-[#75538d] rounded-3xl blur-[100px]'></div>
			</div>
		</section>
	);
};
