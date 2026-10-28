import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button>
				Get started <ArrowRight />
			</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Delete</Button>
			<Button variant="link">Link</Button>
			<Button size="icon" variant="outline" aria-label="Add">
				<Plus />
			</Button>
			<Button disabled>Disabled</Button>
		</div>
	);
}
