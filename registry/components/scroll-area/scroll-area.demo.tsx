import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = ["v2.0.0", "v2.0.0-beta.9", "v2.0.0-beta.8", "v2.0.0-beta.7", "v2.0.0-beta.6", "v2.0.0-beta.5", "v2.0.0-beta.4", "v1.2.0", "v1.1.3", "v1.1.2", "v1.1.1", "v1.1.0"];

export default function ScrollAreaDemo() {
	return (
		<ScrollArea className="h-56 w-56 rounded-lg border-village bg-card" aria-label="Tags">
			<div className="p-4">
				<p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">Tags</p>
				{tags.map((tag, index) => (
					<div key={tag}>
						{index > 0 && <Separator className="my-2" />}
						<p className="text-sm">{tag}</p>
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
