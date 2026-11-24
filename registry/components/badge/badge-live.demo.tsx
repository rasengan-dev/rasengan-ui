import { Badge } from "@/components/ui/badge";

/** A dot that pulses before the label: still with reduced motion. */
export default function BadgeLiveDemo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Badge indicator="live" variant="soft" tone="success">
				Available for work
			</Badge>
			<Badge indicator="live" tone="destructive">
				Live
			</Badge>
			<Badge indicator="live" variant="outline" tone="primary">
				Open now
			</Badge>
		</div>
	);
}
