import { Outlet, LayoutComponent, ScrollRestoration } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Navbar } from "@/components/common/layout/navbar";
import { Footer } from "@/components/common/layout/footer";
// import { useAuth } from "@/hooks/use-auth";
import { useRef } from "react";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	const ref = useRef<HTMLDivElement>(null);

	// useAuth();

	return (
		<section
			className={twMerge(
				"w-screen min-h-screen overflow-x-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<ScrollRestoration target={ref} alwaysToTop />

			<section className='fixed top-0 inset-x-0 z-30'>
				<Navbar />
			</section>

			<main
				ref={ref}
				className='bg-background pt-[60px] h-screen overflow-y-auto overflow-x-hidden w-full'
			>
				<section className='relative h-auto max-w-[1500px] w-full mx-auto sm:px-4 xl:px-10'>
					<div className='h-auto min-h-screen'>
						<Outlet />
					</div>

					{/* vertical ligne right */}
					<div className='absolute top-0 right-4 xl:right-10 bottom-0 w-[1px] bg-border hidden sm:block'></div>

					{/* vertical ligne left */}
					<div className='absolute top-0 left-4 xl:left-10 bottom-0 w-[1px] bg-border hidden sm:block'></div>
					<Footer />
				</section>
			</main>
		</section>
	);
};

Layout.metadata = {};

export default Layout;
