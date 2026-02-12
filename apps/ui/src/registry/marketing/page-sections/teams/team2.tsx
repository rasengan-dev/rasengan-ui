import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Navbar2 } from "@/registry/marketing/elements/headers/navbar2";

type Member = {
	name: string;
	role: string;
	image: string;
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

const teams: Member[] = [
	{
		name: "Dilane Kombou",
		role: "Founder & CEO",
		image: `${registryUrl}/static/images/teams/dilane-kombou.png`,
	},
	{
		name: "Jane Doe",
		role: "CTO",
		image: `${registryUrl}/static/images/teams/2.jpeg`,
	},
	{
		name: "John Smith",
		role: "Lead Developer",
		image: `${registryUrl}/static/images/teams/3.jpeg`,
	},
	{
		name: "Bob Brown",
		role: "Marketing Specialist",
		image: `${registryUrl}/static/images/teams/5.jpeg`,
	},
	{
		name: "Charlie White",
		role: "Data Scientist",
		image: `${registryUrl}/static/images/teams/6.jpeg`,
	},
	{
		name: "Ethan Blue",
		role: "QA Engineer",
		image: `${registryUrl}/static/images/teams/4.jpeg`,
	},
	{
		name: "Diana Green",
		role: "Project Manager",
		image: `${registryUrl}/static/images/teams/8.jpeg`,
	},
	{
		name: "Alice Johnson",
		role: "UX Designer",
		image: `${registryUrl}/static/images/teams/7.jpeg`,
	},
];

export default function TeamSection2() {
	return (
		<section className='grid-section min-h-screen w-full h-auto '>
			<Navbar2 className='px-4 lg:px-40 border-0' enableTheme />

			<main className='px-4 lg:px-40 my-18 max-w-[1500px] mx-auto'>
				<div className='w-full flex flex-col items-center justify-center'>
					<h1 className='text-foreground font-medium text-4xl text-center lg:text-5xl leading-[50px] lg:leading-[70px] mt-2 mb-4'>
						Meet{" "}
						<div className='h-[20px] lg:h-[26px] inline-flex flex-col translate-y-[4px] lg:translate-y-[8px] leading-6 lg:leading-8 overflow-clip bg-amber-200g'>
							<div className='inline-flex flex-col -translate-y-[20px] lg:-translate-y-[28px]'>
								<span className=''>o</span>
								<span>o</span>
							</div>
						</div>
						ur beautiful team
					</h1>
					<p className='text-foreground/90 max-w-[560px] text-center'>
						Our philosophy is simple, hire great people and give them the
						ressources and supports to do their best work.
					</p>

					<div className='mt-8 flex items-center justify-center gap-4'>
						<Button variant={"outline"} className='text-foreground'>
							<Play size={18} />
							<span>Book a demo</span>
						</Button>
						<Button>
							<span>Start now</span>
						</Button>
					</div>
				</div>

				<div className='relative mt-20 md:mt-10'>
					<Carousel
						className='w-full relative'
						opts={{
							align: "start",
							loop: true,
						}}
					>
						<CarouselContent>
							{teams.map((member, index) => (
								<CarouselItem
									className='basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4'
									key={index}
								>
									<TeamItem member={member} />
								</CarouselItem>
							))}
						</CarouselContent>
						<div className='absolute -top-10 right-8'>
							<CarouselPrevious className='bg-white dark:bg-white hover:bg-white/80 dark:hover:bg-white/80 hover:text-black/90 dark:border-transparent' />
						</div>

						<div className='absolute -top-10 right-12'>
							<CarouselNext
								size={"icon"}
								className='bg-white dark:bg-white hover:bg-white/80 dark:hover:bg-white/80 hover:text-black/90 dark:border-transparent'
							/>
						</div>
					</Carousel>
				</div>

				<div className='mt-20'>
					<p className='max-w-[700px] text-foreground/90 text-center mx-auto font-medium text-lg'>
						We've been blown away by the support from Rasengan Labs. We
						suggested an improvement to our account manager and they implemented
						it a few days!
					</p>

					<div className='mt-4 flex flex-col items-center justify-center'>
						<img
							src={"/static/images/avatars/1.jpeg"}
							alt='Testimonial Avatar'
							className='rounded-full'
							width={40}
							height={40}
						/>
						<div className='mt-2 text-center'>
							<p className='text-foreground font-medium'>Amélie Laurent</p>
							<p className='text-foreground/70 text-sm'>CTO, Beyond Systems</p>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
}

const TeamItem = ({ member }: { member: Member }) => {
	return (
		<article className='relative w-full hover:scale-95 transition-all duration-300 ease-in-out'>
			<img
				src={member.image}
				alt={member.name}
				className='object-top object-cover w-full h-[320px]'
			/>

			<div className='mt-4 absolute inset-x-4 bottom-4 bg-white p-4 rounded-lg'>
				<h2 className='text-md font-medium text-black'>{member.name}</h2>
				<p className=' text-sm text-black/70'>{member.role}</p>
			</div>
		</article>
	);
};
