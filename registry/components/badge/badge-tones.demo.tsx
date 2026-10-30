import { Badge } from "@/components/ui/badge";

const tones = { neutral: "Neutral", primary: "Primary", success: "Success", warning: "Warning", info: "Info", destructive: "Destructive" } as const;
const variants = ["default", "soft", "outline"] as const;

export default function BadgeTonesDemo() {
	return (
		<div className="grid gap-3">
			{variants.map((variant) => (
				<div key={variant} className="flex flex-wrap items-center gap-2">
					{(Object.keys(tones) as (keyof typeof tones)[]).map((tone) => (
						<Badge key={tone} variant={variant} tone={tone}>
							{tones[tone]}
						</Badge>
					))}
				</div>
			))}
		</div>
	);
}
