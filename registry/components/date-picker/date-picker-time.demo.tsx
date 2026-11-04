import { DateTimePicker } from "@/components/ui/date-picker";

export default function DatePickerTimeDemo() {
	return (
		<div className="grid w-full max-w-sm gap-2">
			<p className="text-sm font-medium" id="meeting-label">
				Meeting
			</p>
			<DateTimePicker aria-labelledby="meeting-label" defaultValue={new Date(2026, 5, 12, 14, 30)} format="PP" />
		</div>
	);
}
