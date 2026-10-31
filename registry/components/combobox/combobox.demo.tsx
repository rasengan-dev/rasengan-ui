import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";

const frameworks = ["Rasengan.js", "Next.js", "Remix", "Astro", "Nuxt", "SvelteKit", "Vite", "Gatsby"];

export default function ComboboxDemo() {
	return (
		<Field className="w-full max-w-xs">
			<FieldLabel>Framework</FieldLabel>
			<Combobox items={frameworks}>
				<ComboboxInput placeholder="Pick a framework" showClear />
				<ComboboxContent>
					<ComboboxEmpty>No framework found.</ComboboxEmpty>
					<ComboboxList>
						{(framework: string) => (
							<ComboboxItem key={framework} value={framework}>
								{framework}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	);
}
