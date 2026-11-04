import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const members = [
	{ name: "Hinata", email: "hinata@konoha.dev", role: "Owner", selected: true },
	{ name: "Shikamaru", email: "shikamaru@konoha.dev", role: "Admin", selected: false },
	{ name: "Sakura", email: "sakura@konoha.dev", role: "Member", selected: false },
	{ name: "Kakashi", email: "kakashi@konoha.dev", role: "Member", selected: false },
];

export default function TableVariantsDemo() {
	return (
		<Table variant="striped" size="sm" className="max-w-2xl">
			<TableHeader>
				<TableRow>
					<TableHead className="w-8">
						<Checkbox aria-label="Select every member" />
					</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{members.map((member) => (
					<TableRow key={member.email} data-state={member.selected ? "selected" : undefined}>
						<TableCell>
							<Checkbox defaultChecked={member.selected} aria-label={`Select ${member.name}`} />
						</TableCell>
						<TableCell className="font-medium">{member.name}</TableCell>
						<TableCell className="text-muted-foreground">{member.email}</TableCell>
						<TableCell>{member.role}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
