import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const sizes = { sm: "Small", default: "Default", lg: "Large" } as const;

export default function RadioGroupSizesDemo() {
	return (
		<div className="flex flex-wrap gap-12">
			{(Object.keys(sizes) as (keyof typeof sizes)[]).map((size) => (
				<RadioGroup key={size} size={size} defaultValue="genin" aria-label={`${sizes[size]} rank`}>
					<Label>
						<RadioGroupItem value="genin" />
						{sizes[size]}
					</Label>
					<Label>
						<RadioGroupItem value="chunin" />
						Chūnin
					</Label>
				</RadioGroup>
			))}
		</div>
	);
}
