import { useState } from "react";
import { SendIcon, Trash2Icon } from "lucide-react";

import { HoldButton } from "@/components/ui/button";

export default function ButtonHoldDemo() {
	const [deleted, setDeleted] = useState(0);
	const [sent, setSent] = useState(false);
	const [progress, setProgress] = useState(0);
	return (
		<div className="flex flex-col items-center gap-6">
			<div className="flex flex-col items-center gap-3">
				<HoldButton variant="destructive" onConfirm={() => setDeleted((n) => n + 1)}>
					<Trash2Icon />
					Hold to delete
				</HoldButton>
				<p className="text-sm text-muted-foreground" aria-live="polite">
					{deleted === 0 ? "Nothing deleted yet." : `Deleted ${deleted} time${deleted === 1 ? "" : "s"}.`}
				</p>
			</div>
			<div className="flex flex-col items-center gap-3">
				<HoldButton
					variant="outline"
					fill="center"
					duration={1.6}
					drainDuration={0.6}
					confirmEffect="flash"
					onHoldProgress={setProgress}
					onConfirm={() => setSent(true)}
				>
					<SendIcon />
					Hold to send
				</HoldButton>
				<p className="text-sm text-muted-foreground tabular-nums">
					{sent ? "Sent." : `${Math.round(progress * 100)}% held`}
				</p>
			</div>
		</div>
	);
}
