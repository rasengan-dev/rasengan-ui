import { CircleAlertIcon, InfoIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
	return (
		<div className="grid w-full max-w-lg gap-4">
			<Alert role="status">
				<InfoIcon />
				<AlertTitle>Heads up</AlertTitle>
				<AlertDescription>You can switch village at any time from the settings. Nothing in your code changes.</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<CircleAlertIcon />
				<AlertTitle>Deployment failed</AlertTitle>
				<AlertDescription>The build for Hidden Leaf stopped at step 3. Check the logs and try again.</AlertDescription>
			</Alert>
		</div>
	);
}
