import { MinusIcon, PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

export default function ButtonGroupVariantsDemo() {
	return (
		<div className="flex flex-col items-start gap-6">
			<ButtonGroup className="w-full max-w-sm">
				<Input placeholder="Search…" aria-label="Search" />
				<Button variant="outline" size="icon" aria-label="Search">
					<SearchIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<ButtonGroupText render={<label htmlFor="site-url" />}>https://</ButtonGroupText>
				<Input id="site-url" placeholder="my-app.dev" className="w-48" />
			</ButtonGroup>
			<div className="flex items-start gap-6">
				<ButtonGroup>
					<Button variant="secondary">Copy</Button>
					<ButtonGroupSeparator />
					<Button variant="secondary">Paste</Button>
				</ButtonGroup>
				<ButtonGroup orientation="vertical" aria-label="Zoom">
					<Button variant="outline" size="icon" aria-label="Zoom in">
						<PlusIcon />
					</Button>
					<Button variant="outline" size="icon" aria-label="Zoom out">
						<MinusIcon />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
}
