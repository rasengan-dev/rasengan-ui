import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

/** The light held in one place, as the mouse would leave it near the top-left corner. */
export default function SpotlightStillDemo() {
	return (
		<Spotlight at={{ x: 0.25, y: 0.2 }} className="w-full max-w-xs">
			<Card>
				<CardHeader>
					<CardTitle>Online tonight</CardTitle>
					<CardDescription>Pick a few sections, write your content, and the site is live before dinner.</CardDescription>
				</CardHeader>
			</Card>
		</Spotlight>
	);
}
