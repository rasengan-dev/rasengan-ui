import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function DialogDemo() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>Invite a teammate</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite a teammate</DialogTitle>
					<DialogDescription>They get access to every project in this workspace.</DialogDescription>
				</DialogHeader>
				<Field>
					<FieldLabel>Email</FieldLabel>
					<Input type="email" placeholder="sakura@konoha.dev" />
					<FieldDescription>They get an email with a link to join.</FieldDescription>
				</Field>
				<DialogFooter>
					<DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
					<Button>Send invite</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
