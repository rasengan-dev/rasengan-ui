import { PageComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import PricingSection3 from "@/components/marketing/page-sections/pricings/pricing3";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"bg-background w-fullm h-full overflow-y-auto pb-20",
				isDark && "dark"
			)}
		>
			<PricingSection3 />
		</section>
	);
};

Page.metadata = {
	title: "Pricings",
	description: "Pricings page",
};

export default Page;
