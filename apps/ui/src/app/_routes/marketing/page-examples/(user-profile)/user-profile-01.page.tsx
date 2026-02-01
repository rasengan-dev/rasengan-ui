import { UserProfile1 } from "@/components/marketing/page-examples/user-profiles";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-full overflow-auto'>
			<UserProfile1 />
		</section>
	);
};

Page.metadata = {
	title: "User Profile 1",
	description: "User Profile 1",
};

export default Page;
