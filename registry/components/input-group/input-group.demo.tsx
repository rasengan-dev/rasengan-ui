import { CheckIcon, CopyIcon, InfoIcon, SearchIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

export default function InputGroupDemo() {
	return (
		<div className="grid w-full max-w-sm gap-4">
			<InputGroup>
				<InputGroupInput placeholder="Search…" aria-label="Search" />
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<Kbd size="sm">Ctrl K</Kbd>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="my-app" aria-label="Subdomain" />
				<InputGroupAddon>
					<InputGroupText>https://</InputGroupText>
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<InputGroupText>.rasengan.dev</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput defaultValue="npx rasengan-ui add input-group" readOnly aria-label="Install command" className="font-mono" />
				<InputGroupAddon align="inline-end">
					<InputGroupButton size="icon-xs" aria-label="Copy">
						<CopyIcon />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="Username" aria-label="Username" defaultValue="hinata" />
				<InputGroupAddon align="inline-end">
					<CheckIcon className="text-success-text" aria-label="Available" />
					<InfoIcon aria-hidden />
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
