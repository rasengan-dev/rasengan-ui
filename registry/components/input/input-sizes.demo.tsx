import { Input } from "@/components/ui/input";

export default function InputSizesDemo() {
	return (
		<div className="grid w-full max-w-sm gap-3">
			<Input size="sm" placeholder="Small" aria-label="Small" />
			<Input placeholder="Default" aria-label="Default" />
			<Input size="lg" placeholder="Large" aria-label="Large" />
		</div>
	);
}
