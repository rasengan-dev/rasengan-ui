import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pricingsData = [
	{
		id: 1,
		plan: "Indie Ninja",
		price: "$59",
		description: `Perfect for solo developers and indie hackers who want to move fast and build beautiful UIs.
Includes the full collection of ready-to-use sections`,
		features: {
			description: "Everything in our free plan plus...",
			items: [
				"Get all components",
				"Responsive design",
				"Dark mode support",
				"3 months of updates",
				"Solo developer",
				"Commercial use",
			],
		},
		isPopular: false,
	},
	{
		id: 2,
		plan: "Pro Shinobi",
		price: "$119",
		description: `Ideal for small teams working on client projects, SaaS products, or internal tools.
Share components across your team, access priority support.`,
		features: {
			description: "Everything in Basic plan plus...",
			items: [
				"Get all components",
				"Responsive design",
				"Dark mode support",
				"1 year of updates",
				"Small team",
				"Commercial use",
			],
		},
		isPopular: true,
	},
	{
		id: 3,
		plan: "Hokage License",
		price: "$249",
		description: `Designed for agencies, larger teams, and companies building at scale.
Use across unlimited projects and teams, get top-tier priority support.`,
		features: {
			description: "Everything in Business plan plus...",
			items: [
				"Get all components",
				"Responsive design",
				"Dark mode support",
				"Life time updates",
				"Large Company",
				"Commercial use",
			],
		},
		isPopular: false,
	},
];

export default function PricingSection() {
	return (
		<section id='pricing' className='w-full'>
			<div className='p-4 w-full border-b-[1px] border-b-border'>
				<h1 className='text-[50px] leading-[60px] text-start max-w-[700px] text-foreground text-pretty'>
					Pricing
				</h1>
				<p className='max-w-[500px] text-start mt-2 text-foreground text-pretty'>
					Get access to all our premium components and features by choosing a
					plan that best fit with your goal.
				</p>
			</div>

			<div className='w-full max-w-[1100px] mx-auto min-h-[400px] py-4 pt-20 flex flex-col lg:flex-row items-center gap-4 pricing-grid px-4'>
				{pricingsData.map((pricing) => (
					<div key={pricing.id} className={`h-full area-${pricing.id}`}>
						<PricingItem pricing={pricing} />
					</div>
				))}
			</div>
		</section>
	);
}

const PricingItem = ({ pricing }: { pricing: (typeof pricingsData)[0] }) => {
	return (
		<article
			className={cn(
				"w-full h-full min-w-[300px] rounded-3xl p-4 border mx-auto flex flex-col justify-between",
				pricing.isPopular
					? "bg-gradient-to-b from-primary/40 dark:from-primary/30 to-transparent to-70%"
					: "bg-background"
			)}
		>
			<div className='flex items-center justify-between'>
				<Badge
					variant='outline'
					className={cn(
						"bg-primary py-2 px-4 rounded-full text-sm text-primary-foreground border-0"
						// pricing.isPopular && "bg-primary/10 border-primary text-foreground"
					)}
				>
					{pricing.plan}
				</Badge>
			</div>

			<p className='text-sm mt-4 text-foreground'>{pricing.description}</p>

			<div className='flex items-center justify-between mt-10'>
				<div className='flex flex-col items-baseline gap-1 text-foreground'>
					<p className='text-5xl font-medium'>{pricing.price}</p>
					<div className='flex flex-col text-[12px]'>
						<span>One time purchase</span>
					</div>
				</div>

				<div className=''>
					<Button
						variant={pricing.isPopular ? "default" : "outline"}
						className={cn(
							"w-full px-4",
							pricing.isPopular ? "bg-primary" : "dark:text-foreground"
						)}
					>
						Get UI Collection
					</Button>
				</div>
			</div>

			<div className='mt-4 border-t pt-4 border-t-border'>
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
		</article>
	);
};
