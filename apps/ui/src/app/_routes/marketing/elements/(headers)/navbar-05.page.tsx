import { FloatingNavbar2 } from "@/registry/marketing/elements/headers";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"w-full h-screen overflow-auto bg-background",
				isDark && "dark"
			)}
		>
			<FloatingNavbar2 className='mt-4' enableTheme />
		</section>
	);
};

Page.metadata = {
	title: "Navbar",
	description: "Navbar page",
};

export default Page;
