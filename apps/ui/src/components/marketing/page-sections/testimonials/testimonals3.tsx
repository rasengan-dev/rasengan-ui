import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useObserver } from "@/hooks/use-observer";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Testimonial = {
	name: string;
	role: string;
	image: string;
	testimonial: string;
	company: string;
	companyImage: string;
};

const testimonials: Testimonial[] = [
	{
		name: "Dilane Kombou",
		role: "Founder & CEO",
		image: "/static/images/teams/dilane-kombou.png",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/dilane-kombou.png",
	},
	{
		name: "Jane Doe",
		role: "CTO",
		image: "/static/images/teams/2.jpeg",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/2.jpeg",
	},
	{
		name: "John Smith",
		role: "Lead Developer",
		image: "/static/images/teams/3.jpeg",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/3.jpeg",
	},
	{
		name: "Bob Brown",
		role: "Marketing Specialist",
		image: "/static/images/teams/5.jpeg",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/5.jpeg",
	},
	{
		name: "Charlie White",
		role: "Data Scientist",
		image: "/static/images/teams/6.jpeg",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/6.jpeg",
	},
	{
		name: "Ethan Blue",
		role: "QA Engineer",
		image: "/static/images/teams/4.jpeg",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/4.jpeg",
	},
	{
		name: "Diana Green",
		role: "Project Manager",
		image: "/static/images/teams/8.jpeg",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/8.jpeg",
	},
	{
		name: "Alice Johnson",
		role: "UX Designer",
		image: "/static/images/teams/7.jpeg",
		testimonial:
			"Rasengan UI is the best UI framework I've ever used. It's so easy to use and it's so fast. Compatible with all major React frameworks. Themable and customizable with Shadcn UI.",
		company: "Rasengan Labs",
		companyImage: "/static/images/teams/7.jpeg",
	},
];

export const Testimonials3 = () => {
	return (
		<section className='w-full max-w-[1000px] mx-auto flex flex-col items-start mt-20 px-4'>
			<Badge className='rounded-full px-4 py-2'>Testimonials</Badge>
			<h2 className='text-4xl font-bold mt-2 text-foreground text-center text-pretty'>
				Customer Success Stories
			</h2>

			<div className='mt-20 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{testimonials.map((testimonial, index) => (
					<TestimonialItem key={index} testimonial={testimonial} />
				))}
			</div>
		</section>
	);
};

const TestimonialItem = ({ testimonial }: { testimonial: Testimonial }) => {
	const [hover, setHover] = useState(false);
	const testimonialRef = useRef<HTMLElement>(null);
	const isVisible = useObserver(testimonialRef);

	const handleScroll = useCallback(() => {
		if (!isVisible) {
			testimonialRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [isVisible]);

	useEffect(() => {
		if (hover) {
			handleScroll();
		}
	}, [hover]);

	return (
		<article
			ref={testimonialRef}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className='relative w-full h-[350px] hover:cursor-grab duration-300 ease-in-out flex flex-col md:flex-row gap-4 rounded-2xl'
		>
			<div
				className={cn(
					"z-20 w-full absolute transition-all duration-300 inset-0 rounded-xl p-6 bg-muted dark:bg-[#131821] min-h-[300px] flex flex-col justify-between border hover:border-[#c4d0e7] dark:hover:border-[#2B3548]",
					hover && "-translate-y-14 -rotate-6"
				)}
			>
				<div className='flex items-center justify-between'>
					<Quote size={24} className='text-blue-400' />
				</div>

				<p className=' text-sm text-foreground/70'>{testimonial.testimonial}</p>

				<div className='w-full flex items-center justify-between'>
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
			</div>

			<div className='w-full h-full bg-blue-500 absolute inset-0 rounded-xl z-[1] flex flex-col justify-end py-2'>
				<Button
					variant={"link"}
					className={cn(
						"text-white -translate-y-20 transition-all duration-300",
						hover && "translate-y-0"
					)}
				>
					View Company
				</Button>
			</div>
		</article>
	);
};
