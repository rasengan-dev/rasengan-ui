import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "rasengan";

export const Cta4 = () => {
	return (
		<section className='w-full flex items-center justify-center'>
			<div className='w-full max-w-[1200px] min-h-[250px] mt-16 flex flex-col lg:flex-row md:items-center text-white md:justify-between gap-8 rounded-4xl bg-[#2D2D2D] px-8 md:px-10 py-10'>
				<div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-start'>
					<h1 className='text-4xl md:text-5xl font-bold lg:max-w-[500px] mb-4 text-pretty'>
						Transform your Body and Mind.
					</h1>
					<p className='md:max-w-[500px] text-pretty'>
						Subscribe to our newsletter and be the first to receive our
						insights, updates and experts tips on new components added
					</p>
					<div className='mt-6 flex gap-2'>
						<Link to='#'>
							<Button className='rounded-full px-6 bg-white hover:bg-white/80 text-black h-12 items-center'>
								Get started
							</Button>
						</Link>
					</div>
				</div>

				<div className='w-full lg:w-1/2 max-w-[700px] lg:max-w-[500px]'>
					<img
						src='/static/images/cta/1.jpeg'
						alt='cta4'
						className='w-full h-auto object-cover rounded-xl'
					/>
				</div>
			</div>
		</section>
	);
};
