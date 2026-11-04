import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Cta1 = () => {
	return (
		<section className='w-full flex items-center justify-center'>
			<div className='w-full max-w-[1200px] min-h-[250px] mt-16 flex flex-col lg:flex-row md:items-center text-white md:justify-between gap-8 rounded-4xl bg-[#0C4243] px-8 md:px-12 lg:py-20 py-10'>
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
		</section>
	);
};
