import { PageComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import PricingSection2 from "@/components/marketing/page-sections/pricings/pricing2";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"bg-background w-fullm h-full overflow-y-auto pb-20",
				isDark && "dark"
			)}
		>
			<PricingSection2 />
		</section>
	);
};

Page.metadata = {
	title: "Pricings",
	description: "Pricings page",
};

export default Page;
