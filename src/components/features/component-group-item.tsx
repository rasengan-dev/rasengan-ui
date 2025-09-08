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
				<div className='w-full aspect-[16/12] rounded-lg  bg-muted/50 relative flex items-center border p-6 before:absolute before:inset-0 before:bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] before:[--dots-color:--alpha(var(--color-foreground)/15%)] before:[background-size:16px_16px] max-sm:min-h-64 sm:p-10'>
					<div className='border-[1px] rounded-lg overflow-hidden relative m-auto max-h-56f object-contain'>
						<img
							src={image}
							alt={title}
							className='object-cover h-auto w-full border-2 pointer-events-none border-background rounded-md sm:rounded-lg object-coverf ring-1 ring-foreground/[0.065] shadow-lg shadow-black/5'
						/>
					</div>
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
