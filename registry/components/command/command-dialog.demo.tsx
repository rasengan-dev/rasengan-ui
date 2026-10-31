import { useEffect, useState } from "react";
import { FileTextIcon, MoonIcon, PaletteIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";

const actions = [
	{ label: "Open the docs", icon: FileTextIcon },
	{ label: "Switch village", icon: PaletteIcon },
	{ label: "Toggle dark mode", icon: MoonIcon, shortcut: "Ctrl D" },
];

export default function CommandDialogDemo() {
	const [open, setOpen] = useState(false);
	const [last, setLast] = useState<string>();

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === "j" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setOpen((was) => !was);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<div className="flex flex-col items-center gap-3">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open the palette <Kbd size="sm">Ctrl J</Kbd>
			</Button>
			<p className="text-sm text-muted-foreground" aria-live="polite">
				{last ? `Ran “${last}”.` : "Pick an action to run it."}
			</p>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command items={actions}>
					<CommandInput placeholder="Run an action…" aria-label="Search actions" />
					<CommandEmpty>No action found.</CommandEmpty>
					<CommandList>
						{(action: (typeof actions)[number]) => (
							<CommandItem
								key={action.label}
								value={action}
								onSelect={() => {
									setLast(action.label);
									setOpen(false);
								}}
							>
								<action.icon aria-hidden="true" />
								{action.label}
								{action.shortcut && <CommandShortcut>{action.shortcut}</CommandShortcut>}
							</CommandItem>
						)}
					</CommandList>
				</Command>
			</CommandDialog>
		</div>
	);
}
