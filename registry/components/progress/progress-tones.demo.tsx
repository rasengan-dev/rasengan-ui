import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";

const tones = { neutral: "Neutral", primary: "Primary", success: "Success", warning: "Warning", info: "Info", destructive: "Destructive" } as const;

export default function ProgressTonesDemo() {
	return (
		<div className="grid w-full max-w-2xl gap-x-10 gap-y-5 sm:grid-cols-2">
			{(Object.keys(tones) as (keyof typeof tones)[]).map((tone, index) => (
				<Progress key={tone} tone={tone} value={35 + index * 10}>
					<ProgressLabel>{tones[tone]}</ProgressLabel>
					<ProgressValue />
				</Progress>
			))}
		</div>
	);
}
