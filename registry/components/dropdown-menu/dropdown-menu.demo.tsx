import * as React from "react";
import { BellIcon, ChevronDownIcon, CopyIcon, LogOutIcon, MailIcon, MessageSquareIcon, SettingsIcon, Trash2Icon, UserIcon, UserPlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownMenuDemo() {
	const [statusBar, setStatusBar] = React.useState(true);
	const [panel, setPanel] = React.useState("bottom");
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				naruto <ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60">
				<DropdownMenuGroup>
					<DropdownMenuLabel>My account</DropdownMenuLabel>
					<DropdownMenuItem>
						<UserIcon /> Profile <DropdownMenuShortcut>Shift Ctrl P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SettingsIcon /> Settings <DropdownMenuShortcut>Ctrl ,</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<BellIcon /> Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={statusBar} onCheckedChange={setStatusBar}>
					Show status bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuGroup>
					<DropdownMenuLabel inset>Panel position</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={panel} onValueChange={setPanel}>
						<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<UserPlusIcon /> Invite users
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>
							<MailIcon /> Email
						</DropdownMenuItem>
						<DropdownMenuItem>
							<MessageSquareIcon /> Message
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuItem disabled>
					<CopyIcon /> Duplicate team
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOutIcon /> Log out
				</DropdownMenuItem>
				<DropdownMenuItem variant="destructive">
					<Trash2Icon /> Delete account
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
