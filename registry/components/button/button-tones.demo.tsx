import { Button } from "@/components/ui/button";

const tones = { neutral: "Neutral", primary: "Primary", success: "Success", warning: "Warning", info: "Info", destructive: "Destructive" } as const;
const variants = ["default", "soft", "outline", "ghost"] as const;

export default function ButtonTonesDemo() {
	return (
		<div className="grid gap-3 overflow-x-auto">
			{variants.map((variant) => (
				<div key={variant} className="flex flex-wrap items-center gap-2">
					{(Object.keys(tones) as (keyof typeof tones)[]).map((tone) => (
						<Button key={tone} variant={variant} tone={tone} size="sm">
							{tones[tone]}
						</Button>
					))}
				</div>
			))}
		</div>
	);
}
