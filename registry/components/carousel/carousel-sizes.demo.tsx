import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const projects = [
	{ name: "Lumen", kind: "SaaS", text: "Invoices chased for you." },
	{ name: "Northwind", kind: "Shop", text: "Coffee by subscription." },
	{ name: "Globex", kind: "Agency", text: "Launch films for dev tools." },
	{ name: "Initech", kind: "Docs", text: "Runbooks your team reads." },
	{ name: "Hooli", kind: "App", text: "A calendar that says no." },
	{ name: "Stark", kind: "Store", text: "Parts, shipped the same day." },
];

export default function CarouselSizesDemo() {
	return (
		<Carousel label="Featured projects" align="start" loop className="w-full max-w-xl">
			<CarouselContent>
				{projects.map((project) => (
					<CarouselItem key={project.name} className="basis-full sm:basis-1/2 md:basis-1/3">
						<Card size="sm" className="h-full">
							<CardHeader>
								<Badge variant="soft" className="w-fit">
									{project.kind}
								</Badge>
								<CardTitle>{project.name}</CardTitle>
								<CardDescription>{project.text}</CardDescription>
							</CardHeader>
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
