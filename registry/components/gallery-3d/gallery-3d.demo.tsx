import { useState } from "react";

import { Gallery3D, type GalleryEntry, type GalleryLayout } from "@/components/ui/gallery-3d";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const colours = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"];
const names = ["Lumen", "Northwind", "Globex", "Initech", "Hooli", "Stark", "Umbrella", "Acme", "Wayne", "Tyrell", "Cyberdyne", "Soylent"];

const items: GalleryEntry[] = names.map((name, i) => ({
	id: name,
	label: `${name}, project ${i + 1}`,
	caption: name,
	description: `A landing page built with Rasengan UI for ${name}.`,
	content: (
		<span className={`flex size-full items-center justify-center ${colours[i % colours.length]}`}>
			<span className="flex size-20 items-center justify-center rounded-pill bg-background font-display text-4xl font-semibold tracking-display text-foreground">
				{i + 1}
			</span>
		</span>
	),
}));

const layouts: GalleryLayout[] = ["coverflow", "ring", "helix", "sphere", "stack", "grid"];

export default function Gallery3DDemo() {
	const [layout, setLayout] = useState<GalleryLayout>("coverflow");
	return (
		<div className="flex w-full flex-col items-center gap-4">
			<ToggleGroup
				aria-label="Layout"
				size="sm"
				variant="outline"
				value={[layout]}
				onValueChange={(value) => value[0] && setLayout(value[0] as GalleryLayout)}
			>
				{layouts.map((name) => (
					<ToggleGroupItem key={name} value={name} className="capitalize">
						{name}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<Gallery3D label="Projects" items={items} layout={layout} itemSize={180} height={380} />
		</div>
	);
}
