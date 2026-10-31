import { Spinner } from "@/components/ui/spinner";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;

export default function SpinnerSizesDemo() {
	return (
		<div className="grid gap-6">
			<div className="flex items-center gap-4">
				<Spinner size="sm" />
				<Spinner />
				<Spinner size="lg" />
			</div>
			<div className="flex items-center gap-4">
				{tones.map((tone) => (
					<Spinner key={tone} tone={tone} size="lg" aria-label={`Loading (${tone})`} />
				))}
			</div>
		</div>
	);
}
