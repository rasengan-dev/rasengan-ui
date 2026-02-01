import { LandingPage1 } from "@/components/marketing/page-examples/landings";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-full overflow-auto'>
			<LandingPage1 />
		</section>
	);
};

Page.metadata = {
	title: "Landing Page 1",
	description: "Landing Page 1",
};

export default Page;
