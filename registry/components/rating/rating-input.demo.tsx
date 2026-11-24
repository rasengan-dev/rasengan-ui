"use client";

import * as React from "react";

import { RatingGroup } from "@/components/ui/rating";

/** Stars as an input: arrow keys move and pick, hovering previews the score, the form gets a whole number. */
export default function RatingInputDemo() {
	const [score, setScore] = React.useState<number | null>(4);
	return (
		<div className="flex flex-col items-start gap-2">
			<span id="rating-input-label" className="text-sm font-medium">
				Your rating
			</span>
			<RatingGroup name="score" aria-labelledby="rating-input-label" value={score} onValueChange={setScore} size="lg" />
			<p className="m-0 text-sm text-muted-foreground">{score ? `${score} out of 5` : "Not rated yet"}</p>
		</div>
	);
}
