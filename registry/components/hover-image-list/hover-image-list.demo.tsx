import { HoverImageList, HoverImageListItem } from "@/components/ui/hover-image-list";

const projects = [
	{ name: "Akwa Dining Room", kind: "Interior · 2026", image: "/placeholders/restaurant-room.svg", href: "#akwa" },
	{ name: "Open Kitchen", kind: "Photography · 2025", image: "/placeholders/kitchen.svg", href: "#kitchen" },
	{ name: "Plantain Menu", kind: "Branding · 2025", image: "/placeholders/dish-plantain.svg", href: "#plantain" },
	{ name: "Kelvo Dashboard", kind: "Product · 2024", image: "/placeholders/product-dashboard.svg", href: "#kelvo" },
];

/** Hover a row: its picture follows the mouse, and the other rows step back. */
export default function HoverImageListDemo() {
	return (
		<HoverImageList className="w-full max-w-2xl">
			{projects.map((project) => (
				<HoverImageListItem key={project.name} href={project.href} image={project.image}>
					{project.name}
					<small>{project.kind}</small>
				</HoverImageListItem>
			))}
		</HoverImageList>
	);
}
