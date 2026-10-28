import { BellIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Toggle aria-label="Bold" defaultPressed>
				<BoldIcon />
			</Toggle>
			<Toggle aria-label="Italic">
				<ItalicIcon />
			</Toggle>
			<Toggle aria-label="Underline" disabled>
				<UnderlineIcon />
			</Toggle>
			<Toggle variant="outline" defaultPressed>
				<BellIcon /> Watching
			</Toggle>
			<Toggle variant="outline" size="sm">
				Small
			</Toggle>
			<Toggle variant="outline" size="lg">
				Large
			</Toggle>
		</div>
	);
}
