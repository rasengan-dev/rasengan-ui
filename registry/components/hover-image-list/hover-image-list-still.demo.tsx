import { HoverImageList, HoverImageListItem } from "@/components/ui/hover-image-list";

const services = [
	{ name: "Branding", image: "/placeholders/logo-orbel.svg" },
	{ name: "Photography", image: "/placeholders/kitchen.svg" },
	{ name: "Websites", image: "/placeholders/product-phone.svg" },
];

/** The second row held as current, its picture beside it, as the keyboard shows it. */
export default function HoverImageListStillDemo() {
	return (
		<HoverImageList active={1} size="sm" className="w-full max-w-md">
			{services.map((service) => (
				<HoverImageListItem key={service.name} image={service.image}>
					{service.name}
				</HoverImageListItem>
			))}
		</HoverImageList>
	);
}
