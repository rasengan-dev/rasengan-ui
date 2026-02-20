import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = {
	className?: ComponentProps<"article">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const BookingCard1 = ({ className }: Props) => {
	return (
		<article
			className={cn(
				"w-full max-w-[350px] rounded-3xl shadow-md bg-background dark:bg-input/70 overflow-hidden",
				className
			)}
		>
			<div className='relative w-full'>
				<Carousel
					className='w-full'
					opts={{
						align: "start",
						loop: true,
					}}
				>
					<CarouselContent>
						{Array.from({ length: 4 }).map((_, index) => (
							<CarouselItem key={index}>
								<div className='p-0'>
									<img
										src={`${registryUrl}/static/images/booking/${index + 1}.jpeg`}
										alt='Avatar'
										className='rounded-3xl w-full h-[250px]'
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className='translate-x-16 bg-white dark:bg-white hover:bg-white/80 dark:hover:bg-white/80 hover:text-black/90 dark:border-transparent' />
					<CarouselNext className='-translate-x-16 bg-white dark:bg-white hover:bg-white/80 dark:hover:bg-white/80 hover:text-black/90 dark:border-transparent' />
				</Carousel>
			</div>

			<div className='p-4'>
				<div className='flex flex-col items-start justify-between'>
					<h1 className='font-medium text-foreground'>The Ubud Jungle Villa</h1>
					<span className='text-sm text-muted-foreground'>
						Located in Ubud, Bali, Indonesia
					</span>
				</div>

				<div className='mt-4 text-sm'>
					<p className='text-foreground'>
						Perched above the lush tropical rainforest, this open-air Balinese
						villa features thatched roofs, bamboo...
					</p>

					<span className='block text-muted-foreground underline mt-2 cursor-pointer'>
						Read more
					</span>
				</div>

				<div className='my-4 font-medium text-foreground'>
					<p>From $199.99 / night</p>
				</div>

				<div className='flex items-center gap-4'>
					<Button
						variant={"outline"}
						className='rounded-full w-full text-foreground'
					>
						Add to Favorites
					</Button>
					<Button className='rounded-full w-full'>Book Now</Button>
				</div>
			</div>
		</article>
	);
};
