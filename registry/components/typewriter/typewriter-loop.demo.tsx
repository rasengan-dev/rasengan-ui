import { Typewriter } from "@/components/ui/typewriter";

export default function TypewriterLoopDemo() {
	return (
		<h3 className="text-center font-display text-3xl font-semibold tracking-display case-heading">
			Build for{" "}
			<Typewriter className="text-tone-text tone-primary" text={["founders", "designers", "agents", "everyone"]} loop />
		</h3>
	);
}
