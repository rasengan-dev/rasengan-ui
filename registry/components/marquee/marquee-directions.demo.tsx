import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";

const tags = ["Base UI", "Tailwind v4", "Villages", "Natures", "MCP", "CLI", "Motion", "Accessible"];
const quotes = ["Shipped in an afternoon.", "The villages sold it.", "Our agent installs it right.", "Iwa is gorgeous."];

export default function MarqueeDirectionsDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-6 sm:grid-cols-[1fr_auto]">
			<div className="flex min-w-0 flex-col gap-3">
				<Marquee label="What it is built on" gap="0.75rem" speed={36}>
					{tags.map((tag) => (
						<Badge key={tag} variant="outline">
							{tag}
						</Badge>
					))}
				</Marquee>
				<Marquee label="More of what it is built on" direction="right" gap="0.75rem" speed={28}>
					{tags.map((tag) => (
						<Badge key={tag} variant="soft">
							{tag}
						</Badge>
					))}
				</Marquee>
			</div>
			<Marquee label="What people say" direction="up" gap="0.75rem" speed={24} className="h-56">
				{quotes.map((quote) => (
					<Card key={quote} size="sm" className="w-56">
						<CardContent className="text-sm">{quote}</CardContent>
					</Card>
				))}
			</Marquee>
		</div>
	);
}
