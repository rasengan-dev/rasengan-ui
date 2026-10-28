import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxDemo() {
	return (
		<div className="grid gap-4">
			<Label>
				<Checkbox defaultChecked />
				Accept the terms
			</Label>
			<Label>
				<Checkbox />
				Email me about releases
			</Label>
			<Label>
				<Checkbox indeterminate />
				Select all teams
			</Label>
			<Label>
				<Checkbox disabled />
				Archived teams
			</Label>
		</div>
	);
}
