import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxSizesDemo() {
	return (
		<div className="flex flex-wrap items-center gap-8">
			<Label>
				<Checkbox size="sm" defaultChecked />
				Small
			</Label>
			<Label>
				<Checkbox defaultChecked />
				Default
			</Label>
			<Label>
				<Checkbox size="lg" defaultChecked />
				Large
			</Label>
		</div>
	);
}
