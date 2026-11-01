import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { TimeInput, TimePicker } from "@/components/ui/time-picker";

export default function TimePickerDemo() {
	return (
		<div className="grid w-full max-w-md gap-5 sm:grid-cols-2">
			<Field>
				<FieldLabel>Start time</FieldLabel>
				<TimeInput defaultValue="09:30" />
				<FieldDescription>Type it, or use the arrow keys.</FieldDescription>
			</Field>
			<Field>
				<FieldLabel>Meeting slot</FieldLabel>
				<TimePicker min="09:00" max="17:30" interval={30} defaultValue="14:00" />
				<FieldDescription>Every 30 minutes, 9:00 to 17:30.</FieldDescription>
			</Field>
		</div>
	);
}
