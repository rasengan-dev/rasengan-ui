import { ArrowUpRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Badge>Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="destructive">Failed</Badge>
			<Badge variant="outline">
				<span className="size-1.5 rounded-pill bg-primary" aria-hidden />
				Live
			</Badge>
			<Badge variant="secondary" render={<a href="#changelog" />}>
				v2.0 <ArrowUpRightIcon />
			</Badge>
		</div>
	);
}
