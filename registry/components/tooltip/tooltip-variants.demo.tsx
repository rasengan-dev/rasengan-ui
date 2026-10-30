import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipVariantsDemo() {
	return (
		<TooltipProvider>
			<div className="flex flex-wrap items-center gap-3">
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" />}>Default</TooltipTrigger>
					<TooltipContent>In the village's ink</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" />}>Outline</TooltipTrigger>
					<TooltipContent variant="outline">On a popover surface</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
}
