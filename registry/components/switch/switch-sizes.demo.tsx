import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchSizesDemo() {
	return (
		<div className="flex flex-wrap items-center gap-8">
			<Label>
				<Switch size="sm" defaultChecked />
				Small
			</Label>
			<Label>
				<Switch defaultChecked />
				Default
			</Label>
			<Label>
				<Switch size="lg" defaultChecked />
				Large
			</Label>
		</div>
	);
}
