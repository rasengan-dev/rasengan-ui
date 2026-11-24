import { TextRotate } from "@/components/ui/text-rotate";

/** Endless: longer than five seconds, so it shows a pause button. */
export default function TextRotateLoopDemo() {
	return (
		<div className="flex items-center">
			<TextRotate as="p" position="start" words={["Restaurants", "Salons", "Garages", "Studios"]} loops={Infinity} interval={2} className="text-2xl font-semibold">
				deserve a website.
			</TextRotate>
		</div>
	);
}
