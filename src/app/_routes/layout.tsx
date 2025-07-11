import { Outlet, LayoutComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/sonner";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"w-screen h-screen overflow-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<Outlet />
			<Toaster />
		</section>
	);
};

export default Layout;
