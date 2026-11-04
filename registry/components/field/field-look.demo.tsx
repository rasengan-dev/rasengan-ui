import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const roles = { genin: "Genin", chunin: "Chūnin", jonin: "Jōnin" };

export default function FieldLookDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
			<div className="grid content-start gap-4">
				<Field size="sm" variant="filled">
					<FieldLabel>Name</FieldLabel>
					<Input placeholder="Kakashi Hatake" />
				</Field>
				<Field size="sm" variant="filled">
					<FieldLabel>Rank</FieldLabel>
					<Select items={roles} defaultValue="jonin">
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(roles).map(([value, label]) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldDescription>Small and filled, from the Field.</FieldDescription>
				</Field>
			</div>
			<div className="grid content-start gap-4">
				<Field size="lg" variant="underline">
					<FieldLabel>Mission</FieldLabel>
					<Input placeholder="Escort the bridge builder" />
				</Field>
				<Field size="lg" variant="underline">
					<FieldLabel>Report</FieldLabel>
					<Textarea placeholder="What happened in the Land of Waves…" />
					<FieldDescription>Large and underlined, from the Field.</FieldDescription>
				</Field>
			</div>
		</div>
	);
}
