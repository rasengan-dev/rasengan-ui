import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const tones = { neutral: "Neutral", primary: "Primary", success: "Success", warning: "Warning", info: "Info", destructive: "Destructive" } as const;

export default function RadioGroupTonesDemo() {
	return (
		<div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">
			{(Object.keys(tones) as (keyof typeof tones)[]).map((tone) => (
				<RadioGroup key={tone} tone={tone} defaultValue="on" aria-label={tones[tone]}>
					<Label>
						<RadioGroupItem value="on" />
						{tones[tone]}
					</Label>
				</RadioGroup>
			))}
		</div>
	);
}
