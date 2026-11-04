import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export default function DatePickerDemo() {
	return (
		<div className="grid w-full max-w-xs gap-2">
			<Label htmlFor="due-date">Due date</Label>
			<DatePicker id="due-date" defaultValue={new Date(2026, 5, 12)} />
		</div>
	);
}
