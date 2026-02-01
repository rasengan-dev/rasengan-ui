import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";
import { Navbar1 } from "../../elements/headers";

const pricingsData = [
	{
		id: 1,
		plan: "Basic plan",
		price: {
			monthly: "$10",
			annual: "$99",
		},
		description: "Basic features for up to 10 users.",
		features: {
			description: "Everything in our free plan plus...",
			items: [
				"Access to basic features",
				"Basic reporting and analytics",
				"Up to 10 individual users",
				"20 GB individual data each user",
				"Basic chat and email support",
			],
		},
		isPopular: false,
	},
	{
		id: 2,
		plan: "Business plan",
		price: {
			monthly: "$20",
			annual: "$219",
		},
		description: "Growing teams up to 20 users.",
		features: {
			description: "Everything in Basic plan plus...",
			items: [
				"200+ integrations",
				"Advanced reporting and analytics",
				"Up to 20 individual users",
				"40 GB individual data each user",
				"Priority chat and email support",
			],
		},
		isPopular: true,
	},
	{
		id: 3,
		plan: "Enterprise plan",
		price: {
			monthly: "$40",
			annual: "$459",
		},
		description: "Advanced features + unlimited users.",
		features: {
			description: "Everything in Business plan plus...",
			items: [
				"Advanced custom fields",
				"Audit log and data history",
				"Unlimited individual users",
				"Unlimited individual data",
				"Personalised + priority service",
			],
		},
		isPopular: false,
	},
];

export default function PricingSection1() {
	const [duration, setDuration] = useState("monthly");

	return (
		<section className='relative w-full min-h-[800px] flex flex-col max-w-[1300px] mx-auto pb-20 overflow-auto'>
			<div className='sticky top-0 left-0 right-0 z-20 flex items-center justify-between'>
				<Navbar1
					className='border-b-transparent lg:px-20 max-w-[1300px] mx-auto'
					enableTheme
				/>
			</div>

			<div className='mt-[140px] px-4 lg:px-20'>
				<h1 className='text-4xl text-pretty lg:text-5xl leading-[50px] lg:leading-[70px] max-w-[630px] font-bold text-foreground'>
					We've got a plan that's perfect for you.
				</h1>

				<Tabs
					defaultValue='monthly'
					value={duration}
					onValueChange={(value) => setDuration(value)}
					className='w-full mt-10'
				>
					<TabsList className='bg-transparent border h-auto'>
						<TabsTrigger
							value='monthly'
							className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2'
						>
							Monthly billing
						</TabsTrigger>
						<TabsTrigger
							value='annual'
							className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2'
						>
							Annual billing
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value='monthly'
						className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'
					>
						{pricingsData.map((pricing) => (
							<PricingItem
								key={pricing.id}
								pricing={pricing}
								duration={"monthly"}
							/>
						))}
					</TabsContent>
					<TabsContent
						value='annual'
						className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'
					>
						{pricingsData.map((pricing) => (
							<PricingItem
								key={pricing.id}
								pricing={pricing}
								duration={"annual"}
							/>
						))}
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}

const PricingItem = ({
	pricing,
	duration = "monthly",
}: {
	pricing: (typeof pricingsData)[0];
	duration: "monthly" | "annual";
}) => {
	return (
		<article
			className={twMerge(
				"w-full max-w-[400px] rounded-3xl p-6 border mx-auto",
				pricing.isPopular && "bg-[#111727] dark"
			)}
		>
			<div className='flex items-center justify-between'>
				<h2
					className={twMerge(
						"font-bold text-foreground",
						pricing.isPopular && "text-blue-400"
					)}
				>
					{pricing.plan}
				</h2>

				{pricing.isPopular && (
					<Badge variant='default' className='bg-blue-400'>
						Popular
					</Badge>
				)}
			</div>

			<div className='mt-4 flex items-center gap-2 text-foreground'>
				<p className='text-5xl font-medium'>{pricing.price[duration]}</p>
				<div className='flex flex-col text-[12px]'>
					<span>per user</span>
					<span>{duration === "monthly" ? "per month" : "per year"}</span>
				</div>
			</div>

			<p className='text-sm mt-4 text-foreground'>{pricing.description}</p>

			<div className='w-full mt-4'>
				<Button
					className={twMerge("w-full", pricing.isPopular && "bg-blue-400")}
				>
					Get started
				</Button>
				<Button
					variant={"outline"}
					className={twMerge(
						"w-full mt-2 dark:text-foreground",
						pricing.isPopular && "dark:text-foreground bg-primary"
					)}
				>
					Chat to sales
				</Button>
			</div>

			<div className='mt-8'>
				<h2 className='text-foreground font-bold'>FEATURES</h2>
				<p className='text-sm mt-1 text-foreground'>
					{pricing.features.description}
				</p>

				<div className='mt-4 flex flex-col gap-2'>
					{pricing.features.items.map((feature) => (
						<div className='flex gap-2 items-center'>
							<Button size={"icon"} className='size-6 rounded-full bg-blue-400'>
								<Check />
							</Button>

							<span className='text-sm text-foreground'>{feature}</span>
						</div>
					))}
				</div>
			</div>
		</article>
	);
};
