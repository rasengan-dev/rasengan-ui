import { ArchiveIcon, ArrowLeftIcon, ChevronDownIcon, ClockIcon, MailCheckIcon, TagIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ButtonGroupDemo() {
	return (
		<ButtonGroup aria-label="Message actions">
			<ButtonGroup>
				<Button variant="outline" size="icon" aria-label="Back">
					<ArrowLeftIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">
					<ArchiveIcon /> Archive
				</Button>
				<Button variant="outline">
					<ClockIcon /> Snooze
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">
					<MailCheckIcon /> Mark as read
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More actions" />}>
						<ChevronDownIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<TagIcon /> Add a label
						</DropdownMenuItem>
						<DropdownMenuItem variant="destructive">
							<Trash2Icon /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</ButtonGroup>
		</ButtonGroup>
	);
}
