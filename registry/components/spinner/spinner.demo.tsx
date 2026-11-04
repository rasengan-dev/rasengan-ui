import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerDemo() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<Spinner />
			<Button disabled>
				<Spinner /> Saving
			</Button>
			<Button variant="outline" disabled>
				<Spinner /> Loading
			</Button>
			<Badge variant="soft">
				<Spinner size="sm" /> Syncing
			</Badge>
		</div>
	);
}
