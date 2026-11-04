import { AtSignIcon } from "lucide-react";

import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const variants = ["default", "filled", "underline", "ghost"] as const;

export default function InputGroupVariantsDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-x-6 gap-y-5 sm:grid-cols-2">
			{variants.map((variant) => (
				<InputGroup key={variant} variant={variant}>
					<InputGroupInput placeholder={variant} aria-label={`Email (${variant})`} />
					<InputGroupAddon>
						<AtSignIcon />
					</InputGroupAddon>
				</InputGroup>
			))}
			<Field size="sm" className="sm:col-span-2">
				<FieldLabel>Small, from the Field</FieldLabel>
				<InputGroup>
					<InputGroupInput placeholder="name@konoha.dev" />
					<InputGroupAddon>
						<AtSignIcon />
					</InputGroupAddon>
				</InputGroup>
			</Field>
		</div>
	);
}
