import { Typewriter } from "@/components/ui/typewriter";

export default function TypewriterDemo() {
	return (
		<p className="max-w-md text-center font-display text-2xl font-semibold tracking-display">
			<Typewriter text="Hello. I write your landing page, then I ship it." />
		</p>
	);
}
