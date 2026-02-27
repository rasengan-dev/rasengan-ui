import { Button } from "@/components/ui/button";
import { Check, Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { productsList } from "@/data/products";
import { Link } from "rasengan";
import { useEffect, useState } from "react";


export const PricingItem = ({
	product,
}: {
	product: (typeof productsList)[0];
}) => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => setIsCopied(false), 2000);
		}
	}, [isCopied]);

	return (
		<article
			className={cn(
				"relative w-full h-full min-w-[300px] md:min-w-[400px] rounded-3xl p-8 border mx-auto flex flex-col justify-between",
				product.isPopular
					? "bg-gradient-to-b from-primary/40 dark:from-primary/30 to-transparent to-70% border-primary/60"
					: "bg-background",
				!product.isActive ? "opacity-50" : ""
			)}
		>
			{!product.isActive && (
				<Badge
					variant='outline'
					className={cn(
						"bg-[#FF0034] py-2 px-4 rounded-full text-sm text-primary-foreground border-0 absolute -top-4 -right-4"
					)}
				>
					<Hourglass />
					<span>Coming soon</span>
				</Badge>
			)}

			<div className='flex flex-col items-start justify-between'>
				<span className='text-sm text-foreground/70 font-medium'>
					GET EVERYTHING WITH
				</span>
				<Badge
					variant='outline'
					className={cn(
						"bg-primary py-2 px-4 rounded-full text-sm text-primary-foreground border-0 mt-4"
						// product.isPopular && "bg-primary/10 border-primary text-foreground"
					)}
				>
					{product.name}
				</Badge>
			</div>

			<p className='text-sm mt-4 text-foreground'>{product.description}</p>

			<div className='w-full flex items-end justify-between mt-10'>
				<div className='w-full flex flex-col items-baseline gap-0 text-foreground'>
					<div className='w-full flex flex-col gap-4 sm:flex-row sm:items-center justify-between'>
						<div>
							<div>
								{product.newPrice ? (
									<div className='flex items-center gap-2'>
										<p className='text-3xl font-medium opacity-50'>
											<span className='text-3xl'>{product.symbol}</span>
											<span className='line-through'>{product.price}</span>
										</p>
										<p className='text-5xl font-medium'>
											<span className='text-3xl'>{product.symbol}</span>
											<span>{product.newPrice}</span>
										</p>
									</div>
								) : (
									<p className='text-5xl font-medium'>
										<span className='text-3xl'>{product.symbol}</span>
										<span>{product.price}</span>
									</p>
								)}
							</div>

							<div className='flex flex-col text-[12px] mt-1'>
								<span>{product.duration}</span>
							</div>
						</div>

						<Link
							to={product.isActive ? product.link : "#"}
							target={product.isActive ? "_blank" : "_self"}
						>
							<Button
								// variant={product.isPopular ? "default" : "outline"}
								className={cn(
									"w-full px-4",
									product.isPopular ? "bg-primary" : ""
								)}
								disabled={!product.isActive}
							>
								Get Full Collection
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className='mt-4 border-t pt-4 border-t-border'>
				<div className='mt-4 flex flex-col gap-2'>
					{product.features.items.map((feature, index) => (
						<div key={index} className='flex gap-2 items-center'>
							<Button
								size={"icon"}
								className='size-6 rounded-full bg-transparent'
							>
								<Check className='text-foreground' />
							</Button>

							<span className='text-sm text-foreground'>{feature}</span>
						</div>
					))}
				</div>
			</div>
		</article>
	);
};
