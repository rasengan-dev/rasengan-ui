import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FieldDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
			<Field>
				<FieldLabel>Email</FieldLabel>
				<Input type="email" placeholder="naruto@konoha.dev" />
				<FieldDescription>Used to sign in. Never shared.</FieldDescription>
			</Field>
			<Field invalid>
				<FieldLabel>Password</FieldLabel>
				<Input type="password" defaultValue="chakra" />
				<FieldError match>Use at least 12 characters.</FieldError>
			</Field>
			<Field disabled>
				<FieldLabel>Team</FieldLabel>
				<Input defaultValue="Team 7" />
				<FieldDescription>Set by your admin.</FieldDescription>
			</Field>
			<Field>
				<FieldLabel>Message</FieldLabel>
				<Textarea placeholder="Tell the team what changed…" />
				<FieldDescription>Markdown is supported.</FieldDescription>
			</Field>
		</div>
	);
}
