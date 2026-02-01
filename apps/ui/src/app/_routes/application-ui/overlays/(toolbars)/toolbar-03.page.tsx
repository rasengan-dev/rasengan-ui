import { PageComponent } from "rasengan";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { Toolbar3 } from "@/components/application-ui/overlays/toolbars/toolbar3";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"relative w-full h-full overflow-auto bg-background",
				isDark && "dark"
			)}
		>
			<div className='w-full h-screen flex flex-col gap-2'>
				<div className='absolute inset-x-0 top-0 max-w-[1500px] mx-auto w-full flex items-center justify-end p-4'>
					<ThemeButton />
				</div>

				<div className='absolute bottom-4 right-4'>
					<Toolbar3 />
				</div>
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Toolbars",
	description: "Toolbars page",
};

export default Page;
