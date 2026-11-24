import { Chip, ChipGroup } from "@/components/ui/chip";

const sizes = ["S", "M", "L", "XL"];

/** Outline, soft and solid, several at once with `multiple`; and chips that are links. */
export default function ChipVariantsDemo() {
	return (
		<div className="flex flex-col gap-4">
			{(["outline", "soft", "solid"] as const).map((variant) => (
				<ChipGroup key={variant} multiple aria-label={`Sizes, ${variant}`} variant={variant} size="sm" defaultValue={["M", "L"]}>
					{sizes.map((size) => (
						<Chip key={size} value={size}>
							{size}
						</Chip>
					))}
				</ChipGroup>
			))}
			<nav aria-label="Popular searches" className="flex flex-wrap gap-2">
				{["Seafood", "Rooftop", "Open late"].map((search) => (
					<Chip key={search} variant="soft" tone="neutral" render={<a href={`#${search.toLowerCase().replace(/ /g, "-")}`} />}>
						{search}
					</Chip>
				))}
			</nav>
		</div>
	);
}
