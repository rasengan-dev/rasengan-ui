import { Badge } from "@/components/ui/badge";

export default function BadgeSizesDemo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Badge size="sm" variant="soft">
				Small
			</Badge>
			<Badge variant="soft">Default</Badge>
			<Badge size="lg" variant="soft">
				Large
			</Badge>
		</div>
	);
}
