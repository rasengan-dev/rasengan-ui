import { Button } from "@/components/ui/button";
import { Navbar2 } from "@/registry/marketing/elements/headers/navbar2";


const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 3
 *
 * Hero with left text
 */
export const Hero3 = () => {
	return (
		<section className='w-full h-screen min-h-[800px] max-h-[1000px] flex justify-center relative bg-[#0E002D] overflow-hidden'>
			<div className='absolute top-0 left-0 right-0 z-20 max-w-[1500px] mx-auto'>
				<Navbar2 className='bg-transparent border-0 px-4 lg:px-20' />
			</div>

			<div className='z-10 w-full flex flex-col items-center lg:items-start justify-start text-center px-4 lg:px-20 mt-[150px]'>
				<h1 className='text-[50px] lg:text-[70px] leading-[60px] lg:leading-[80px] max-w-[700px] font-bold text-center lg:text-start text-black'>
					Launch Websites. No Code. No Limits.
				</h1>
				<p className='text-lg text-center lg:text-start text-black/70 max-w-[700px] mt-4'>
					Design, build, and publish beautiful websites without writing a single
					line of code. Just drag, drop, and go live.
				</p>

				<div className='mt-10 w-full flex gap-4 justify-center lg:justify-start'>
					<Button className='rounded-fulld'>Start now</Button>
					<Button className='rounded-fulld bg-transparent border-2 border-black text-black hover:bg-white hover:text-black transition-colors duration-300'>
						Contact Sales
					</Button>
				</div>
			</div>

			<div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
				<img
					src={`${registryUrl}/static/images/bg/4.png`}
					alt='Background Image'
					className='object-cover w-full h-full'
					width={"100%"}
					height={"100%"}
				/>
			</div>
		</section>
	);
};
