import { PageComponent } from "rasengan";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { Cta4 } from "@/components/marketing/page-sections/ctas/cta4";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"w-full h-full overflow-auto bg-background",
				isDark && "dark"
			)}
		>
			<div className='w-full h-screen flex flex-col gap-2 lg:items-center lg:justify-center'>
				<div className='absolute inset-x-0 top-0 max-w-[1500px] mx-auto w-full flex items-center justify-end p-4'>
					<ThemeButton />
				</div>

				<div className='w-full px-4 flex flex-col gap-2 lg:items-center lg:justify-center'>
					<Cta4 />
				</div>
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Call to Action",
	description: "Call to Action page",
};

export default Page;
