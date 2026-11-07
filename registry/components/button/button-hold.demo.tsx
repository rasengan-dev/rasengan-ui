import { useState } from "react";
import { Trash2Icon } from "lucide-react";

import { HoldButton } from "@/components/ui/button";

export default function ButtonHoldDemo() {
	const [deleted, setDeleted] = useState(0);
	return (
		<div className="flex flex-col items-center gap-3">
			<HoldButton variant="destructive" onConfirm={() => setDeleted((n) => n + 1)}>
				<Trash2Icon />
				Hold to delete
			</HoldButton>
			<p className="text-sm text-muted-foreground" aria-live="polite">
				{deleted === 0 ? "Nothing deleted yet." : `Deleted ${deleted} time${deleted === 1 ? "" : "s"}.`}
			</p>
		</div>
	);
}
