import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link, PageComponent } from "rasengan";
import ComponentItem from "@/components/features/component-item";
import PricingSection from "@/components/features/sections/pricing";
import TestimonialsSection from "@/components/features/sections/testimonials";
import FaqSection from "@/components/features/sections/faq";
import { useComponentStore } from "@/store/components";
import { ComponentCategoryLabel } from "@/data/components/type";
import { scrollToSection } from "@/lib/utils";

const Page: PageComponent = () => {
	const { getPopularComponents } = useComponentStore();

	const popularComponents = getPopularComponents();

	return (
		<section className='w-full h-full bg-background py-4'>
			<div id='top'></div>

			{/* Gradient */}
			<div className='absolute -top-[300px] left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/70 blur-[500px] z-0'></div>

			{/* Hero */}
			<section className='relative w-full flex flex-col items-center mt-20'>
				<Badge
					variant='default'
					className='bg-accent/30f bg-primary px-4 py-1 rounded-full'
				>
					<span>Rasengan.js v1.1.0 is available</span>
					<ArrowRight />
				</Badge>
				<h1 className='font-bold text-[50px] leading-[60px] text-center max-w-[700px] text-foreground mt-4 text-pretty'>
					Build Faster. Style Sharper.
				</h1>
				<p className='max-w-[700px] text-center mt-2 text-foreground text-pretty'>
					<span className='font-medium'>
						Rasengan UI gives you chakra-infused, beautifully crafted UI
						components built for any React app.
					</span>{" "}
					<span>
						Each component is themeable, responsive, and ready to drop into your
						code — powered by Shadcn UI.
					</span>
				</p>
				<div className='mt-6 flex gap-2'>
					<Link to='/components'>
						<Button>Browse components</Button>
					</Link>
					<Link to='/#pricing' onClick={(e) => scrollToSection(e, "pricing")}>
						<Button className='h-8 text-foreground/70' variant='outline'>
							<Lock />
							<span>Unlock Premium</span>
						</Button>
					</Link>
				</div>
			</section>

			{/* Components Preview */}
			<section className='relative mt-20 flex flex-col border-t-[1px] border-t-border'>
				<div className='w-full'>
					{popularComponents[0].components.map((component) => (
						<ComponentItem
							key={component.label}
							component={component}
							category={popularComponents[0].category}
							categoryLabel={
								popularComponents[0].categoryLabel as ComponentCategoryLabel
							}
							groupName={popularComponents[0].groupName}
							typeLabel={popularComponents[0].typeLabel}
						/>
					))}
				</div>
				<div className='w-full'>
					{popularComponents[1].components.map((component) => (
						<ComponentItem
							key={component.label}
							component={component}
							category={popularComponents[1].category}
							categoryLabel={
								popularComponents[1].categoryLabel as ComponentCategoryLabel
							}
							groupName={popularComponents[1].groupName}
							typeLabel={popularComponents[1].typeLabel}
						/>
					))}
				</div>
			</section>

			{/* Pricing */}
			<PricingSection />

			{/* Testimonials */}
			<TestimonialsSection />

			{/* FAQ */}
			<FaqSection />
		</section>
	);
};

Page.metadata = {
	title: "Home",
	description: "Rasengan UI home page",
};

export default Page;
