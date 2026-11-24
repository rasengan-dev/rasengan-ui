import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";

export default function NumberFieldDemo() {
	return (
		<Field className="w-full max-w-44">
			<FieldLabel>Guests</FieldLabel>
			<NumberField name="guests" defaultValue={2} min={1} max={12}>
				<NumberFieldGroup>
					<NumberFieldDecrement aria-label="Fewer guests" />
					<NumberFieldInput />
					<NumberFieldIncrement aria-label="More guests" />
				</NumberFieldGroup>
			</NumberField>
			<FieldDescription>Up to 12 at one table.</FieldDescription>
		</Field>
	);
}
