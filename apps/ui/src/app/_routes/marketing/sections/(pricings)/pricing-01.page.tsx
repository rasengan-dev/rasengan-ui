import { PageComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import PricingSection1 from "@/registry/marketing/page-sections/pricings/pricing1";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"bg-background w-fullm h-full overflow-y-auto pb-20",
				isDark && "dark"
			)}
		>
			<PricingSection1 />
		</section>
	);
};

Page.metadata = {
	title: "Pricings",
	description: "Pricings page",
};

export default Page;
