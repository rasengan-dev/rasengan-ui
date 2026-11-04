import { ArrowUpIcon, PaperclipIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";

export default function InputGroupTextareaDemo() {
	return (
		<InputGroup className="max-w-md">
			<InputGroupTextarea placeholder="Ask, search or make anything…" aria-label="Prompt" />
			<InputGroupAddon align="block-end">
				<InputGroupButton size="icon-xs" variant="outline" aria-label="Attach a file">
					<PaperclipIcon />
				</InputGroupButton>
				<InputGroupText className="ms-auto">52% used</InputGroupText>
				<InputGroupButton size="icon-xs" variant="default" aria-label="Send">
					<ArrowUpIcon />
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
