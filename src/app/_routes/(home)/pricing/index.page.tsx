import PricingSection from "@/components/features/sections/pricing";
import { Button } from "@/components/ui/button";
import { Link, PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section>
			{/* Gradient */}
			<div className='absolute -top-[300px] left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/70 blur-[500px] z-0'></div>

			{/* Hero */}
			<section className='relative w-full flex flex-col items-center pt-20'>
				<h1 className='font-bold text-[50px] lg:text-[60px] leading-[60px] text-center max-w-[800px] text-foreground mt-4 text-pretty px-4'>
					Build stunning interfaces at ninja speed
				</h1>
				<p className='max-w-[700px] text-center mt-2 text-foreground text-pretty px-4'>
					<span className='font-medium'>
						Rasengan UI gives you 100+ handcrafted React components, responsive
						by default, dark-mode ready, and designed to help you ship faster.
					</span>{" "}
					<span>
						With our launch offer, you can unlock the entire collection at a
						special price.
					</span>
				</p>
				<div className='mt-6 w-full items-center justify-center flex flex-col sm:flex-row gap-2 px-4'>
					<Link to='/ui-components' className='w-full sm:w-auto'>
						<Button className='w-full sm:w-auto'>Browse components</Button>
					</Link>
				</div>
			</section>

			{/* Pricing */}
			<PricingSection />
		</section>
	);
};

Page.metadata = {
	title: "Pricing - Rasengan UI",
	description:
		"Build stunning interfaces at ninja speed - Get access to all our premium components and features by choosing a plan that best fit with your goal.",
};

export default Page;
