import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaVariantsDemo() {
	return (
		<div className="grid w-full max-w-3xl gap-5 sm:grid-cols-3">
			<Field>
				<FieldLabel>Default</FieldLabel>
				<Textarea placeholder="What changed?" />
			</Field>
			<Field>
				<FieldLabel>Filled</FieldLabel>
				<Textarea variant="filled" placeholder="What changed?" />
			</Field>
			<Field>
				<FieldLabel>Underline</FieldLabel>
				<Textarea variant="underline" placeholder="What changed?" />
			</Field>
		</div>
	);
}
