import { Textarea } from "@/components/ui/textarea";

export default function TextareaSizesDemo() {
	return (
		<div className="grid w-full max-w-md gap-3">
			<Textarea size="sm" placeholder="Small" aria-label="Small" />
			<Textarea placeholder="Default" aria-label="Default" />
			<Textarea size="lg" placeholder="Large" aria-label="Large" />
		</div>
	);
}
