import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const cards = [
	{
		name: "Jane Cooper",
		status: "Active",
		job: "Regional Paradigm Technician",
		avatar: "/static/images/avatars/1.jpeg",
	},
	{
		name: "Dilane Kombou",
		status: "Active",
		job: "Software Engineer",
		avatar: "/static/images/avatars/2.jpeg",
	},
	{
		name: "Andy Royer",
		status: "Active",
		job: "Software Engineer",
		avatar: "/static/images/avatars/3.jpeg",
	},
	{
		name: "Rosine Tindou",
		status: "Active",
		job: "UI Designer",
		avatar: "/static/images/avatars/4.jpeg",
	},
	{
		name: "Pedro Castanou",
		status: "Active",
		job: "Product Manager",
		avatar: "/static/images/avatars/5.jpeg",
	},
	{
		name: "Emilie Lefevre",
		status: "Active",
		job: "UX/UI Designer",
		avatar: "/static/images/avatars/6.jpeg",
	},
	{
		name: "Rosine Tindou",
		status: "Active",
		job: "UI Designer",
		avatar: "/static/images/avatars/4.jpeg",
	},
	{
		name: "Andy Royer",
		status: "Active",
		job: "Software Engineer",
		avatar: "/static/images/avatars/3.jpeg",
	},
];

export const GridList4 = () => {
	return (
		<div className='w-full h-full px-4 md:px-20 py-4'>
			<section className='w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-30 pb-20'>
				{cards.map((card, index) => (
					<Card key={index} card={card} />
				))}
			</section>
		</div>
	);
};

export const Card = ({ card }: { card: (typeof cards)[0] }) => {
	return (
		<article className='w-full flex flex-col rounded-lg'>
			<img
				src={card.avatar}
				alt='Avatar'
				className='rounded-md w-full aspect-square object-cover hover:scale-95 transition-all'
			/>
			<div className='mt-2 flex flex-col items-start gap-1'>
				<div className='flex items-center gap-2'>
					<h2 className='text-md font-medium text-foreground'>{card.name}</h2>
				</div>
				<span className='text-sm text-muted-foreground'>{card.job}</span>
			</div>
		</article>
	);
};
