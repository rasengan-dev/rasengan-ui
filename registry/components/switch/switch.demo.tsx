import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const settings = [
	{ label: "Notifications", checked: true },
	{ label: "Weekly digest", checked: false },
	{ label: "Beta features", checked: true, disabled: true },
];

export default function SwitchDemo() {
	return (
		<div className="grid w-full max-w-xs gap-4">
			{settings.map((setting) => (
				<Label key={setting.label} className="justify-between">
					{setting.label}
					<Switch defaultChecked={setting.checked} disabled={setting.disabled} />
				</Label>
			))}
		</div>
	);
}
