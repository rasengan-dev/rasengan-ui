import { HorizontalScroll, HorizontalScrollItem, HorizontalScrollTrack } from "@/components/ui/horizontal-scroll";

const projects = [
	{ title: "Mama Africa", kind: "Restaurant", image: "/placeholders/restaurant-room.svg" },
	{ title: "Chez Clarisse", kind: "Kitchen", image: "/placeholders/kitchen.svg" },
	{ title: "Akwa Plaza", kind: "Directions", image: "/placeholders/map-akwa.svg" },
	{ title: "Le Salon", kind: "Beauty", image: "/placeholders/person-beauty.svg" },
	{ title: "Barber Joe", kind: "Barber", image: "/placeholders/person-barber.svg" },
	{ title: "Invoices", kind: "Product", image: "/placeholders/product-invoice.svg" },
];

/** Scroll the page: on a wide screen the row pins and moves sideways; on a narrow one, swipe it. */
export default function HorizontalScrollDemo() {
	return (
		<HorizontalScroll aria-label="Recent work" className="w-full">
			<HorizontalScrollTrack>
				{projects.map((project) => (
					<HorizontalScrollItem key={project.title} className="w-72">
						<a href="#" className="group flex flex-col gap-3 rounded-lg outline-none focus-visible:focus-ring">
							<img src={project.image} alt="" className="aspect-[4/5] w-full rounded-lg bg-muted object-cover" />
							<span className="flex flex-col">
								<span className="font-display text-lg font-semibold case-heading group-hover:underline">{project.title}</span>
								<span className="text-sm text-muted-foreground">{project.kind}</span>
							</span>
						</a>
					</HorizontalScrollItem>
				))}
			</HorizontalScrollTrack>
		</HorizontalScroll>
	);
}
