import { Separator } from "@/components/ui/separator";

export default function SeparatorVariantsDemo() {
	return (
		<div className="grid w-full max-w-sm gap-6 text-sm">
			<div className="grid gap-3">
				<span className="text-muted-foreground">Default</span>
				<Separator />
			</div>
			<div className="grid gap-3">
				<span className="text-muted-foreground">Dashed</span>
				<Separator variant="dashed" />
			</div>
			<div className="flex h-5 items-center gap-4">
				<span>Docs</span>
				<Separator orientation="vertical" variant="dashed" />
				<span>Components</span>
				<Separator orientation="vertical" variant="dashed" />
				<span>CLI</span>
			</div>
		</div>
	);
}
