import { Button } from "@/components/ui/button";
import { ShinyText } from "@/components/ui/shiny-text";

/** On a button's label: the sheen crosses when the pointer or keyboard focus reaches the button. */
export default function ShinyTextHoverDemo() {
	return (
		<Button variant="outline" size="lg">
			<ShinyText on="hover" tone="primary">
				Start for free
			</ShinyText>
		</Button>
	);
}
