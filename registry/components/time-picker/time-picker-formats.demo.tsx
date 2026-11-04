import { Field, FieldLabel } from "@/components/ui/field";
import { TimeInput, TimePicker } from "@/components/ui/time-picker";

export default function TimePickerFormatsDemo() {
	return (
		<div className="grid w-full max-w-md gap-5 sm:grid-cols-2">
			<Field>
				<FieldLabel>With seconds</FieldLabel>
				<TimeInput step={1} defaultValue="18:45:30" />
			</Field>
			<Field size="sm" variant="filled">
				<FieldLabel>Small, filled</FieldLabel>
				<TimeInput defaultValue="07:15" />
			</Field>
			<Field>
				<FieldLabel>12 hours</FieldLabel>
				<TimePicker hourCycle={12} min="08:00" max="20:00" interval={60} defaultValue="13:00" />
			</Field>
			<Field>
				<FieldLabel>24 hours, every 15 minutes</FieldLabel>
				<TimePicker hourCycle={24} min="12:00" max="14:00" interval={15} defaultValue="12:45" />
			</Field>
		</div>
	);
}
