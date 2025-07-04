import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { PageComponent } from "rasengan";
import ComponentItem from "@/components/features/component-item";
import PricingSection from "@/components/features/sections/pricing";
import TestimonialsSection from "@/components/features/sections/testimonials";
import FaqSection from "@/components/features/sections/faq";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-full bg-background py-4'>
			{/* Gradient */}
			<div className='absolute -top-[300px] left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/70 blur-[500px] z-0'></div>

			{/* Hero */}
			<section className='relative w-full flex flex-col items-center mt-20'>
				<Badge variant='outline' className='bg-accent/30'>
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
					<Button>Browse components</Button>
					<Button variant='outline' className='text-foreground'>
						<Lock />
						<span>Unlock Premium</span>
					</Button>
				</div>
			</section>

			{/* Components Preview */}
			<section className='relative mt-20 flex flex-col border-t-[1px] border-t-border'>
				{/* <ComponentItem />
				<ComponentItem /> */}
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
