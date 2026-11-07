import { CursorArea } from "@/components/ui/cursor";

const projects = ["Lumen", "Northwind", "Globex"];

export default function CursorVariantsDemo() {
	return (
		<div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
			<CursorArea variant="ring" className="flex flex-col gap-2 rounded-lg border-village border-dashed p-6">
				<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Ring</span>
				{projects.map((name) => (
					<a key={name} href="#cursor" className="rounded-control px-2 py-1 font-medium">
						{name}
					</a>
				))}
			</CursorArea>
			<CursorArea variant="dot" tone="neutral" hideNative className="flex flex-col gap-2 rounded-lg border-village border-dashed p-6">
				<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Dot, labels, no system cursor</span>
				{projects.map((name) => (
					<a key={name} href="#cursor" data-cursor-label="Open" className="rounded-control px-2 py-1 font-medium">
						{name}
					</a>
				))}
			</CursorArea>
		</div>
	);
}
