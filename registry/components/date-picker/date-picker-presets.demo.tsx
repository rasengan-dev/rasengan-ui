import { addDays, addMonths, startOfMonth } from "date-fns";

import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

const today = new Date();

export default function DatePickerPresetsDemo() {
	return (
		<div className="grid w-full max-w-xs gap-5">
			<div className="grid gap-2">
				<Label htmlFor="reminder">Remind me</Label>
				<DatePicker
					id="reminder"
					placeholder="Pick a day"
					presets={[
						{ label: "Today", value: today },
						{ label: "Tomorrow", value: addDays(today, 1) },
						{ label: "In 3 days", value: addDays(today, 3) },
						{ label: "In a week", value: addDays(today, 7) },
					]}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="report">Report period</Label>
				<DateRangePicker
					id="report"
					placeholder="Pick a period"
					presets={[
						{ label: "Last 7 days", value: { from: addDays(today, -6), to: today } },
						{ label: "Last 30 days", value: { from: addDays(today, -29), to: today } },
						{ label: "This month", value: { from: startOfMonth(today), to: today } },
						{ label: "Last month", value: { from: startOfMonth(addMonths(today, -1)), to: addDays(startOfMonth(today), -1) } },
					]}
				/>
			</div>
		</div>
	);
}
