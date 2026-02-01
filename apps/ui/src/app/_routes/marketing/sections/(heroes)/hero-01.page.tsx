import { Hero1 } from "@/components/marketing/page-sections/heroes";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-full overflow-auto'>
			<Hero1 />
		</section>
	);
};

Page.metadata = {
	title: "Heroes",
	description: "Heroes page",
};

export default Page;
