import { Outlet, LayoutComponent, ScrollRestoration } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/sonner";
import { useRef } from "react";
// import { ScrollRestoration } from "@/components/common/molecules/scroll-restoration";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	const ref = useRef<HTMLDivElement>(null);

	return (
		<section
			ref={ref}
			className={twMerge(
				"app-container w-screen min-h-screen overflow-x-hidden font-raleway",
				isDark && "dark"
			)}
		>
			{/* <ScrollRestoration alwaysToTop target={ref} /> */}
			<Outlet />
			<Toaster />
		</section>
	);
};

export default Layout;
