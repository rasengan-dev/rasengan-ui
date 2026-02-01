import Image from "@rasenganjs/image";
import { Button } from "@/components/ui/button";
import { Dot, Mail, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navbar2 } from "../../elements/headers";

type Member = {
	name: string;
	role: string;
	image: string;
	description?: string;
};

const teams: Member[] = [
	{
		name: "Dilane Kombou",
		role: "Founder & CEO",
		image: "/static/images/teams/dilane-kombou.png",
		description:
			"Founder and CEO of Rasengan Labs, leading the team with vision and innovation.",
	},
	{
		name: "Jane Doe",
		role: "CTO",
		image: "/static/images/teams/2.jpeg",
		description:
			"Chief Technology Officer, overseeing all technical aspects and strategy.",
	},
	{
		name: "John Smith",
		role: "Lead Developer",
		image: "/static/images/teams/3.jpeg",
		description:
			"Lead Developer, responsible for the core development of our products.",
	},
	{
		name: "Bob Brown",
		role: "Marketing Specialist",
		image: "/static/images/teams/5.jpeg",
		description:
			"Marketing Specialist, driving our brand and outreach strategies.",
	},
	{
		name: "Charlie White",
		role: "Data Scientist",
		image: "/static/images/teams/6.jpeg",
		description:
			"Data Scientist, analyzing data to drive insights and decisions.",
	},
	{
		name: "Ethan Blue",
		role: "QA Engineer",
		image: "/static/images/teams/4.jpeg",
		description:
			"QA Engineer, ensuring the quality and reliability of our products.",
	},
	{
		name: "Diana Green",
		role: "Project Manager",
		image: "/static/images/teams/8.jpeg",
		description:
			"Project Manager, coordinating projects and ensuring timely delivery.",
	},
	{
		name: "Alice Johnson",
		role: "UX Designer",
		image: "/static/images/teams/7.jpeg",
		description:
			"UX Designer, crafting user experiences that delight and engage.",
	},
];

export default function TeamSection4() {
	return (
		<section className='min-h-screenf w-full h-auto pb-20'>
			<Navbar2 className='px-4 lg:px-20 border-0' enableTheme />

			<main className='px-4 lg:px-20 my-18 max-w-[1500px] mx-auto'>
				<div className='w-full flex flex-col'>
					<div>
						<Badge className='rounded-full px-4 pl-2 py-1'>
							<Dot className='text-green-500' size={30} />
							<span>Meet the Team</span>
						</Badge>
					</div>
					<div className='flex flex-col lg:flex-row lg:items-center justify-between'>
						<h1 className='max-w-[600px] text-start text-foreground font-medium text-4xl lg:text-5xl leading-[50px] lg:leading-[60px] mt-2 mb-4'>
							The people behind Rasengan UI
						</h1>
						<p className='text-start text-foreground/70 max-w-[560px]'>
							We are a team of dedicated advisors with a shared purpose: Provide
							great and nice UI components to our users.
							<br />
							With a background of Designer, Developer and Product Manager, we
							are committed to delivering the best possible experience to our
							users.
						</p>
					</div>

					{/* <div className='mt-8 flex items-center justify-center gap-4'>
						<Button variant={"outline"} className='text-foreground'>
							<Play size={18} />
							<span>Book a demo</span>
						</Button>
						<Button>
							<span>Start now</span>
						</Button>
					</div> */}
				</div>

				<div className='relative mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20'>
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
			<Image
				src={member.image}
				alt={member.name}
				width={"100%"}
				height={350}
				className='object-top rounded-2xl'
			/>

			<div className='mt-4 rounded-lg'>
				<p className=' text-sm text-foreground/70 font-medium'>{member.role}</p>
				<h2 className='text-md font-medium text-foreground'>{member.name}</h2>
				{/* <p className='text-sm text-foreground/70 mt-1'>{member.description}</p> */}
			</div>

			<div className='mt-4 flex items-center justify-center gap-4'>
				<Button variant={"outline"} className='text-foreground w-full'>
					<Play size={18} />
					<span>Book a demo</span>
				</Button>
				<Button className='w-full'>
					<Mail size={18} />
					<span>Contact</span>
				</Button>
			</div>
		</article>
	);
};
