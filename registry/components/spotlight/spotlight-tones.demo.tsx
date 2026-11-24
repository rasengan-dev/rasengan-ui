import { Spotlight } from "@/components/ui/spotlight";

const tones = ["primary", "success", "info", "neutral"] as const;

/** Any surface, not only a Card: here plain tiles, in four tones and the small and large sizes. */
export default function SpotlightTonesDemo() {
	return (
		<div className="grid w-full max-w-2xl grid-cols-2 gap-3">
			{tones.map((tone, i) => (
				<Spotlight key={tone} tone={tone} size={i % 2 ? "lg" : "sm"}>
					<div className="flex h-28 items-end rounded-lg border-village bg-muted p-4 text-sm font-medium text-foreground">
						<span className="capitalize">{tone}</span>
						<span className="ms-auto text-muted-foreground">{i % 2 ? "lg" : "sm"}</span>
					</div>
				</Spotlight>
			))}
		</div>
	);
}
