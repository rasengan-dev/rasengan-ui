import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const variants = {
	default: ["Default", "A raised surface."],
	outline: ["Outline", "The border, no shadow."],
	ghost: ["Ghost", "The layout alone."],
	elevated: ["Elevated", "A deeper shadow."],
} as const;

export default function CardVariantsDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
			{(Object.keys(variants) as (keyof typeof variants)[]).map((variant) => (
				<Card key={variant} variant={variant} size="sm">
					<CardHeader>
						<CardTitle>{variants[variant][0]}</CardTitle>
						<CardDescription>{variants[variant][1]}</CardDescription>
					</CardHeader>
					<CardContent className="text-sm">Small size: tighter padding and gaps.</CardContent>
				</Card>
			))}
		</div>
	);
}
