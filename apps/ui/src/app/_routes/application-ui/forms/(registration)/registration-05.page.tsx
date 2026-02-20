import { SigninPage5 } from "@/registry/application-ui/forms/registration";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-full overflow-auto'>
			<SigninPage5 />
		</section>
	);
};

Page.metadata = {
	title: "Registration",
	description: "Registration page",
};

export default Page;
