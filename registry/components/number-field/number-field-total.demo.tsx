"use client";

import * as React from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
import { NumberRoll } from "@/components/ui/number-roll";

const price = 4500;
const money: Intl.NumberFormatOptions = { style: "currency", currency: "XAF", maximumFractionDigits: 0 };

/** With Number Roll beside it: the total rolls to its new value at each step, as the village moves. */
export default function NumberFieldTotalDemo() {
	const [quantity, setQuantity] = React.useState<number | null>(2);
	const count = quantity ?? 0;
	return (
		<div className="flex w-full max-w-sm items-end justify-between gap-6">
			<Field className="w-36">
				<FieldLabel>Ndolè plates</FieldLabel>
				<NumberField value={quantity} onValueChange={setQuantity} min={1} max={20}>
					<NumberFieldGroup>
						<NumberFieldDecrement aria-label="One plate fewer" />
						<NumberFieldInput />
						<NumberFieldIncrement aria-label="One plate more" />
					</NumberFieldGroup>
				</NumberField>
			</Field>
			<div className="flex flex-col items-end gap-1">
				<span className="text-sm text-muted-foreground">Total</span>
				<NumberRoll
					value={count * price}
					format={money}
					locale="fr-CM"
					trigger="mount"
					live="polite"
					className="font-display text-2xl font-semibold tracking-display"
				/>
			</div>
		</div>
	);
}
