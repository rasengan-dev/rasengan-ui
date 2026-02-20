import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FloatingNavbar2 } from "@/registry/marketing/elements/headers/navbar5";


const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 2
 *
 * Hero with centered text and floating navbar
 */
export const Hero2 = () => {
	return (
		<section className='w-full h-screen min-h-[800px] max-h-[1000px] flex items-center justify-center relative bg-[#0E002D] overflow-hidden'>
			<div className='absolute top-4 lg:top-10 inset-x-4 z-20 max-w-[800px] mx-auto'>
				<FloatingNavbar2 className='dark bg-[#1D1D1E] border-0 pr-2 py-1 h-auto' />
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
					<Button className='dark rounded-full h-14 px-10'>
						<span>Book a call</span>
						<ArrowRight />
					</Button>
				</div>
			</div>

			<div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
				<img
					src={`${registryUrl}/static/images/bg/7.png`}
					alt='Background Image'
					className='object-cover w-full h-full'
					width={"100%"}
					height={"100%"}
				/>
			</div>
		</section>
	);
};
