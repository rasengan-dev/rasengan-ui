import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";

const villages = { konoha: "Konoha", kiri: "Kiri", iwa: "Iwa", kumo: "Kumo" };

export default function SelectDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
			<Field>
				<FieldLabel>Village</FieldLabel>
				<Select items={villages} defaultValue="konoha">
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Launch</SelectLabel>
							<SelectItem value="konoha">Konoha</SelectItem>
							<SelectItem value="kiri">Kiri</SelectItem>
							<SelectItem value="iwa">Iwa</SelectItem>
						</SelectGroup>
						<SelectSeparator />
						<SelectGroup>
							<SelectLabel>Coming soon</SelectLabel>
							<SelectItem value="kumo" disabled>
								Kumo
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<FieldDescription>Changes the whole design language.</FieldDescription>
			</Field>
			<Field>
				<FieldLabel>Framework</FieldLabel>
				<Select items={{ rasengan: "Rasengan.js", vite: "Vite", next: "Next.js" }}>
					<SelectTrigger>
						<SelectValue placeholder="Pick a framework" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="rasengan">Rasengan.js</SelectItem>
						<SelectItem value="vite">Vite</SelectItem>
						<SelectItem value="next">Next.js</SelectItem>
					</SelectContent>
				</Select>
			</Field>
		</div>
	);
}
