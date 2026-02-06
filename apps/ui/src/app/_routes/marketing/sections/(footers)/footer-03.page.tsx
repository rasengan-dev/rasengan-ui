import ThemeButton from "@/components/common/atoms/theme-button";
import { Footer3 } from "@/registry/marketing/page-sections/footers/footer3";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"w-full h-screen overflow-auto bg-background flex",
				isDark && "dark"
			)}
		>
			<div className='w-full h-auto flex flex-col justify-end gap-2 mt-auto'>
				<div className='absolute inset-x-0 top-0 max-w-[1500px] w-full flex items-center justify-end p-4'>
					<ThemeButton />
				</div>
				<Footer3 />
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Footers",
	description: "Footers page",
};

export default Page;
