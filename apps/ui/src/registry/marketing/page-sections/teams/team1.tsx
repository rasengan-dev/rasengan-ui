import Image from "@rasenganjs/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Navbar3 } from "../../elements/headers";

type Member = {
	name: string;
	role: string;
	image: string;
};

const teams: Member[] = [
	{
		name: "Dilane Kombou",
		role: "Founder & CEO",
		image: "/static/images/teams/dilane-kombou.png",
	},
	{
		name: "Jane Doe",
		role: "CTO",
		image: "/static/images/teams/2.jpeg",
	},
	{
		name: "John Smith",
		role: "Lead Developer",
		image: "/static/images/teams/3.jpeg",
	},
	{
		name: "Bob Brown",
		role: "Marketing Specialist",
		image: "/static/images/teams/5.jpeg",
	},
	{
		name: "Charlie White",
		role: "Data Scientist",
		image: "/static/images/teams/6.jpeg",
	},
	{
		name: "Ethan Blue",
		role: "QA Engineer",
		image: "/static/images/teams/4.jpeg",
	},
	{
		name: "Diana Green",
		role: "Project Manager",
		image: "/static/images/teams/8.jpeg",
	},
	{
		name: "Alice Johnson",
		role: "UX Designer",
		image: "/static/images/teams/7.jpeg",
	},
];

export default function TeamSection1() {
	return (
		<section className='w-full h-auto'>
			<Navbar3 className='px-4 lg:px-40' enableTheme />

			<main className='px-4 lg:px-40 my-18 max-w-[1500px] mx-auto'>
				<div>
					<span className='text-foreground/90'>Our Team</span>
					<h1 className='text-foreground font-medium text-4xl lg:text-5xl leading-[50px] lg:leading-[70px] mt-2 mb-4'>
						Meet our Team
						<br />
						<span className='text-foreground/70'>
							Passionnate. Proactive. Expert.
						</span>
					</h1>
					<p className='text-foreground/90 max-w-[700px]'>
						We lead with care and expertise, ensuring that every project is a
						success. Our team is dedicated to delivering exceptional results, no
						matter the challenge.
					</p>
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
			</main>
		</section>
	);
}

const TeamItem = ({ member }: { member: Member }) => {
	return (
		<article className='w-full hover:scale-95 transition-all duration-300 ease-in-out'>
			<Image
				src={member.image}
				alt={member.name}
				width={"100%"}
				height={300}
				className='object-top'
			/>

			<div className='mt-4'>
				<h2 className='text-md font-medium text-foreground'>{member.name}</h2>
				<p className=' text-sm text-foreground/70'>{member.role}</p>
			</div>
		</article>
	);
};
