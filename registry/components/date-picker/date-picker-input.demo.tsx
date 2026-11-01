import { DateInput } from "@/components/ui/date-picker";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

export default function DatePickerInputDemo() {
	return (
		<Field className="w-full max-w-xs">
			<FieldLabel>Subscription date</FieldLabel>
			<DateInput defaultValue={new Date(2026, 5, 12)} />
			<FieldDescription>Type a date such as 6/12/2026 or June 12 2026, or press Arrow Down.</FieldDescription>
		</Field>
	);
}
