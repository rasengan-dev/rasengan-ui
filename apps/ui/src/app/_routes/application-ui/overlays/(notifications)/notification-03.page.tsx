import { PageComponent } from "rasengan";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { Notification3 } from "@/components/application-ui/overlays/notifications/notification3";

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
				<div className='absolute inset-x-0 top-0 max-w-[1500px] mx-auto w-full flex items-center justify-start p-4'>
					<ThemeButton />
				</div>

				<div className='absolute right-0 top-16 px-4'>
					<Notification3 />
				</div>
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Notifications",
	description: "Notifications page",
};

export default Page;
