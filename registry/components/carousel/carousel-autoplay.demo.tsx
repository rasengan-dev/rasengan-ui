import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel";

const quotes = [
	{ quote: "We shipped the landing page before lunch.", who: "Ada, Lumen" },
	{ quote: "Switching to Iwa took one attribute.", who: "Grace, Northwind" },
	{ quote: "Our agent installs the components right.", who: "Linus, Globex" },
];

export default function CarouselAutoplayDemo() {
	return (
		<Carousel label="What people say" autoplay={4} loop className="w-full max-w-md">
			<CarouselContent>
				{quotes.map(({ quote, who }) => (
					<CarouselItem key={who}>
						<figure className="m-0 flex flex-col gap-3 rounded-lg border-village bg-card p-6 pe-14">
							<blockquote className="m-0 font-display text-xl font-semibold tracking-display">“{quote}”</blockquote>
							<figcaption className="text-sm text-muted-foreground">{who}</figcaption>
						</figure>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselDots />
		</Carousel>
	);
}
