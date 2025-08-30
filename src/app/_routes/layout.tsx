import { Outlet, LayoutComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/sonner";
import { ScrollRestoration } from "@/components/common/molecules/scroll-restoration";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"app-container w-screen min-h-screen overflow-x-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<ScrollRestoration />
			<Outlet />
			<Toaster />
		</section>
	);
};

export default Layout;
