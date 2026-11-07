import { ScrambleText } from "@/components/ui/scramble-text";

export default function ScrambleTextDemo() {
	return (
		<div className="flex flex-col items-center gap-2 text-center">
			<ScrambleText as="h3" text="Access granted" className="font-mono text-3xl font-semibold tracking-wide uppercase" />
			<ScrambleText as="p" text="Decrypting your village tokens" className="text-sm text-muted-foreground" />
		</div>
	);
}
