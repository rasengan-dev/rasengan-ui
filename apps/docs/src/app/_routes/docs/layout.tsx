import { Button } from '@/components/ui/button';
import Sidebar from '@/components/features/docs/layouts/sidebar';
import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Outlet, LayoutComponent, ScrollRestoration } from 'rasengan';
import { useRef, useState } from 'react';
import { Navbar } from '@/components/common/layout/navbar';
import { Footer } from '@/components/common/layout/footer';

const Layout: LayoutComponent = () => {
	const ref = useRef<HTMLDivElement>(null);

	const [open, setOpen] = useState(false);

	return (
		<section className="w-full h-screen bg-background overflow-hidden docs">
			<ScrollRestoration target={ref} alwaysToTop />

			<div className='fixed top-0 left-0 right-0 z-30'>
				<Navbar />
			</div>

			<section className='relative flex h-(--main-height) mt-[50px]'>
				<div className='relative w-64 h-full overflow-x-hidden overflow-y-auto hidden lg:block'>
					{/* Top blur mask */}
					<div className='absolute left-0 top-0 bg-linear-to-b from-background to-transparent from-30% w-full h-[80px] z-20'></div>

					<Sidebar />

					{/* Bottom blur mask */}
					<div className='absolute left-0 bottom-0 bg-linear-to-t from-background to-transparent from-30% w-full h-[80px] z-20'></div>

					{/* Vertical ligne */}
					<div className='absolute top-0 bottom-0 right-0 w-px bg-linear-to-b from-transparent via-border to-transparent'></div>
				</div>

				<div className={cn('fixed top-[50px] z-50 left-0 z-30 w-64 h-full lg:hidden transition-all duration-300 ease-in-out', open ? "" : "translate-x-[calc(-100%-20px)]")}>
					<div className='relative w-full h-full'>
						<div className='absolute top-0 -right-20 z-30'>
							<Button size="icon" variant="default" onClick={() => setOpen(!open)} className='rounded-full'>
								{!open ? <PanelLeftOpen /> : <PanelLeftClose />}
							</Button>
						</div>

						<div className='w-full h-full overflow-x-hidden overflow-y-auto'>
							<Sidebar onClose={() => setOpen(false)} />
						</div>
					</div>
				</div>

				<main ref={ref} className='flex-1 h-full overflow-y-auto sm:[&_.rasengan-markdown-body]:!px-20d lg:[&_.rasengan-markdown-body]:!px-10 [&_.rasengan-wrapper_.rasengan-markdown-body]:!max-w-[1200px] [&_.rasengan-wrapper-with-toc_.rasengan-markdown-body]:!max-w-[1000px]'>
					<Outlet />
					<Footer />
				</main>

			</section>

			{/* background overlay */}
			<div className={cn("fixed top-0 left-0 right-0 bottom-0 z-20 bg-black opacity-50", open ? "" : "hidden")} onClick={() => setOpen(false)}></div>
		</section>
	);
};

Layout.metadata = {
	openGraph: {
		title: 'Nindo - Markdown Editor',
		description:
			'Nindo is a modern, extensible Markdown editor built with React and powered by Shadcn UI.',
		url: 'https://rasengan.dev',
		image: 'https://nindo.rasengan.dev/assets/images/nindo.png',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Nindo - Markdown Editor',
		description:
			'Nindo is a modern, extensible Markdown editor built with React and powered by Shadcn UI.',
		image: 'https://nindo.rasengan.dev/assets/images/nindo.png',
	},
}

export default Layout;
