import { SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CursorArea } from "@/components/ui/cursor";
import { Input } from "@/components/ui/input";

export default function CursorDemo() {
	return (
		<CursorArea className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg border-village border-dashed p-8">
			<p className="text-sm text-muted-foreground">Move the pointer here, over the buttons and the field.</p>
			<div className="flex flex-wrap justify-center gap-3">
				<Button>Get started</Button>
				<Button variant="outline">Read the docs</Button>
				<Button variant="ghost" size="icon" aria-label="Settings" data-cursor-label="Settings">
					<SettingsIcon />
				</Button>
			</div>
			<Input placeholder="Your email" aria-label="Your email" className="max-w-60" />
		</CursorArea>
	);
}
