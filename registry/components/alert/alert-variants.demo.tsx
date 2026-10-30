import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertVariantsDemo() {
	return (
		<div className="grid w-full max-w-xl gap-4">
			<Alert role="status" tone="info">
				<InfoIcon />
				<AlertTitle>Default, info</AlertTitle>
				<AlertDescription>A card; the tone colours the icon and the title.</AlertDescription>
			</Alert>
			<Alert role="status" variant="soft" tone="success">
				<CircleCheckIcon />
				<AlertTitle>Soft, success</AlertTitle>
				<AlertDescription>Your village is live on rasengan.dev.</AlertDescription>
			</Alert>
			<Alert variant="outline" tone="warning">
				<TriangleAlertIcon />
				<AlertTitle>Outline, warning</AlertTitle>
				<AlertDescription>You have used 82% of this month's builds.</AlertDescription>
			</Alert>
		</div>
	);
}
