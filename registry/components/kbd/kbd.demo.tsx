import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdDemo() {
	return (
		<div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
			<p>
				Press{" "}
				<KbdGroup>
					<Kbd>Ctrl</Kbd>
					<Kbd>K</Kbd>
				</KbdGroup>{" "}
				to search the docs.
			</p>
			<div className="flex items-center gap-2">
				<Kbd>⌘</Kbd>
				<Kbd>⇧</Kbd>
				<Kbd>⌥</Kbd>
				<Kbd>Enter</Kbd>
				<Kbd>Esc</Kbd>
			</div>
		</div>
	);
}
