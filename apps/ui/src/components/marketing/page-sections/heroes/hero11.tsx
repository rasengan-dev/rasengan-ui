import Image from "@rasenganjs/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play } from "lucide-react";
import { FloatingNavbar1 } from "../../elements/headers";

/**
 * Hero 11
 *
 * Hero with left bottom text and background image
 */
export const Hero11 = () => {
	return (
		<section className='w-full h-screen min-h-[600px] max-h-[1000px] flex flex-col justify-start relative overflow-x-hidden'>
			<div className='fixed top-8 left-0 right-0 z-20 px-4'>
				<FloatingNavbar1 className='border-0 max-w-[800px]' />
			</div>

			<div className='z-10 w-full flex flex-col items-center justify-end text-center mt-[140px] md:mt-[200px] px-4 md:px-10 pb-20'>
				<h1 className='relative z-20 text-[40px] lg:text-[60px] leading-[50px] lg:leading-[60px] max-w-[700px] font-medium text-center text-foreground'>
					Increase productivity, Collaborate{" "}
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF8787] via-[#CA94FF] to-[#FFBF84]'>
						with teams
					</span>
				</h1>
				<p className='relative z-20 text-sm text-center text-foreground/60 max-w-[500px] mt-4'>
					Let AI organize, prioritize, and streamline your workflow
				</p>

				<div className='relative z-20 mt-10 flex gap-4'>
					<Button className='dark rounded-md h-12'>
						<Play />
						<span>Book a demo</span>
					</Button>

					<Button className='rounded-md h-12'>
						<span>Get Started</span>
						<ArrowUpRight />
					</Button>
				</div>

				<div className='relative z-10 mt-6'>
					<div className='relative z-10'>
						<Image
							src='/static/images/hero/5.png'
							alt='Background Image'
							className='object-cover max-w-[1200px] w-full h-auto rounded-3xl '
							width={"100%"}
							height={"auto"}
						/>
					</div>

					<div className='absolute inset-10 bg-[#FF8787] rounded-3xl blur-[100px]'></div>
				</div>
			</div>

			<div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
				<Image
					src='/static/images/bg/11.png'
					alt='Background Image'
					className='object-cover w-full h-full'
					width={"100%"}
					height={"100%"}
				/>
			</div>

			{/* <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/80'></div> */}
		</section>
	);
};
