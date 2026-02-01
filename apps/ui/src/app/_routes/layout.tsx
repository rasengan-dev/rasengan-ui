import SidebarProvider from "@/components/common/layouts/sidebar-provider";
import { Outlet, LayoutComponent, useSearchParams } from "rasengan";
import { Analytics } from "@vercel/analytics/react";

const AppLayout: LayoutComponent = () => {
	const [searchParams] = useSearchParams();

	return (
		<section
			className={`w-screen min-h-screend h-full font-raleway overflow-auto`}
		>
			<Analytics framework='rasengan.js' />
			<Outlet />

			{!(searchParams.get("view") === "preview") && <SidebarProvider />}
		</section>
	);
};

export default AppLayout;
