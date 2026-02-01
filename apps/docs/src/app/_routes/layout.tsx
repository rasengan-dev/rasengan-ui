import { Outlet, LayoutComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"app-container w-screen min-h-screen overflow-x-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<Analytics framework='rasengan' />

			<Outlet />
			<Toaster />
		</section>
	);
};

Layout.metadata = {};

export default Layout;
