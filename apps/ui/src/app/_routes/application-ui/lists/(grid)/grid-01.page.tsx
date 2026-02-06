import { GridList1 } from "@/registry/application-ui/lists/grid/grid1";
import ThemeButton from "@/components/common/atoms/theme-button";
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
			<div className='w-full h-screen min-h-[500px] flex flex-col gap-2 items-center justify-center'>
				<div className='absolute inset-x-0 top-0 max-w-[1500px] mx-auto w-full flex items-center justify-end p-4'>
					<ThemeButton />
				</div>

				<GridList1 />
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Grid List",
	description: "Grid List page",
};

export default Page;
