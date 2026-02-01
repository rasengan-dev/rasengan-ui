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
		plan: "Pro",
		price: {
			monthly: "$250",
			annual: "$2499",
		},
		description:
			"Ideal for those who've already got their website up and running and are seeking assistance to enhance and update it further",
		features: {
			description: "Everything in our free plan plus...",
			items: [
				"3-5 day turnaround",
				"Native Development",
				"Task delivered one-by-one",
				"Dedicated dashboard",
				"Updates via Dashboard & Slack",
			],
		},
		isPopular: false,
	},
	{
		id: 2,
		plan: "Pro Plus",
		price: {
			monthly: "$380",
			annual: "$3999",
		},
		description:
			"Ideal if you want to build or scale your website fast, with the strategy calls included",
		features: {
			description: "Everything in Basic plan plus...",
			items: [
				"1-3 day turnaround",
				"Monthly strategy call",
				"Commercial license",
				"Native Development",
				"Task delivered one-by-one",
				"Dedicated dashboard",
				"Updates via Dashboard & Slack",
			],
		},
		isPopular: false,
	},
	{
		id: 3,
		plan: "Custom",
		price: {
			monthly: "$40",
			annual: "$459",
		},
		description:
			"If these plans don't fit, let's create one that suits. Customize your subscription for a perfect fit, bigger or smaller",
		features: {
			description: "Everything in Business plan plus...",
			items: [
				"Everthing in Pro & Pro Plus",
				"Strategy workshop",
				"Priority support",
				"Multiple task at once",
				"Ongoing autonomous A/B testing",
				"Advanced custom development",
			],
		},
		isPopular: true,
	},
];

export default function PricingSection3() {
	const [duration, setDuration] = useState("monthly");

	return (
		<section className='w-full min-h-[800px] h-full flex flex-col mx-auto pb-20 bg-gradient-to-b from-[#835EE9]/20 to-60%'>
			<Navbar1
				className='fixed top-0 left-0 right-0 backdrop-blur-lg py-4 z-20 border-b-transparent lg:px-20  bg-transparent'
				enableTheme
			/>

			<div className='mt-[100px] md:mt-[140px] px-4 lg:px-20 flex flex-col items-center pb-20'>
				<div>
					<h1 className='text-[50px] md:text-5xl leading-[70px] max-w-[630px] font-bold text-foreground text-center'>
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
					<TabsList className='bg-background border h-auto w-full md:w-[500px] rounded-full'>
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
				"w-full min-w-[280px] max-w-[340px] rounded-3xl p-4 border mx-auto flex flex-col justify-between",
				pricing.isPopular
					? "bg-gradient-to-b from-[#E2D8FA] dark:from-[#835EE9]/30 to-transparent to-70%"
					: "bg-background"
			)}
		>
			<div className='flex items-center justify-between'>
				<Badge
					variant='default'
					className={twMerge(
						"bg-[#835EE9] py-2 px-4 rounded-xl text-sm dark:text-foreground",
						pricing.isPopular &&
							"bg-white text-foreground dark:text-primary-foreground"
					)}
				>
					{pricing.plan}
				</Badge>
			</div>

			<p className='text-sm mt-4 text-foreground'>{pricing.description}</p>

			<div className='flex items-baseline gap-1 text-foreground mt-10'>
				{pricing.isPopular ? (
					<p className='text-5xl font-medium'>Let's Talsks!</p>
				) : (
					<>
						<p className='text-5xl font-medium'>{pricing.price[duration]}</p>
						<div className='flex flex-col text-[12px]'>
							<span>/{duration === "monthly" ? "month" : "year"}</span>
						</div>
					</>
				)}
			</div>

			<div className='mt-4 border-t pt-4 border-t-border dark:border-t-foreground/20'>
				<div className='mt-4 flex flex-col gap-2'>
					{pricing.features.items.map((feature) => (
						<div className='flex gap-2 items-center'>
							<Button
								size={"icon"}
								className='size-6 rounded-full bg-transparent'
							>
								<Check className='text-foreground' />
							</Button>

							<span className='text-sm text-foreground'>{feature}</span>
						</div>
					))}
				</div>
			</div>

			<div className='w-full mt-4 border-t pt-4 border-t-border dark:border-t-foreground/20'>
				<Button
					variant={pricing.isPopular ? "default" : "outline"}
					className={twMerge(
						"w-full",
						pricing.isPopular ? "bg-primary" : "dark:text-foreground"
					)}
				>
					{pricing.isPopular ? "Book a Call" : "Get started"}
				</Button>
			</div>
		</article>
	);
};
