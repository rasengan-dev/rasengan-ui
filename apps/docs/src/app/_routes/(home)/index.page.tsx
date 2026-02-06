import { Button } from "@/components/ui/button";
import { Link, PageComponent } from "rasengan";
import TestimonialsSection from "@/components/features/sections/testimonials";
import FaqSection from "@/components/features/sections/faq";
import { AnnouncementBadge } from "@/components/common/molecules/announcement-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroExample from "@/components/features/examples/landing/hero";
import TeamExample from "@/components/features/examples/landing/team";
import PricingExample from "@/components/features/examples/landing/pricing";
import ExampleComponent from "@/components/features/examples/landing/example";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-full bg-background py-4'>
			<div id='top'></div>

			{/* Gradient */}
			<div className='absolute -top-[300px] left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/70 blur-[500px] z-0'></div>

			{/* Hero */}
			<section className='relative w-full flex flex-col items-center mt-20'>
				<AnnouncementBadge />

				<h1 className='font-bold text-[50px] lg:text-[60px] leading-[60px] text-center max-w-[700px] text-foreground mt-4 text-pretty px-4'>
					Build Faster. Style Sharper.
				</h1>
				<p className='max-w-[700px] text-center mt-2 text-foreground text-pretty px-4'>
					<span className='font-medium'>
						A collection of well crafted and stunning UI components for your React app.
					</span>{" "}
					<span>
						Themeable, responsive, and powered by Shadcn UI — just drop them
						into your project and build faster.
					</span>
				</p>
				<div className='mt-6 w-full items-center justify-center flex flex-col sm:flex-row gap-2 px-4'>
					<Link to='/ui-components' className='w-full sm:w-auto'>
						<Button className='w-full sm:w-auto'>Browse components</Button>
					</Link>
					<Link
						to='/templates'
						className='w-full sm:w-auto'
					>
						<Button
							className='w-full sm:w-auto text-foreground/70'
							variant='outline'
						>
							<span>Explore Templates</span>
						</Button>
					</Link>
				</div>
			</section>

			{/* Components Preview */}
			<section className='relative mt-20 flex flex-col border-t-[1px] border-t-border'>
				<div className="w-full p-2">
					<Tabs defaultValue="example">
						<TabsList variant="line" className="h-[40px]">
							<TabsTrigger value="example">Example</TabsTrigger>
							<TabsTrigger value="hero">Hero Section</TabsTrigger>
							<TabsTrigger value="team">Team Section</TabsTrigger>
							<TabsTrigger value="pricing">Pricing Section</TabsTrigger>
						</TabsList>
						<TabsContent value="example">
							<ExampleComponent />
						</TabsContent>
						<TabsContent value="hero">
							<HeroExample />
						</TabsContent>
						<TabsContent value="team">
							<TeamExample />
						</TabsContent>
						<TabsContent value="pricing">
							<PricingExample />
						</TabsContent>
					</Tabs>
				</div>
				{/* <div className='w-full'>
					{popularComponents[0].components.map((component) => (
						<ComponentItem
							key={component.component.label}
							component={component.component}
							category={popularComponents[0].category}
							categoryLabel={
								popularComponents[0].categoryLabel as ComponentCategoryLabel
							}
							groupName={component.groupName}
							typeLabel={component.typeLabel}
						/>
					))}
				</div> */}
			</section>

			{/* Pricing */}
			{/* <PricingSection /> */}

			{/* Testimonials */}
			<TestimonialsSection />

			{/* FAQ */}
			{/* <FaqSection /> */}
		</section>
	);
};

Page.metadata = {
	title: "Rasengan UI",
	description:
		"Build Faster. Style Sharper - Chakra-infused UI sections for any React app — Rasengan.js, Next.js, Remix, TanStack, React Router, and more. Themeable, responsive, and powered by Shadcn UI — just drop them into your project and build faster.",
};

export default Page;
