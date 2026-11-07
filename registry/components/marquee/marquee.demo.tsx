import { Marquee } from "@/components/ui/marquee";

const companies = ["Lumen", "Northwind", "Acme", "Globex", "Initech", "Umbrella", "Hooli", "Stark"];

export default function MarqueeDemo() {
	return (
		<Marquee label="Companies building with Rasengan UI" className="w-full max-w-2xl">
			{companies.map((name) => (
				<span key={name} className="font-display text-2xl font-semibold tracking-display text-muted-foreground">
					{name}
				</span>
			))}
		</Marquee>
	);
}
