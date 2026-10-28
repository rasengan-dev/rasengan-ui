import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";

export default function PopoverDemo() {
	return (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Dimensions <ChevronDownIcon />
			</PopoverTrigger>
			<PopoverContent>
				<div className="grid gap-1">
					<PopoverTitle>Dimensions</PopoverTitle>
					<PopoverDescription>Set the size of the layer.</PopoverDescription>
				</div>
				<div className="grid grid-cols-[4.5rem_1fr] items-center gap-x-3 gap-y-2.5">
					<Label htmlFor="popover-width">Width</Label>
					<Input id="popover-width" defaultValue="100%" className="h-control-sm" />
					<Label htmlFor="popover-height">Height</Label>
					<Input id="popover-height" defaultValue="25px" className="h-control-sm" />
				</div>
			</PopoverContent>
		</Popover>
	);
}
