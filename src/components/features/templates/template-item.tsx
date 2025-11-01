import { Template } from "@/data/products";
import { cn } from "@/lib/utils";
import { Link } from "rasengan";

export default function TemplateItem({ template }: { template: Template }) {
	return (
		<Link to={`/templates/${template.slug}`}>
			<article className='mt-10 border-y border-y-border flex flex-col xl:flex-row justify-between'>
				<div className='w-full flex flex-col justify-between border-b border-b-border xl:border-b-0'>
					<div className='p-4 flex h-full flex-col justify-between'>
						<div>
							<h2 className='text-2xl font-bold text-foreground mt-2'>
								{template.name}
							</h2>
							<span className='block font-medium mt-2 text-foreground'>
								{template.heading}
							</span>
							<p className='text-foreground/70 max-w-[400px] mt-6'>
								{template.description}
							</p>
						</div>
					</div>

					<div className='w-full border-t border-t-border p-4 text-foreground flex gap-2'>
						<div className='flex gap-2'>
							<span className='font-medium text-foreground/70 line-through'>
								{template.symbol}
								{template.price}
							</span>{" "}
							<span className='font-bold'>
								{template.symbol}
								{template.newPrice}
							</span>
						</div>
						{"  -  "}
						<span className='text-foreground/70'>
							Or included with Rasengan UI Collection
						</span>
					</div>
				</div>
				<div className='flex flex-col sm:flex-row'>
					{template.images.map((image, index) => (
						<div
							key={index}
							className={cn(
								"w-full sm:w-1/2 xl:w-[400px] p-2 border-b sm:border-b-0 sm:border-l",
								index === template.images.length - 1 && "sm:border-l"
							)}
						>
							<img src={image} className='w-full h-auto rounded-lg border' />
						</div>
					))}
				</div>
			</article>
		</Link>
	);
}
