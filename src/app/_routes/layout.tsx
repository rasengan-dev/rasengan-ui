import { Outlet, LayoutComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Navbar } from "@/components/common/layout/navbar";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"w-screen min-h-screen overflow-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<section className='fixed top-0 inset-x-0 z-30'>
				<Navbar />
			</section>

			<main className='bg-background pt-[60px] h-screen overflow-auto w-full'>
				<section className='h-screen overflow-auto max-w-[1500px] w-full mx-auto'>
					<Outlet />
				</section>
			</main>
		</section>
	);
};

export default Layout;
