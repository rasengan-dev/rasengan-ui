import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
	return (
		<Tabs defaultValue="account" className="w-full max-w-sm">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsTrigger value="team" disabled>
					Team
				</TabsTrigger>
			</TabsList>
			<TabsContent value="account" className="grid gap-4">
				<Field>
					<FieldLabel>Display name</FieldLabel>
					<Input defaultValue="Naruto" />
				</Field>
				<Button size="sm" className="w-fit">
					Save changes
				</Button>
			</TabsContent>
			<TabsContent value="password" className="grid gap-4">
				<Field>
					<FieldLabel>New password</FieldLabel>
					<Input type="password" />
					<FieldDescription>At least 12 characters.</FieldDescription>
				</Field>
				<Button size="sm" className="w-fit">
					Update password
				</Button>
			</TabsContent>
		</Tabs>
	);
}
