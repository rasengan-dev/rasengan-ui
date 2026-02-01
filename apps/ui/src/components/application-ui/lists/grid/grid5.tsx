import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ArrowUpRight,
	Banknote,
	Calendar,
	Coins,
	DollarSign,
	ExternalLink,
	Leaf,
	Mail,
	Phone,
	Rocket,
	Sparkles,
	Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
	{
		title: "Reach many users",
		description: `Chakra-infused UI sections for any React app — Next.js, Remix, TanStack, React Router, and more.
Themeable, responsive, and powered by Shadcn UI — just drop them into your project and build faster.`,
		icon: <Users size={18} />,
		color: "#F1FDFA",
		iconColor: "#00786F",
	},
	{
		title: "Schedule your appointments",
		description: `Chakra-infused UI sections for any React app — Next.js, Remix, TanStack, React Router, and more.
Themeable, responsive, and powered by Shadcn UI — just drop them into your project and build faster.`,
		icon: <Calendar size={18} />,
		color: "#FEFCE8",
		iconColor: "#A65F00",
	},
	{
		title: "Earn much money",
		description: `Chakra-infused UI sections for any React app — Next.js, Remix, TanStack, React Router, and more.
Themeable, responsive, and powered by Shadcn UI — just drop them into your project and build faster.`,
		icon: <Banknote size={18} />,
		color: "#FFF2F2",
		iconColor: "#C60036",
	},
	{
		title: "Make your app unique",
		description: `Chakra-infused UI sections for any React app — Next.js, Remix, TanStack, React Router, and more.
Themeable, responsive, and powered by Shadcn UI — just drop them into your project and build faster.`,
		icon: <Sparkles size={18} />,
		color: "#EFF2FF",
		iconColor: "#432DD7",
	},
	{
		title: "Build reliable apps",
		description: `Chakra-infused UI sections for any React app — Next.js, Remix, TanStack, React Router, and more.
Themeable, responsive, and powered by Shadcn UI — just drop them into your project and build faster.`,
		icon: <Leaf size={18} />,
		color: "#EFF9FF",
		iconColor: "#0069A9",
	},
	{
		title: "Boost your productivity",
		description: `Chakra-infused UI sections for any React app — Next.js, Remix, TanStack, React Router, and more.
Themeable, responsive, and powered by Shadcn UI — just drop them into your project and build faster.`,
		icon: <Rocket size={18} />,
		color: "#F5F5F5",
		iconColor: "#111",
	},
];

export const GridList5 = () => {
	return (
		<div className='w-full h-full px-4 md:px-20 py-4'>
			<section className='w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 mt-20 rounded-lg overflow-hidden border border-border'>
				{cards.map((card, index) => (
					<Card
						key={index}
						card={card}
						className={cn(
							index % 2 === 0 && "md:border-r border-border",
							"border-b"
						)}
					/>
				))}
			</section>
		</div>
	);
};

export const Card = ({
	card,
	className,
}: {
	card: (typeof cards)[0];
	className?: string;
}) => {
	return (
		<article className={cn("w-full flex flex-col p-4", className)}>
			<div className='w-full h-auto flex items-center justify-between gap-2'>
				<div
					className='size-12 rounded-md flex items-center justify-center'
					style={{ backgroundColor: card.color }}
				>
					<span style={{ color: card.iconColor }}>{card.icon}</span>
				</div>

				{/* <Button variant={"ghost"} className='w-12 h-12'> */}
				<ArrowUpRight size={28} className='text-muted-foreground text-[40px]' />
				{/* </Button> */}
			</div>
			<div className='mt-6 flex flex-col items-start gap-1'>
				<div className='flex items-center gap-2'>
					<h2 className='text-md font-medium text-foreground'>{card.title}</h2>
				</div>
				<span className='text-sm text-muted-foreground'>
					{card.description}
				</span>
			</div>
		</article>
	);
};
