import { PageComponent } from "rasengan";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { ProfileCard7 } from "@/registry/application-ui/cards/profile";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"w-full h-full overflow-auto bg-background",
				isDark && "dark"
			)}
		>
			<div className='w-full h-screen flex flex-col gap-2 items-center justify-center'>
				<div className='absolute inset-x-0 top-0 max-w-[1500px] mx-auto w-full flex items-center justify-end p-4'>
					<ThemeButton />
				</div>

				<div className='w-full p-4 flex flex-col gap-2 items-center justify-center'>
					<ProfileCard7 />
				</div>
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Profile Cards",
	description: "Profile Cards page",
};

export default Page;
