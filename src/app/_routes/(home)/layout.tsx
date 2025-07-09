import { Outlet, LayoutComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Navbar } from "@/components/common/layout/navbar";
import { Footer } from "@/components/common/layout/footer";

const Layout: LayoutComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"w-screen h-screen overflow-hidden font-raleway",
				isDark && "dark"
			)}
		>
			<section className='fixed top-0 inset-x-0 z-30'>
				<Navbar />
			</section>

			<main className='bg-background pt-[60px] h-screen overflow-y-auto overflow-x-hidden w-full'>
				<section className='relative h-auto max-w-[1500px] w-full mx-auto sm:px-4 xl:px-10'>
					<div className='min-h-screen'>
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

export default Layout;
