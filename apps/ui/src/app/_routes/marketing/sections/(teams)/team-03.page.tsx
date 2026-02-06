import TeamSection3 from "@/registry/marketing/page-sections/teams/team3";
import { useTheme } from "@rasenganjs/theme";
import { PageComponent } from "rasengan";
import { twMerge } from "tailwind-merge";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"w-full min-h-screen h-full bg-background overflow-auto",
				isDark && "dark"
			)}
		>
			<TeamSection3 />
		</section>
	);
};

Page.metadata = {
	title: "Teams",
	description: "Teams page",
};

export default Page;
