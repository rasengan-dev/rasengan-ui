import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

type Props = {
	className?: ComponentProps<"article">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const BookingCard4 = ({ className }: Props) => {
	return (
		<article
			className={cn(
				"w-full max-w-[400px] rounded-2xl shadow-md bg-background dark:bg-input/40 overflow-hidden",
				className
			)}
		>
			<div className='p-4'>
				<div className='flex items-baseline justify-between'>
					<div className='flex flex-col items-start justify-between'>
						<h1 className='font-medium text-foreground'>
							The Ubud Jungle Villa
						</h1>
						<span className='text-sm text-muted-foreground'>
							Located in Ubud, Bali, Indonesia
						</span>
					</div>

					<Badge variant={"outline"} className='rounded-full py-2 px-4'>
						Top rated
					</Badge>
				</div>

				<div className='mt-4 text-sm'>
					<p className='text-foreground'>
						Perched above the lush tropical rainforest, this open-air Balinese
						villa features thatched roofs, bamboo...
					</p>
				</div>

				<div className='flex items-center justify-between gap-4 mt-4'>
					<p className='text-foreground'>From $199.99 / night</p>
					<Button className='rounded-full h-10 pr-2'>
						<span>Book Now</span>
						<div className='rounded-full p-1 bg-background flex items-center justify-center text-foreground'>
							<ArrowUpRight size={14} />
						</div>
					</Button>
				</div>
			</div>

			<div className='relative w-full'>
				<Carousel
					className='w-full'
					opts={{
						align: "start",
						loop: true,
					}}
					plugins={[
						Autoplay({
							delay: 4000,
						}),
					]}
				>
					<CarouselContent>
						{Array.from({ length: 4 }).map((_, index) => (
							<CarouselItem key={index}>
								<div className='relative p-0'>
									<img
										src={`${registryUrl}/static/images/booking/${index + 1}.jpeg`}
										alt='Avatar'
										className='rounded-2xl w-full h-[340px]'
									/>

									<div className='absolute inset-0 bg-black/50 p-4 rounded-2xl flex items-end justify-between'>
										<div>
											<Badge
												variant={"secondary"}
												className='rounded-full py-2 px-4'
											>
												Adventure
											</Badge>

											<Badge
												variant={"secondary"}
												className='rounded-full py-2 px-4 ml-2'
											>
												Jungle
											</Badge>
										</div>

										<div>
											<Badge className='bg-transparent hover:bg-transparent text-white rounded-full py-2 px-4 ml-2 gap-1'>
												<Star size={14} />
												<span>4.8</span>
											</Badge>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</article>
	);
};
