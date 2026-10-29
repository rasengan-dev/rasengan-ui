import { ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const repositories = ["rasengan-dev/rasengan", "rasengan-dev/rasengan-ui", "rasengan-dev/sharingan"];

const row = "rounded-control border-village px-3 py-2 font-mono text-sm";

export default function CollapsibleDemo() {
	return (
		<Collapsible defaultOpen className="grid w-full max-w-sm gap-2">
			<div className="flex items-center justify-between gap-4">
				<span className="text-sm font-semibold">@naruto starred 3 repositories</span>
				<CollapsibleTrigger render={<Button variant="ghost" size="icon" aria-label="Toggle repositories" />}>
					<ChevronsUpDownIcon />
				</CollapsibleTrigger>
			</div>
			<div className={row}>{repositories[0]}</div>
			<CollapsibleContent className="grid gap-2">
				{repositories.slice(1).map((repository) => (
					<div key={repository} className={row}>
						{repository}
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}
