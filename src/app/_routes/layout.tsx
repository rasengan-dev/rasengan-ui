import { Outlet, LayoutComponent, useLocation } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	const location = useLocation();
	const pathname = location.pathname;

	// Scroll to the top on route change
	useEffect(() => {
		if (typeof window === "undefined") return;

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [pathname]);

	return (
		<section
			className={twMerge(
				"w-screen h-screen overflow-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<Outlet />
		</section>
	);
};

export default Layout;
