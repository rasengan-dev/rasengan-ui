import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function InputVariantsDemo() {
	return (
		<div className="grid w-full max-w-sm gap-5">
			<Field>
				<FieldLabel>Default</FieldLabel>
				<Input placeholder="naruto@konoha.dev" />
			</Field>
			<Field>
				<FieldLabel>Filled</FieldLabel>
				<Input variant="filled" placeholder="naruto@konoha.dev" />
			</Field>
			<Field>
				<FieldLabel>Underline</FieldLabel>
				<Input variant="underline" placeholder="naruto@konoha.dev" />
			</Field>
		</div>
	);
}
