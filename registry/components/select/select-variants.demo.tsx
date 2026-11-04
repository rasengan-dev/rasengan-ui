import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const villages = { konoha: "Konoha", kiri: "Kiri", iwa: "Iwa" };
const variants = { default: "Default", filled: "Filled", underline: "Underline", ghost: "Ghost" } as const;

export default function SelectVariantsDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
			{(Object.keys(variants) as (keyof typeof variants)[]).map((variant) => (
				<Field key={variant}>
					<FieldLabel>{variants[variant]}</FieldLabel>
					<Select items={villages} defaultValue="konoha">
						<SelectTrigger variant={variant}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(villages).map(([value, label]) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			))}
		</div>
	);
}
