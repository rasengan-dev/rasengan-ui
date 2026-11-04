import { Slider } from "@/components/ui/slider";

export default function SliderSizesDemo() {
	return (
		<div className="grid w-full max-w-sm gap-8">
			<Slider size="sm" defaultValue={40} aria-label="Small" />
			<Slider defaultValue={55} aria-label="Default" />
			<Slider size="lg" defaultValue={70} aria-label="Large" />
		</div>
	);
}
