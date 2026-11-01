import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export default function DatePickerBirthDemo() {
	return (
		<div className="grid w-full max-w-xs gap-2">
			<Label htmlFor="birth">Date of birth</Label>
			<DatePicker
				id="birth"
				placeholder="Select a date"
				captionLayout="dropdown"
				startMonth={new Date(1930, 0)}
				endMonth={new Date()}
				disabledDays={{ after: new Date() }}
			/>
		</div>
	);
}
