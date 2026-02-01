import { PageComponent } from "rasengan";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { BookingCard2 } from "@/components/application-ui/cards/booking";

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

				<div className='w-full px-4 flex flex-col gap-2 items-center justify-center'>
					<BookingCard2 />
				</div>
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Booking Cards",
	description: "Booking Cards page",
};

export default Page;
