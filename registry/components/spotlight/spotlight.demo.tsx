import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const features = [
	{ title: "Online tonight", description: "Pick a few sections, write your content, and the site is live before dinner." },
	{ title: "Yours to edit", description: "Every file is copied into your project. Change anything, updates keep your edits." },
	{ title: "Any village", description: "Switch the whole look with one attribute: shape, type, depth and motion." },
];

/** A glow follows the mouse over each card, and lights its border near the mouse. */
export default function SpotlightDemo() {
	return (
		<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
			{features.map((feature) => (
				<Spotlight key={feature.title}>
					<Card>
						<CardHeader>
							<CardTitle>{feature.title}</CardTitle>
							<CardDescription>{feature.description}</CardDescription>
						</CardHeader>
					</Card>
				</Spotlight>
			))}
		</div>
	);
}
