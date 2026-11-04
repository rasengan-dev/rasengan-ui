import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function KbdSizesDemo() {
	return (
		<div className="flex flex-wrap items-center gap-6">
			<KbdGroup>
				<Kbd size="sm">Ctrl</Kbd>
				<Kbd size="sm">S</Kbd>
			</KbdGroup>
			<KbdGroup>
				<Kbd>Ctrl</Kbd>
				<Kbd>S</Kbd>
			</KbdGroup>
			<Tooltip>
				<TooltipTrigger render={<Button variant="outline" />}>Save</TooltipTrigger>
				<TooltipContent>
					Save the draft{" "}
					<KbdGroup>
						<Kbd size="sm">Ctrl</Kbd>
						<Kbd size="sm">S</Kbd>
					</KbdGroup>
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
