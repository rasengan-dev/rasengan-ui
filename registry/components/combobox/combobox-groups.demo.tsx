import {
	Combobox,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
} from "@/components/ui/combobox";

const timezones = [
	{ value: "Africa", items: ["Africa/Douala", "Africa/Lagos", "Africa/Nairobi"] },
	{ value: "Europe", items: ["Europe/Paris", "Europe/London", "Europe/Berlin"] },
	{ value: "Asia", items: ["Asia/Tokyo", "Asia/Seoul", "Asia/Singapore"] },
];

export default function ComboboxGroupsDemo() {
	return (
		<div className="grid w-full max-w-xs gap-4">
			<Combobox items={timezones}>
				<ComboboxInput placeholder="Time zone" aria-label="Time zone" size="sm" />
				<ComboboxContent>
					<ComboboxEmpty>No time zone found.</ComboboxEmpty>
					<ComboboxList>
						{(group: (typeof timezones)[number]) => (
							<ComboboxGroup key={group.value} items={group.items}>
								<ComboboxLabel>{group.value}</ComboboxLabel>
								<ComboboxCollection>
									{(zone: string) => (
										<ComboboxItem key={zone} value={zone}>
											{zone}
										</ComboboxItem>
									)}
								</ComboboxCollection>
							</ComboboxGroup>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<Combobox items={["Low", "Medium", "High"]}>
				<ComboboxInput placeholder="Priority (filled)" aria-label="Priority" variant="filled" />
				<ComboboxContent>
					<ComboboxList>
						{(priority: string) => (
							<ComboboxItem key={priority} value={priority}>
								{priority}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</div>
	);
}
