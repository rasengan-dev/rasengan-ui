import { Button } from "@/components/ui/button";
import { Navbar1 } from "@/registry/marketing/elements/headers/navbar1";


const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 1
 *
 * Hero with centered text only
 */
export const Hero1 = () => {
	return (
		<section className='w-full h-screen min-h-[800px] max-h-[1000px] flex items-center justify-center relative bg-[#0E002D] overflow-hidden'>
			<div className='absolute top-0 left-0 right-0 z-20 max-w-[1500px] mx-auto'>
				<Navbar1 className='bg-transparent border-0 dark' />
			</div>

			<div className='z-10 w-full flex flex-col items-center justify-center text-center px-4'>
				<h1 className='text-[50px] lg:text-[70px] leading-[60px] lg:leading-[80px] max-w-[700px] font-bold text-center text-white'>
					Launch Websites. No Code. No Limits.
				</h1>
				<p className='text-lg text-center text-gray-300 max-w-[700px] mt-4'>
					Design, build, and publish beautiful websites without writing a single
					line of code. Just drag, drop, and go live.
				</p>

				<div className='mt-10 flex gap-4'>
					<Button className='dark rounded-fulld'>Start now</Button>
					<Button className='rounded-fulld bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300'>
						Contact Sales
					</Button>
				</div>
			</div>

			<div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
				<img
					src={`${registryUrl}/static/images/bg/1.png`}
					alt='Background Image'
					className='object-cover w-full h-full'
					width={"100%"}
					height={"100%"}
				/>
			</div>
		</section>
	);
};
