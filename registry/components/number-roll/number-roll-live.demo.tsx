import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NumberRoll } from "@/components/ui/number-roll";

export default function NumberRollLiveDemo() {
	const [seats, setSeats] = useState(3);
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex items-center gap-3">
				<Button variant="outline" size="icon" aria-label="Remove a seat" disabled={seats <= 1} onClick={() => setSeats((n) => n - 1)}>
					<MinusIcon />
				</Button>
				<p className="min-w-40 text-center text-sm text-muted-foreground">
					<span className="block font-display text-3xl font-semibold tracking-display text-foreground">
						<NumberRoll value={seats * 12} format={{ style: "currency", currency: "EUR" }} locale="fr-FR" live="polite" />
					</span>
					per month, <NumberRoll value={seats} /> seats
				</p>
				<Button variant="outline" size="icon" aria-label="Add a seat" onClick={() => setSeats((n) => n + 1)}>
					<PlusIcon />
				</Button>
			</div>
		</div>
	);
}
