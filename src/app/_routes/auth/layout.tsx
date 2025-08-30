import { Outlet, LayoutComponent } from "rasengan";
import { twMerge } from "tailwind-merge";

const Layout: LayoutComponent = () => {
	return (
		<section
			className={twMerge("w-screen min-h-screen overflow-hidden font-raleway")}
		>
			<main className='bg-background h-auto overflow-auto w-full'>
				<section className='relative h-auto max-w-[1500px] w-full mx-auto px-0 xl:px-10'>
					<div className='min-h-screen'>
						<Outlet />
					</div>
				</section>
			</main>
		</section>
	);
};

export default Layout;
