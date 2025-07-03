import { SidebarBanner } from "@/components/common/layout/sidebar";
import ComponentItem from "@/components/features/component-item";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className='relative'>
			<div className='fixed inset-x-0 top-15 z-20'>
				<SidebarBanner />
			</div>

			<div className='p-4 w-full border-b-[1px] border-b-border flex flex-col gap-4 pt-24'>
				<h1 className='text-[50px] lg:text-[60px] leading-[60px] text-start max-w-[700px] text-foreground text-pretty'>
					Hero Sections
				</h1>
				<p className='max-w-[700px] text-start mt-2 text-foreground text-pretty'>
					Use these chakra-infused React sections to showcase key messaging,
					product highlights, and calls-to-action at the top of your site. Each
					section is thoughtfully designed, production-ready, and powered by
					Shadcn UI — so you can summon beautiful UIs into any React project
					with ease.
				</p>
			</div>

			<ComponentItem />
		</section>
	);
};

Page.metadata = {
	title: "Marketing - Page Section - Hero",
	description: "Rasengan UI components",
};

export default Page;
