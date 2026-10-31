import TeamSection1 from "@/registry/marketing/page-sections/teams/team1";
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
			<TeamSection1 />
		</section>
	);
};

Page.metadata = {
	title: "Teams",
	description: "Teams page",
};

export default Page;
