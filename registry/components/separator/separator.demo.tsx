import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
	return (
		<div className="grid w-full max-w-sm gap-3">
			<div className="grid gap-1">
				<p className="font-display text-base font-semibold tracking-display">Rasengan UI</p>
				<p className="text-sm text-muted-foreground">Components themed by villages.</p>
			</div>
			<Separator />
			<div className="flex h-5 items-center gap-4 text-sm">
				<span>Docs</span>
				<Separator orientation="vertical" />
				<span>Blocks</span>
				<Separator orientation="vertical" />
				<span>Source</span>
			</div>
		</div>
	);
}
