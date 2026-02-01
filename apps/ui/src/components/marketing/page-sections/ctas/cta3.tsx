import { Button } from "@/components/ui/button";
import Image from "@rasenganjs/image";
import { Link } from "rasengan";

export const Cta3 = () => {
	return (
		<section className='w-full flex items-center justify-center'>
			<div className='relative overflow-hidden w-full max-w-[1200px] min-h-[250px] mt-16 flex flex-col lg:flex-row md:items-center text-white md:justify-between gap-8 rounded-4xl bg-[#282828] px-8 md:px-12 lg:py-20 py-10'>
				<div className='w-full flex flex-col items-center text-center'>
					<div className='mb-4 flex items-center gap-2 rounded-full p-1 pr-4 bg-white'>
						<span className='bg-[#D06237] text-white rounded-full px-2 py-1 text-xs'>
							New
						</span>
						<span className='text-black text-sm'>
							Connect, Engage, and Grow with our tool
						</span>
					</div>
					<h1 className='text-4xl md:text-5xl font-bold mb-4 text-pretty'>
						Start building stronger{" "}
						<span className='text-[#D06237]'>connections</span>
					</h1>
					<p className='md:max-w-[700px] text-pretty'>
						Sign up for free and start building stronger connections with your
						team.
					</p>

					<div className='mt-6 flex gap-2'>
						<Link to='#'>
							<Button className='rounded-full px-6 bg-white text-black h-12 items-center'>
								Get started
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
