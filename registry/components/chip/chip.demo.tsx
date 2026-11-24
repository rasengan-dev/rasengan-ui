import { Chip, ChipGroup } from "@/components/ui/chip";

const slots = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

/** Pick one time slot: the chips are a toggle group, arrow keys move between them. */
export default function ChipDemo() {
	return (
		<div className="flex max-w-sm flex-col gap-2">
			<span id="chip-demo-label" className="text-sm font-medium">
				Friday, 4 December
			</span>
			<ChipGroup aria-labelledby="chip-demo-label" defaultValue={["19:30"]}>
				{slots.map((slot) => (
					<Chip key={slot} value={slot} disabled={slot === "20:00"}>
						{slot}
					</Chip>
				))}
			</ChipGroup>
		</div>
	);
}
