import { Footer1 } from "@/components/marketing/page-sections/footers/footer1";
import { cn } from "@/lib/utils";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className={cn("w-full h-full overflow-auto bg-background")}>
			<div className='w-full min-h-screen flex flex-col justify-end gap-2'>
				<Footer1 />
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Footers",
	description: "Footers page",
};

export default Page;
