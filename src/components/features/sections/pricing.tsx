import { Button } from "@/components/ui/button";
import { Check, Copy, Hourglass, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { productsList } from "@/data/products";
import { Link } from "rasengan";
import { useEffect, useMemo, useState } from "react";

export default function PricingSection() {
	return (
		<section id='pricing' className='w-full'>
			<div className='p-4 w-full border-b-[1px] border-b-border'>
				<h1 className='text-[50px] leading-[60px] text-start max-w-[700px] text-foreground text-pretty'>
					Pricing
				</h1>
				<p className='max-w-[500px] text-start mt-2 text-foreground text-pretty'>
					Get access to all our premium components and features by choosing a
					plan that best fit with your goal.
				</p>
			</div>

			<div className='w-full max-w-[1000px] mx-auto min-h-[400px] py-4 pt-20 flex flex-col lg:flex-row items-center gap-4 pricing-gridf px-4'>
				{productsList.map((product) => (
					<div key={product.id} className={`h-full area-${product.id}`}>
						<PricingItem product={product} />
					</div>
				))}
			</div>
		</section>
	);
}

const PricingItem = ({ product }: { product: (typeof productsList)[0] }) => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => setIsCopied(false), 2000);
		}
	}, [isCopied]);

	const { price, discount, discountCode } = useMemo(() => {
		if (product.discount) {
			const newPrice = (
				product.price -
				Math.round(product.price * product.discount.percentage) / 100
			).toFixed(2);
			return {
				price: newPrice,
				discount: true,
				discountCode: product.discount.code,
			};
		}

		return { price: product.price, discount: false, discountCode: "" };
	}, [product]);

	const handleCopyDiscountCode = () => {
		navigator.clipboard.writeText(discountCode);
		setIsCopied(true);
	};

	return (
		<article
			className={cn(
				"relative w-full h-full min-w-[300px] md:min-w-[400px] rounded-3xl p-4 border mx-auto flex flex-col justify-between",
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

			<div className='flex items-center justify-between'>
				<Badge
					variant='outline'
					className={cn(
						"bg-primary py-2 px-4 rounded-full text-sm text-primary-foreground border-0"
						// product.isPopular && "bg-primary/10 border-primary text-foreground"
					)}
				>
					{product.name}
				</Badge>
			</div>

			<p className='text-sm mt-4 text-foreground'>{product.description}</p>

			<div className='w-full flex items-end justify-between mt-10'>
				<div className='w-full flex flex-col items-baseline gap-0 text-foreground'>
					{discount && (
						<div className='flex items-center justify-between w-full'>
							<div className='flex items-center gap-2'>
								<span className='line-through text-foreground/70'>
									<span className='text-md'>{product.symbol}</span>
									<span>{product.price}</span>
								</span>

								<span className='text-md'>
									{product.discount
										? `${product.discount.percentage}% off`
										: ""}
								</span>
							</div>

							{/* Copy discount code */}
							<Button
								variant='ghost'
								className='ml-2 text-[12px]'
								onClick={handleCopyDiscountCode}
							>
								{isCopied ? <Check /> : <Copy />}
								<span>Copy discount code</span>
							</Button>
						</div>
					)}

					<div className='w-full flex items-center justify-between'>
						<div>
							<p className='text-5xl font-medium'>
								<span className='text-3xl'>{product.symbol}</span>
								<span>{price}</span>
							</p>
							<div className='flex flex-col text-[12px] mt-1'>
								<span>{product.duration}</span>
							</div>
						</div>

						<Link
							to={product.isActive ? product.link : "#"}
							target={product.isActive ? "_blank" : "_self"}
						>
							<Button
								variant={product.isPopular ? "default" : "outline"}
								className={cn(
									"w-full px-4",
									product.isPopular
										? "bg-primary"
										: "dark:text-foreground border dark:border-primary"
								)}
								disabled={!product.isActive}
							>
								Buy now
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
