import { NumberRoll } from "@/components/ui/number-roll";

const stats = [
	{ label: "Sites shipped", value: 12480 },
	{ label: "Uptime", value: 0.9997, format: { style: "percent", minimumFractionDigits: 2 } as const },
	{ label: "Raised", value: 4200000, format: { style: "currency", currency: "USD", notation: "compact" } as const },
];

export default function NumberRollDemo() {
	return (
		<dl className="grid gap-6 text-center sm:grid-cols-3">
			{stats.map(({ label, value, format }) => (
				<div key={label} className="flex flex-col gap-1">
					<dt className="text-sm text-muted-foreground">{label}</dt>
					<dd className="font-display text-4xl font-semibold tracking-display">
						<NumberRoll value={value} format={format} locale="en-US" />
					</dd>
				</div>
			))}
		</dl>
	);
}
