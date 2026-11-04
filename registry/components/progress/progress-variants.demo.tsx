import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";

export default function ProgressVariantsDemo() {
	return (
		<div className="grid w-full max-w-sm gap-6">
			<Progress value={64}>
				<ProgressLabel>Default</ProgressLabel>
				<ProgressValue />
			</Progress>
			<Progress variant="soft" value={64}>
				<ProgressLabel>Soft</ProgressLabel>
				<ProgressValue />
			</Progress>
			<Progress variant="soft" tone="success" size="sm" value={100} aria-label="Deployed" />
			<Progress tone="warning" size="lg" value={82} aria-label="Storage" />
		</div>
	);
}
