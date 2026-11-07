import { TextReveal } from "@/components/ui/text-reveal";

export default function TextRevealDemo() {
	return (
		<div className="flex max-w-xl flex-col gap-3 text-center">
			<TextReveal as="h2" className="font-display text-4xl font-semibold tracking-display case-heading text-balance">
				Ship the landing page before lunch
			</TextReveal>
			<TextReveal as="p" by="lines" effect="fade" delay={0.3} className="text-muted-foreground">
				Every section moves the way your village does: quick and exact, soft and floaty, or bouncy.
			</TextReveal>
		</div>
	);
}
