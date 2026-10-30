import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonSizesDemo() {
	return (
		<div className="grid gap-4">
			<div className="flex flex-wrap items-center gap-3">
				<Button size="sm">Small</Button>
				<Button>Default</Button>
				<Button size="lg">Large</Button>
			</div>
			<div className="flex flex-wrap items-center gap-3">
				<Button size="icon-sm" variant="outline" aria-label="Add (small)">
					<PlusIcon />
				</Button>
				<Button size="icon" variant="outline" aria-label="Add">
					<PlusIcon />
				</Button>
				<Button size="icon-lg" variant="outline" aria-label="Add (large)">
					<PlusIcon />
				</Button>
			</div>
		</div>
	);
}
