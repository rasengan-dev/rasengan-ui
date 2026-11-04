import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";

const villages = ["Konoha", "Kiri", "Iwa", "Kumo", "Suna", "Uzushio", "Ame", "Taki"];

export default function ComboboxMultipleDemo() {
	const anchor = useComboboxAnchor();
	return (
		<Field className="w-full max-w-sm">
			<FieldLabel>Villages</FieldLabel>
			<Combobox items={villages} multiple defaultValue={["Konoha", "Kiri"]}>
				<ComboboxChips ref={anchor}>
					<ComboboxValue>
						{(values: string[]) => (
							<>
								{values.map((village) => (
									<ComboboxChip key={village} aria-label={village}>
										{village}
									</ComboboxChip>
								))}
								<ComboboxChipsInput placeholder={values.length ? "" : "Add villages"} />
							</>
						)}
					</ComboboxValue>
				</ComboboxChips>
				<ComboboxContent anchor={anchor}>
					<ComboboxEmpty>No village found.</ComboboxEmpty>
					<ComboboxList>
						{(village: string) => (
							<ComboboxItem key={village} value={village}>
								{village}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	);
}
