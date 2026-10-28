import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const plans = [
	{ value: "genin", title: "Genin", description: "Free, one project." },
	{ value: "chunin", title: "Chunin", description: "For a team, unlimited projects." },
	{ value: "jonin", title: "Jonin", description: "Organisations. Talk to us.", disabled: true },
];

export default function RadioGroupDemo() {
	return (
		<RadioGroup defaultValue="chunin" aria-label="Plan">
			{plans.map((plan) => (
				<Label key={plan.value} className="items-start">
					<RadioGroupItem value={plan.value} disabled={plan.disabled} className="mt-px" />
					<span className="grid gap-1">
						{plan.title}
						<span className="font-sans text-sm font-normal tracking-normal text-muted-foreground normal-case">{plan.description}</span>
					</span>
				</Label>
			))}
		</RadioGroup>
	);
}
