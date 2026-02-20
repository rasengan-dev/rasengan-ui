import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import AppLogo from "@/registry/application-ui/granulars/logos/logo1";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 10
 *
 * Hero with left bottom text and background image
 */
export const Hero10 = () => {
	return (
		<section className='w-full h-screen min-h-[600px] max-h-[1000px] flex items-end justify-start relative overflow-hidden'>
			<div className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-10 py-8 max-w-[1500px] mx-auto'>
				<AppLogo size='sm' className='text-white' />

				<nav className='hidden md:block rounded-full h-12 px-4 py-2 backdrop-blur-sm border-white/30 bg-white/10 border-[1px]'>
					<ul className='flex items-center gap-8 text-white/70 text-sm'>
						<a href='#'>
							<li className='font-medium px-3 py-1 rounded-full hover:text-white'>
								Home
							</li>
						</a>
						<a href='#'>
							<li className='font-medium px-3 py-1 rounded-full hover:text-white'>
								About
							</li>
						</a>
						<a href='#'>
							<li className='font-medium px-3 py-1 rounded-full hover:text-white'>
								Contact
							</li>
						</a>
						<a href='#'>
							<li className='font-medium px-3 py-1 rounded-full hover:text-white'>
								Blog
							</li>
						</a>
					</ul>
				</nav>

				<div className='flex gap-4'>
					<Button
						variant={"outline"}
						className='rounded-full backdrop-blur-sm border-white/30 bg-white/10 text-white/70 h-12'
					>
						<span>Get in touch</span>
						<ArrowUpRight />
					</Button>
				</div>
			</div>

			<div className='z-10 w-full flex flex-col items-center md:items-start justify-end text-center px-4 md:px-10 pb-20'>
				<Badge className='mb-4 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 bg-white/10 text-white/70 cursor-default'>
					Trust by thousands of happy guests
				</Badge>
				<h1 className='text-[40px] lg:text-[60px] leading-[50px] lg:leading-[60px] max-w-[700px] font-bold text-center md:text-start text-white'>
					Where every stay becomes a memory
				</h1>
				<p className='text-sm text-center md:text-start text-gray-300 max-w-[500px] mt-4'>
					Exceptional villas in breath-taking destinations. We curate stays that
					feel personal luxurious and unforgettable.
				</p>

				<div className='mt-10 flex gap-4'>
					<Button className='dark rounded-full h-12'>
						<span>Book your stay</span>
						<ArrowUpRight />
					</Button>

					<Button
						variant={"outline"}
						className='rounded-full border-white/30 bg-white/10 text-white/70 h-12'
					>
						<span>Explore villas</span>
					</Button>
				</div>
			</div>

			<div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
				<img
					src={`${registryUrl}/static/images/bg/9.jpeg`}
					alt='Background Image'
					className='object-cover w-full h-full'
					width={"100%"}
					height={"100%"}
				/>
			</div>

			<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/80'></div>
		</section>
	);
};
