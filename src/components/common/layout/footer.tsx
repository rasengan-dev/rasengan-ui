import { Link } from "rasengan";
import AppLogo from "../atoms/app-logo";

export function Footer() {
	return (
		<footer className='w-full bg-background py-20'>
			<div className='mt-10 w-full border-y-[1px] border-y-border px-4 py-2'>
				<div className='flex items-center gap-2'>
					<AppLogo size='sm' />
					<span className='text-foreground font-medium'>Rasengan UI</span>
				</div>
				<p className='text-foreground/70 text-sm mt-2 max-w-[340px]'>
					Rasengan UI is a collection of ready-to-use UI components built for
					any React app.
				</p>
			</div>

			<div className='mt-10 w-full border-y-[1px] border-y-border px-4 py-1 flex items-center gap-2'>
				<p className='text-foreground/70 text-sm mr-2'>
					© 2025 Rasengan Labs. All rights reserved.
				</p>

				{/* Vertical line */}
				<div className='w-[1px] h-6 bg-border'></div>

				<Link to='/privacy'>
					<div className='py-2 px-2 flex items-center justify-center text-foreground/70 hover:text-foreground hover:cursor-pointer transition-all'>
						<span className='text-sm'>Privacy Policy</span>
					</div>
				</Link>

				{/* Vertical line */}
				<div className='w-[1px] h-6 bg-border'></div>

				<Link to='/change-log'>
					<div className='py-2 px-2 flex items-center justify-center text-foreground/70 hover:text-foreground hover:cursor-pointer transition-all'>
						<span className='text-sm'>Change Log</span>
					</div>
				</Link>
			</div>
		</footer>
	);
}
