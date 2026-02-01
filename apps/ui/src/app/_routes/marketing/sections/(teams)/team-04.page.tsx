import TeamSection4 from "@/components/marketing/page-sections/teams/team4";
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
			<TeamSection4 />
		</section>
	);
};

Page.metadata = {
	title: "Teams",
	description: "Teams page",
};

export default Page;
