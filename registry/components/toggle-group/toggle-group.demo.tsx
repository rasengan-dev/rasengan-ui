import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDemo() {
	return (
		<div className="flex flex-wrap items-center gap-6">
			<ToggleGroup variant="outline" defaultValue={["week"]} aria-label="View">
				<ToggleGroupItem value="day">Day</ToggleGroupItem>
				<ToggleGroupItem value="week">Week</ToggleGroupItem>
				<ToggleGroupItem value="month">Month</ToggleGroupItem>
			</ToggleGroup>
			<ToggleGroup multiple defaultValue={["bold", "italic"]} aria-label="Text formatting">
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="underline" aria-label="Underline">
					<UnderlineIcon />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	);
}
