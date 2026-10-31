import Image from "@rasenganjs/image";
import { Link } from "rasengan";

export default function TestimonialsSection() {
	return (
		<section className='w-full pt-20'>
			<div className='p-4 w-full border-y-[1px] border-y-border'>
				<h1 className='text-[50px] leading-[60px] text-start max-w-[700px] text-foreground text-pretty'>
					Testimonials
				</h1>
				<p className='max-w-[500px] text-start mt-2 text-foreground text-pretty'>
					Here are some testimonials from our satisfied customers.
				</p>
			</div>

			<div className='w-full flex flex-col justify-center items-center min-h-[400px] pt-20 px-4'>
				<div className='p-4 border border-dashed rounded-2xl'>
					<div className='w-full md:w-[400px] overflow-hidden rounded-xl border'>
						<Image
							src='/static/images/testimonials/1.jpeg'
							alt='Shadcn Testimonials'
							width={"100%"}
							height={"auto"}
							className='object-cover scale-102'
						/>
					</div>
				</div>

				<div className='text-foreground mt-4'>
					<h2 className='text-center font-medium'>
						Liked by{" "}
						<Link to='https://twitter.com/shadcn' target='_blank'>
							<span className='text-primary hover:underline'>Shadcn</span> and
							others
						</Link>{" "}
						on X (Twitter)
					</h2>
				</div>
			</div>
		</section>
	);
}
