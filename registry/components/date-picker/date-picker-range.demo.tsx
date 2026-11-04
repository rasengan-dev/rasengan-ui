import { DateRangePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export default function DatePickerRangeDemo() {
	return (
		<div className="grid w-full max-w-xs gap-2">
			<Label htmlFor="stay">Stay</Label>
			<DateRangePicker id="stay" defaultValue={{ from: new Date(2026, 5, 9), to: new Date(2026, 5, 20) }} />
		</div>
	);
}
