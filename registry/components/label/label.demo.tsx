import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LabelDemo() {
	return (
		<div className="grid w-full max-w-sm gap-2">
			<Label htmlFor="label-demo-name">Display name</Label>
			<Input id="label-demo-name" defaultValue="Naruto Uzumaki" />
		</div>
	);
}
