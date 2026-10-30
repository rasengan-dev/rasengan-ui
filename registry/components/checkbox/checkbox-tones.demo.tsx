import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const tones = { neutral: "Neutral", primary: "Primary", success: "Success", warning: "Warning", info: "Info", destructive: "Destructive" } as const;

export default function CheckboxTonesDemo() {
	return (
		<div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">
			{(Object.keys(tones) as (keyof typeof tones)[]).map((tone) => (
				<Label key={tone}>
					<Checkbox tone={tone} defaultChecked />
					{tones[tone]}
				</Label>
			))}
		</div>
	);
}
