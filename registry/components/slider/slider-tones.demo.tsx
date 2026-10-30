import { Slider } from "@/components/ui/slider";

const tones = { neutral: "Neutral", primary: "Primary", success: "Success", warning: "Warning", info: "Info", destructive: "Destructive" } as const;

export default function SliderTonesDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-x-10 gap-y-6 sm:grid-cols-2">
			{(Object.keys(tones) as (keyof typeof tones)[]).map((tone, index) => (
				<Slider key={tone} tone={tone} defaultValue={30 + index * 10} aria-label={tones[tone]} />
			))}
		</div>
	);
}
