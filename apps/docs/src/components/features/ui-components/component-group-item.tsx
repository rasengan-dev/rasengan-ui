import { Link } from "rasengan";
import Image from "@rasenganjs/image";

export default function ComponentGroupItem({
	title,
	components,
	link = "#",
	image,
}: {
	title: string;
	components: number;
	link?: string;
	image: string;
}) {
	return (
		<Link to={link}>
			<article className='w-full relative hover:bg-muted/30 p-4 transition-all'>
				<div className='w-full aspect-[16/12] rounded-lg bg-muted/50 relative flex items-center border p-6 before:absolute before:inset-0 before:bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] before:[--dots-color:--alpha(var(--color-foreground)/15%)] before:[background-size:16px_16px] max-sm:min-h-64 sm:p-10'>
					{/* <div className='border-[1px] h-fullk bg-white/60 rounded-lg overflow-hidden relative m-auto max-h-56f object-contain'> */}
					<img
						src={image}
						alt={title}
						className='object-contain min-h-full h-full mw-full border-2n pointer-events-none border-background rounded-lg sm:rounded-lg object-coverf ring-1j mx-auto ring-foreground/[0.065] shadow-lg shadow-black/5 z-10'
					/>
					{/* </div> */}
				</div>

				<div className='mt-4'>
					<h2 className='text-md font-medium text-foreground'>{title}</h2>
					<p className='text-sm text-foreground/70 mt-1'>
						{components} examples
					</p>
				</div>
			</article>
		</Link>
	);
}
