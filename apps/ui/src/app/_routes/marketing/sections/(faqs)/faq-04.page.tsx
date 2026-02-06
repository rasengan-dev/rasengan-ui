import ThemeButton from "@/components/common/atoms/theme-button";
import { Faq4 } from "@/registry/marketing/page-sections/faqs/faq4";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"w-full h-full overflow-auto bg-background",
				isDark && "dark"
			)}
		>
			<div className='w-full h-screen flex flex-col gap-2'>
				<div className='absolute inset-x-0 top-0 max-w-[1500px] mx-auto w-full flex items-center justify-end p-4'>
					<ThemeButton />
				</div>
				<Faq4 />
			</div>
		</section>
	);
};

Page.metadata = {
	title: "FAQs",
	description: "FAQs page",
};

export default Page;
