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

export default function PricingSection2() {
	const [duration, setDuration] = useState("monthly");

	return (
		<section className='w-full min-h-[800px] h-auto flex flex-col max-w-[1300px] mx-auto pb-20 overflow-auto'>
			<div className='sticky top-0 left-0 right-0 z-20 flex items-center justify-between'>
				<Navbar1
					className='border-b-transparent lg:px-20 max-w-[1300px] mx-auto'
					enableTheme
				/>
			</div>

			<div className='mt-[100px] md:mt-[140px] px-4 lg:px-20 flex flex-col items-center'>
				<div>
					<h1 className='text-[50px] md:text-5xl leading-[70px] max-w-[630px] font-bold text-foreground text-center text-pretty'>
						Choose your right plan!
					</h1>
					<p className='text-muted-foreground md:max-w-[500px] text-center'>
						Select from best plans, ensuring a perfect match. Need more or less
						? Customize your subscription for a seamless fit!
					</p>
				</div>

				<Tabs
					defaultValue='monthly'
					value={duration}
					onValueChange={(value) => setDuration(value)}
					className='w-full mt-10 flex flex-col items-center'
				>
					<TabsList className='bg-transparent border h-auto w-full md:w-[500px] rounded-full'>
						<TabsTrigger
							value='monthly'
							className='rounded-full w-1/2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2'
						>
							Monthly billing
						</TabsTrigger>
						<TabsTrigger
							value='annual'
							className='rounded-full w-1/2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2'
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
				pricing.isPopular && "bg-[#111727] scale-105 shadow-lg dark"
			)}
		>
			<div className='flex items-center justify-between'>
				<h2
					className={twMerge(
						"font-bold text-foreground",
						pricing.isPopular && "text-green-500"
					)}
				>
					{pricing.plan}
				</h2>

				{pricing.isPopular && (
					<Badge variant='default' className='bg-green-500'>
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

			<div className='mt-4 border-t pt-4 border-t-border dark:border-t-foreground/20'>
				<h2 className='text-foreground font-bold'>FEATURES</h2>
				<p className='text-sm mt-1 text-foreground'>
					{pricing.features.description}
				</p>

				<div className='mt-4 flex flex-col gap-2'>
					{pricing.features.items.map((feature) => (
						<div className='flex gap-2 items-center'>
							<Button
								size={"icon"}
								className='size-6 rounded-full bg-green-500'
							>
								<Check />
							</Button>

							<span className='text-sm text-foreground'>{feature}</span>
						</div>
					))}
				</div>
			</div>

			<div className='w-full mt-4 border-t pt-4 border-t-border dark:border-t-foreground/20'>
				<Button
					className={twMerge("w-full", pricing.isPopular && "bg-green-500")}
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
					Let's talk
				</Button>
			</div>
		</article>
	);
};
