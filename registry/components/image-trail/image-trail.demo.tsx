import { ImageTrail } from "@/components/ui/image-trail";

const images = [
	"/placeholders/dish-plantain.svg",
	"/placeholders/restaurant-room.svg",
	"/placeholders/dish-fish.svg",
	"/placeholders/kitchen.svg",
	"/placeholders/dish-dessert.svg",
	"/placeholders/dish-salad.svg",
];

/** Move the mouse over the area: pictures drop behind it, then fade away. */
export default function ImageTrailDemo() {
	return (
		<ImageTrail images={images} className="flex h-80 w-full max-w-2xl items-center justify-center rounded-xl border-village bg-muted">
			<p className="m-0 max-w-sm px-6 text-center font-display text-3xl font-semibold tracking-display text-foreground case-heading">
				A table for tonight, by the water
			</p>
		</ImageTrail>
	);
}
