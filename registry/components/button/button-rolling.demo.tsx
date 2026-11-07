import { ArrowRightIcon } from "lucide-react";

import { Button, ButtonRollingText } from "@/components/ui/button";

export default function ButtonRollingDemo() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button>
				<ButtonRollingText>Get started</ButtonRollingText>
				<ArrowRightIcon />
			</Button>
			<Button variant="outline">
				<ButtonRollingText stagger>Book a demo</ButtonRollingText>
			</Button>
		</div>
	);
}
