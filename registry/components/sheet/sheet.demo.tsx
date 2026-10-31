import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>Edit profile</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>Changes are saved when you press Save.</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 px-6">
					<Field>
						<FieldLabel>Name</FieldLabel>
						<Input defaultValue="Hinata Hyūga" />
					</Field>
					<Field>
						<FieldLabel>Username</FieldLabel>
						<Input defaultValue="@hinata" />
					</Field>
				</div>
				<SheetFooter>
					<Button>Save</Button>
					<SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
