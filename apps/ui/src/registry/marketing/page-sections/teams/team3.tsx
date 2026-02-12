import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navbar2 } from "@/registry/marketing/elements/headers/navbar2";

type Member = {
	name: string;
	role: string;
	image: string;
	description?: string;
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

const teams: Member[] = [
	{
		name: "Dilane Kombou",
		role: "Founder & CEO",
		image: `${registryUrl}/static/images/teams/dilane-kombou.png`,
		description:
			"Founder and CEO of Rasengan Labs, leading the team with vision and innovation.",
	},
	{
		name: "Jane Doe",
		role: "CTO",
		image: `${registryUrl}/static/images/teams/2.jpeg`,
		description:
			"Chief Technology Officer, overseeing all technical aspects and strategy.",
	},
	{
		name: "John Smith",
		role: "Lead Developer",
		image: `${registryUrl}/static/images/teams/3.jpeg`,
		description:
			"Lead Developer, responsible for the core development of our products.",
	},
	{
		name: "Bob Brown",
		role: "Marketing Specialist",
		image: `${registryUrl}/static/images/teams/5.jpeg`,
		description:
			"Marketing Specialist, driving our brand and outreach strategies.",
	},
	{
		name: "Charlie White",
		role: "Data Scientist",
		image: `${registryUrl}/static/images/teams/6.jpeg`,
		description:
			"Data Scientist, analyzing data to drive insights and decisions.",
	},
	{
		name: "Ethan Blue",
		role: "QA Engineer",
		image: `${registryUrl}/static/images/teams/4.jpeg`,
		description:
			"QA Engineer, ensuring the quality and reliability of our products.",
	},
	{
		name: "Diana Green",
		role: "Project Manager",
		image: `${registryUrl}/static/images/teams/8.jpeg`,
		description:
			"Project Manager, coordinating projects and ensuring timely delivery.",
	},
	{
		name: "Alice Johnson",
		role: "UX Designer",
		image: `${registryUrl}/static/images/teams/7.jpeg`,
		description:
			"UX Designer, crafting user experiences that delight and engage.",
	},
];

export default function TeamSection3() {
	return (
		<section className='min-h-screen w-full h-auto'>
			<Navbar2 className='px-4 lg:px-20 border-0' enableTheme />

			<main className='px-4 lg:px-20 my-18 max-w-[1500px] mx-auto'>
				<div className='w-full flex flex-col items-center justify-center'>
					<Badge variant={"outline"}>We're hiring!</Badge>
					<h1 className='max-w-[600px] text-center text-foreground font-bold text-4xl lg:text-5xl leading-[50px] lg:leading-[60px] mt-2 mb-4'>
						We are the people who make up Rasengan UI
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

				<div className='relative mt-20 md:mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20'>
					{teams.map((member, index) => (
						<TeamItem key={index} member={member} />
					))}
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
				className='object-top rounded-2xl object-cover w-full h-[300px]'
			/>

			<div className='mt-4 rounded-lg'>
				<h2 className='text-md font-medium text-foreground'>{member.name}</h2>
				<p className=' text-sm text-foreground/90 font-medium'>{member.role}</p>
				<p className='text-sm text-foreground/70 mt-1'>{member.description}</p>
			</div>
		</article>
	);
};
