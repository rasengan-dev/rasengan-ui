import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const natures = { katon: "Katon", suiton: "Suiton", raiton: "Raiton" };
const sizes = ["sm", "default", "lg"] as const;

export default function SelectSizesDemo() {
	return (
		<div className="grid w-full max-w-xs gap-3">
			{sizes.map((size) => (
				<Select key={size} items={natures} defaultValue="katon">
					<SelectTrigger size={size} aria-label={`Nature (${size})`}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(natures).map(([value, label]) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			))}
		</div>
	);
}
