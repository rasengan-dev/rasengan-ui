import { CopyIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipDemo() {
	return (
		<TooltipProvider>
			<div className="flex items-center gap-3">
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Copy" />}>
						<CopyIcon />
					</TooltipTrigger>
					<TooltipContent>Copy to clipboard</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger render={<Button size="icon" aria-label="New project" />}>
						<PlusIcon />
					</TooltipTrigger>
					<TooltipContent side="bottom">New project · Ctrl N</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
}
