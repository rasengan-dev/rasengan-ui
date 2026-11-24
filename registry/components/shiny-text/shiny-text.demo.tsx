import { ShinyText } from "@/components/ui/shiny-text";

export default function ShinyTextDemo() {
	return (
		<h2 className="text-center font-display text-4xl font-semibold tracking-display case-heading">
			Your site, <ShinyText tone="primary">online tonight</ShinyText>
		</h2>
	);
}
