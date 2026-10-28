import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
	return (
		<div className="grid w-full max-w-sm gap-8">
			<Slider defaultValue={60} aria-label="Volume" />
			<Slider defaultValue={[20, 70]} aria-label="Price range" />
			<Slider defaultValue={40} aria-label="Chakra" disabled />
		</div>
	);
}
