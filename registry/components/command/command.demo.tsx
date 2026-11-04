import { CalendarIcon, CreditCardIcon, PaletteIcon, SettingsIcon, SmileIcon, UserIcon } from "lucide-react";

import {
	Command,
	CommandCollection,
	CommandEmpty,
	CommandGroup,
	CommandGroupLabel,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@/components/ui/command";

const groups = [
	{
		value: "Suggestions",
		items: [
			{ label: "Calendar", icon: CalendarIcon },
			{ label: "Search emoji", icon: SmileIcon },
			{ label: "Switch village", icon: PaletteIcon },
		],
	},
	{
		value: "Settings",
		items: [
			{ label: "Profile", icon: UserIcon, shortcut: "Ctrl P" },
			{ label: "Billing", icon: CreditCardIcon, shortcut: "Ctrl B" },
			{ label: "Settings", icon: SettingsIcon, shortcut: "Ctrl S" },
		],
	},
];

export default function CommandDemo() {
	return (
		<Command items={groups} className="max-w-md border-village shadow-md">
			<CommandInput placeholder="Type a command or search…" aria-label="Search commands" />
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandList>
				{(group: (typeof groups)[number]) => (
					<CommandGroup key={group.value} items={group.items}>
						<CommandGroupLabel>{group.value}</CommandGroupLabel>
						<CommandCollection>
							{(item: (typeof groups)[number]["items"][number]) => (
								<CommandItem key={item.label} value={item}>
									<item.icon aria-hidden="true" />
									{item.label}
									{"shortcut" in item && <CommandShortcut>{item.shortcut}</CommandShortcut>}
								</CommandItem>
							)}
						</CommandCollection>
					</CommandGroup>
				)}
			</CommandList>
		</Command>
	);
}
