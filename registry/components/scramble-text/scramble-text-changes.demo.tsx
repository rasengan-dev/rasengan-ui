import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrambleText } from "@/components/ui/scramble-text";

const statuses = ["Queued", "Building", "Deploying", "Live"];

export default function ScrambleTextChangesDemo() {
	const [step, setStep] = useState(0);
	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-sm text-muted-foreground">
				Status: <ScrambleText text={statuses[step]} trigger="mount" className="font-mono font-semibold text-foreground" />
			</p>
			<div className="flex gap-2">
				<Button variant="outline" size="sm" onClick={() => setStep((s) => (s + 1) % statuses.length)}>
					Next status
				</Button>
				<Button variant="ghost" size="sm">
					<ScrambleText text="Hover me" trigger="hover" />
				</Button>
			</div>
		</div>
	);
}
