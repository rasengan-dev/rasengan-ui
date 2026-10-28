import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
	return (
		<div className="grid w-full max-w-md gap-3">
			<Textarea placeholder="Tell the team what changed…" aria-label="Message" />
			<Textarea defaultValue="The new village is ready for review." aria-label="Release note" disabled />
		</div>
	);
}
