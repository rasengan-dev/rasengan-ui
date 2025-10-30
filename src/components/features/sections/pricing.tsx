import { Button } from "@/components/ui/button";
import { Check, Copy, Hourglass, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { productsList } from "@/data/products";
import { Link } from "rasengan";
import { useEffect, useMemo, useState } from "react";

export default function PricingSection() {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => setIsCopied(false), 2000);
		}
	}, [isCopied]);

	const handleCopyDiscountCode = (code: string) => {
		navigator.clipboard.writeText(code);
		setIsCopied(true);
	};

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

			{/* DISPLAY COUPON */}
			<div className='w-full flex flex-col items-center max-w-[500px] p-2 rounded-2xl border border-border border-dashed my-8 mt-16 mx-auto'>
				<div className='w-full flex flex-col items-center gap-2 border p-4 rounded-lg bg-input/20'>
					<h2 className='text-xl font-bold text-foreground text-pretty'>
						Get 40% discount for your purchase
					</h2>
					<p className='mt-2 text-foreground text-pretty'>
						Use this coupon code:{" "}
						<span className='font-bold'>RASENGANUI40</span>
					</p>
					<div className='w-full mt-2 flex items-center gap-2 text-foreground'>
						<input
							type='text'
							className='border border-border rounded-lg px-4 py-2 w-full'
							defaultValue='RASENGANUI40'
							readOnly
						/>
						<Button
							variant='outline'
							onClick={() => handleCopyDiscountCode("RASENGANUI40")}
						>
							{isCopied ? (
								<Check className='h-4 w-4' />
							) : (
								<Copy className='h-4 w-4' />
							)}
						</Button>
					</div>
				</div>
			</div>

			<div className='w-full max-w-[1300px] mx-auto min-h-[400px] py-4 pt-10 flex flex-col items-center lg:flex-row gap-10 px-4'>
				<div className='w-full h-full lg:w-1/2 flex flex-col gap-4'>
					<PricingItemChild product={productsList[0].children[0]} />
					<PricingItemChild product={productsList[0].children[1]} />
				</div>

				{productsList.map((product) => (
					<div key={product.id} className={`w-full h-full lg:w-1/2`}>
						<PricingItem product={product} />
					</div>
				))}
			</div>
		</section>
	);
}

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
					{/* {discount && (
						<div className='flex items-center justify-between w-full'>
							<div className='flex flex-col-reverse sm:flex-row items-center gap-2'>
								<span className='line-through text-foreground/70'>
									<span className='text-md'>{product.symbol}</span>
									<span>{product.price}</span>
								</span>

								<span className='text-md text-green-600/70 font-bold border border-green-600 px-2 py-1 rounded-lg'>
									{product.discount
										? `${product.discount.percentage}% off`
										: ""}
								</span>
							</div>

							<Button
								variant='ghost'
								className='ml-2 text-[12px]'
								onClick={handleCopyDiscountCode}
							>
								{isCopied ? <Check /> : <Copy />}
								<span>Copy discount code</span>
							</Button>
						</div>
					)} */}

					<div className='w-full flex items-center justify-between'>
						<div>
							<p className='text-5xl font-medium'>
								<span className='text-3xl'>{product.symbol}</span>
								<span>{product.price}</span>
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
								// variant={product.isPopular ? "default" : "outline"}
								className={cn(
									"w-full px-4",
									product.isPopular ? "bg-primary" : ""
								)}
								disabled={!product.isActive}
							>
								Get Collection
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

const PricingItemChild = ({
	product,
}: {
	product: (typeof productsList)[0]["children"][number];
}) => {
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
			<h2 className='text-lg font-medium text-foreground'>{product.name}</h2>
			<div className='w-full flex items-center justify-between mt-4'>
				<div className='flex flex-col sm:flex-row gap-2 sm:items-center'>
					<p className='text-5xl font-medium text-foreground'>
						<span className='text-3xl'>{product.symbol}</span>
						<span>{product.price}</span>
					</p>
					<div className='flex flex-col text-[12px]'>
						<span className='text-foreground'>One-time payment</span>
						<span className='text-foreground/70'>{product.duration}</span>
					</div>
				</div>

				<Link
					to={product.isActive ? product.link : "#"}
					target={product.isActive ? "_blank" : "_self"}
				>
					<Button className={cn("w-full px-4")} disabled={!product.isActive}>
						Get the pack
					</Button>
				</Link>
			</div>

			<p className='mt-4 text-sm text-foreground/70'>{product.description}</p>
		</article>
	);
};
