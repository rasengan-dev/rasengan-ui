import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

const variants = { default: "Default", outline: "Outline", soft: "Soft" } as const;

export default function ToggleVariantsDemo() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			{(Object.keys(variants) as (keyof typeof variants)[]).map((variant) => (
				<Toggle key={variant} variant={variant} defaultPressed>
					<BookmarkIcon />
					{variants[variant]}
				</Toggle>
			))}
		</div>
	);
}
