import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function CarouselDemo() {
	return (
		<Carousel label="Numbers" className="w-full max-w-xs">
			<CarouselContent>
				{Array.from({ length: 5 }, (_, i) => (
					<CarouselItem key={i}>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center">
								<span className="font-display text-5xl font-semibold tracking-display">{i + 1}</span>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
			<CarouselDots />
		</Carousel>
	);
}
