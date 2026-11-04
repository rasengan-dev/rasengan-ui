import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function CardDemo() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Create project</CardTitle>
				<CardDescription>Deploy a new project to Hidden Leaf in one click.</CardDescription>
				<CardAction>
					<Badge variant="secondary">Beta</Badge>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Field>
					<FieldLabel>Name</FieldLabel>
					<Input placeholder="rasengan-landing" />
				</Field>
			</CardContent>
			<CardFooter className="justify-between">
				<Button variant="outline">Cancel</Button>
				<Button>Deploy</Button>
			</CardFooter>
		</Card>
	);
}
