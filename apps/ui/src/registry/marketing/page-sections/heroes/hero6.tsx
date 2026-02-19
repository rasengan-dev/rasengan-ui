import { Button } from "@/components/ui/button";
import { Navbar1 } from "@/registry/marketing/elements/headers/navbar1";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 6
 *
 * Hero with centered text and image
 */
export const Hero6 = () => {
	return (
		<section className='w-full min-h-[800px] flex flex-col items-center relative overflow-hidden pb-20'>
			<div className='absolute top-0 left-0 right-0 z-20 max-w-[1500px] mx-auto'>
				<Navbar1 className='bg-transparent border-0' />
			</div>

			<div className='z-20 w-full flex flex-col items-center justify-center text-center px-4 mt-28'>
				<h1 className='text-[40px] lg:text-[60px] leading-[50px] lg:leading-[60px] max-w-[600px] lg:max-w-[1000px] font-bold text-center text-foreground'>
					Manage Your Development Tasks with Ease
				</h1>
				<p className='text-lg text-center text-foreground max-w-[700px] mt-4'>
					Unlock the full potential of your startup with our tailored services
					designed to guide you through every stage of growth.
				</p>

				<div className='mt-10 flex gap-4'>
					<Button className='rounded-full'>Start Free Trial</Button>
					<Button
						variant={"outline"}
						className='rounded-full border-foreground'
					>
						Contact Sales
					</Button>
				</div>
			</div>

			<div className='relative z-10 mt-6'>
				<div className='relative z-10 px-4'>
					<img
						src={`${registryUrl}/static/images/hero/2.png`}
						alt='Background Image'
						className='object-cover max-w-[1200px] w-full h-auto rounded-3xl '
						width={"100%"}
						height={"auto"}
					/>
				</div>

				<div className='absolute inset-0 bg-[#699cf4] rounded-3xl blur-[100px]'></div>
			</div>

			<div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
				<img
					src={`${registryUrl}/static/images/bg/3.png`}
					alt='Background Image'
					className='object-cover w-full h-full'
					width={"100%"}
					height={"100%"}
				/>
			</div>
		</section>
	);
};
