import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "@rasenganjs/image";
import { Apple } from "lucide-react";
import { Link } from "rasengan";

export const Cta2 = () => {
	return (
		<section className='w-full flex items-center justify-center'>
			<div className='relative overflow-hidden w-full max-w-[1200px] min-h-[650px] lg:min-h-[400px] mt-16 flex flex-col lg:flex-row md:items-center text-[#0F2D0D] dark:text-white md:justify-between gap-8 rounded-4xl bg-[#06976E]/50 dark:bg-[#078460] px-8 md:px-12 lg:py-20 py-10'>
				<div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-start'>
					<h1 className='text-4xl md:text-5xl font-bold lg:max-w-[500px] mb-4 text-pretty'>
						Take full control of your home
					</h1>
					<p className='md:max-w-[500px] text-pretty'>
						From lights to locks, manage everything effortlessly from one place.
					</p>

					<div className='mt-6 flex gap-2'>
						<Link to='#'>
							<Button className='rounded-lg bg-black text-white h-12 items-center px-4'>
								<div className='flex items-center justify-center shrink-0'>
									<img
										src='/static/images/icons/appstore.png'
										alt='App Store'
										className='w-6 h-auto'
									/>
								</div>
								<div className='flex flex-col items-start leading-2'>
									<span className='text-[10px]'>Download on the</span>
									<span className='text-lg font-bold'>App Store</span>
								</div>
							</Button>
						</Link>

						<Link to='#'>
							<Button className='rounded-lg bg-black text-white h-12 items-center px-4'>
								<div className='flex items-center justify-center shrink-0'>
									<img
										src='/static/images/icons/playstore.png'
										alt='Google Play'
										className='w-6 h-auto'
									/>
								</div>
								<div className='flex flex-col items-start leading-2'>
									<span className='text-[10px]'>Get it on</span>
									<span className='text-lg font-bold'>Google Play</span>
								</div>
							</Button>
						</Link>
					</div>
				</div>

				<div className='w-full h-full lg:w-1/2 max-w-[700px] lg:max-w-[500px]'>
					<div className='size-[500px] rounded-full absolute top-[350px] lg:top-32 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-6 bg-[#06976E]/20 dark:bg-[#38b08e8e]'>
						<div className='absolute -top-28'>
							<Image
								src='/static/images/mockups/1.png'
								alt='Image'
								width={"520px"}
								height={"auto"}
								className='object-cover'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
