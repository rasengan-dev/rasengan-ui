"use client";

import * as React from "react";

import { Chip, ChipRemove } from "@/components/ui/chip";

const all = ["Douala", "Two bedrooms", "Under 300 000 XAF", "Furnished"];

/** Active filters: each chip has a remove button that says what it removes. */
export default function ChipFiltersDemo() {
	const [filters, setFilters] = React.useState(all);
	return (
		<div className="flex max-w-md flex-wrap items-center gap-2">
			{filters.map((filter) => (
				<Chip key={filter} variant="soft">
					{filter}
					<ChipRemove aria-label={`Remove ${filter}`} onClick={() => setFilters((list) => list.filter((item) => item !== filter))} />
				</Chip>
			))}
			{filters.length < all.length && (
				<button type="button" className="text-sm text-muted-foreground underline underline-offset-4" onClick={() => setFilters(all)}>
					Reset
				</button>
			)}
		</div>
	);
}
