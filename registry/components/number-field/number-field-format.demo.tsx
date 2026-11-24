import { Field, FieldLabel } from "@/components/ui/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";

/** `format` takes Intl.NumberFormat's options: a price that steps by 5, and a weight in kilograms. */
export default function NumberFieldFormatDemo() {
	return (
		<div className="flex w-full max-w-md flex-wrap items-start gap-4">
			<Field className="w-44">
				<FieldLabel>Tip</FieldLabel>
				<NumberField defaultValue={10} min={0} step={5} format={{ style: "currency", currency: "EUR" }}>
					<NumberFieldGroup>
						<NumberFieldDecrement />
						<NumberFieldInput />
						<NumberFieldIncrement />
					</NumberFieldGroup>
				</NumberField>
			</Field>
			<Field className="w-44" variant="filled" size="sm">
				<FieldLabel>Weight</FieldLabel>
				<NumberField defaultValue={1.5} min={0.5} step={0.5} format={{ style: "unit", unit: "kilogram", maximumFractionDigits: 1 }}>
					<NumberFieldGroup>
						<NumberFieldDecrement />
						<NumberFieldInput />
						<NumberFieldIncrement />
					</NumberFieldGroup>
				</NumberField>
			</Field>
		</div>
	);
}
