import TemplateItem from "@/components/features/templates/template-item";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link, PageComponent } from "rasengan";
import { useTemplateStore } from "@/store/templates";

const Page: PageComponent = () => {
	const templates = useTemplateStore((state) => state.templates);

	return (
		<section className='w-full min-h-screen h-auto bg-background py-4'>
			{/* Gradient */}
			<div className='absolute -top-[300px] left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/70 blur-[500px] z-0'></div>

			{/* Hero */}
			<section className='relative w-full flex flex-col items-center mt-20 px-4'>
				<h1 className='font-bold text-[50px] lg:text-[60px] leading-[60px] text-center max-w-[700px] text-foreground mt-4 text-pretty'>
					Build less. Ship more.
				</h1>
				<p className='max-w-[700px] text-center mt-2 text-foreground text-pretty px-4'>
					<span className='font-medium'>
						Rasengan UI Templates give you complete, high-quality starting
						points for marketing sites and web apps —
					</span>{" "}
					<span>all powered by Rasengan UI.</span>
				</p>
				<div className='mt-6 flex gap-2'>
					<Link to='#browse'>
						<Button>Browse templates</Button>
					</Link>
					<Link to='/docs/components' className='w-full sm:w-auto'>
						<Button
							className='w-full sm:w-auto text-foreground/70'
							variant='outline'
						>
							<span>Explore components</span>
							<ArrowRight />
						</Button>
					</Link>
				</div>
			</section>

			<section
				id='browse'
				className='w-full mt-20 min-h-[calc(100vh-80px)] relative border-t border-t-border'
			>
				{templates.map((template) => (
					<TemplateItem key={template.id} template={template} />
				))}
			</section>
		</section>
	);
};

Page.metadata = {
	title: "Templates",
	description: "Rasengan UI templates page",
};

export default Page;
