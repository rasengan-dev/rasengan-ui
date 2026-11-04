import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";

export default function ProgressDemo() {
	return (
		<div className="grid w-full max-w-sm gap-6">
			<Progress value={64}>
				<ProgressLabel>Uploading assets</ProgressLabel>
				<ProgressValue />
			</Progress>
			<Progress value={30} aria-label="Chakra" />
		</div>
	);
}
