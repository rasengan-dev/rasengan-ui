import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

type Testimonial = {
	name: string;
	role: string;
	image: string;
	testimonial: string;
	company: string;
	companyImage: string;
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

const testimonials: Testimonial[] = [
	{
		name: "Dilane Kombou",
		role: "Founder & CEO",
		image: `${registryUrl}/static/images/teams/dilane-kombou.png`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/dilane-kombou.png`,
	},
	{
		name: "Jane Doe",
		role: "CTO",
		image: `${registryUrl}/static/images/teams/2.jpeg`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/2.jpeg`,
	},
	{
		name: "John Smith",
		role: "Lead Developer",
		image: `${registryUrl}/static/images/teams/3.jpeg`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/3.jpeg`,
	},
	{
		name: "Bob Brown",
		role: "Marketing Specialist",
		image: `${registryUrl}/static/images/teams/5.jpeg`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/5.jpeg`,
	},
	{
		name: "Charlie White",
		role: "Data Scientist",
		image: `${registryUrl}/static/images/teams/6.jpeg`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/6.jpeg`,
	},
	{
		name: "Ethan Blue",
		role: "QA Engineer",
		image: `${registryUrl}/static/images/teams/4.jpeg`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/4.jpeg`,
	},
	{
		name: "Diana Green",
		role: "Project Manager",
		image: `${registryUrl}/static/images/teams/8.jpeg`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/8.jpeg`,
	},
	{
		name: "Alice Johnson",
		role: "UX Designer",
		image: `${registryUrl}/static/images/teams/7.jpeg`,
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: `${registryUrl}/static/images/teams/7.jpeg`,
	},
];

export const Testimonials1 = () => {
	return (
		<section className='w-full max-w-[1000px] mx-auto flex flex-col items-center mt-20 px-4'>
			<Badge className='rounded-full px-4 py-2'>Testimonials</Badge>
			<h2 className='text-4xl font-bold mt-2 text-foreground text-center text-pretty'>
				What our customers say
			</h2>
			<p className='text-foreground/70 mt-2 text-center text-pretty'>
				Here are some testimonials from our satisfied customers.
			</p>

			<div className='relative mt-10 w-full'>
				<Carousel
					className='w-full relative'
					opts={{
						align: "start",
						loop: true,
					}}
				>
					<CarouselContent>
						{testimonials.map((testimonial, index) => (
							<CarouselItem className='basis-full transition-all' key={index}>
								<TestimonialItem testimonial={testimonial} />
							</CarouselItem>
						))}
					</CarouselContent>
					<div className='absolute -bottom-12 left-1/2 -translate-x-1/2'>
						<CarouselPrevious className='bg-white dark:bg-white hover:bg-white/80 dark:hover:bg-white/80 hover:text-black/90 dark:border-transparent' />
					</div>

					<div className='absolute -bottom-12 left-1/2 -translate-x-1/2'>
						<CarouselNext
							size={"icon"}
							className='bg-white dark:bg-white hover:bg-white/80 dark:hover:bg-white/80 hover:text-black/90 dark:border-transparent'
						/>
					</div>
				</Carousel>
			</div>
		</section>
	);
};

const TestimonialItem = ({ testimonial }: { testimonial: Testimonial }) => {
	return (
		<article className='w-full hover:cursor-grab duration-300 ease-in-out p-6 flex flex-col md:flex-row gap-4 border hover:border-[#c4d0e7] dark:hover:border-[#2B3548] rounded-2xl bg-gradient-to-b from-[#c4d0e7]/50 dark:from-[#2B3548] to-transparent'>
			<div className='flex flex-row-reverse md:flex-col justify-between w-full md:w-1/2'>
				<div className='flex items-center gap-2'>
					<img
						src={"/rasengan.svg"}
						alt='Rasengan Labs Logo'
						width={35}
						height={35}
						className='rounded-full size-[40px] aspect-square object-cover hover:scale-95 transition-all'
					/>
					<span className='text-xs sm:text-sm font-medium text-foreground'>
						Rasengan Labs
					</span>
				</div>
				<div className='flex items-center gap-4'>
					<img
						src={testimonial.image}
						alt='Avatar'
						width={50}
						height={50}
						className='rounded-full size-[40px] aspect-square object-cover hover:scale-95 transition-all'
					/>
					<div className='flex flex-col items-start gap-1'>
						<div className='flex items-center gap-2'>
							<h2 className='text-md font-medium text-foreground'>
								{testimonial.name}
							</h2>
						</div>
						<span className='text-sm text-muted-foreground'>
							{testimonial.role}
						</span>
					</div>
				</div>
			</div>

			<div className='w-full md:w-1/2 rounded-xl p-6 bg-muted dark:bg-[#131821] min-h-[300px] flex flex-col justify-between'>
				<div className='w-full flex gap-2 text-yellow-500'>
					{Array.from({ length: 5 }, (_, index) => (
						<Star key={index} size={18} />
					))}
				</div>
				<p className=' text-sm text-foreground/70'>{testimonial.testimonial}</p>
				<div>
					<Button>Read More</Button>
				</div>
			</div>
		</article>
	);
};
