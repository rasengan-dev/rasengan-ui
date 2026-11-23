import { ScrollProgress } from "@/components/ui/scroll-progress";

/** The three sizes and two variants, at a fixed progress. */
export default function ScrollProgressSizesDemo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-5">
			<ScrollProgress position="inline" size="sm" progress={0.3} />
			<ScrollProgress position="inline" progress={0.55} />
			<ScrollProgress position="inline" size="lg" progress={0.8} />
			<ScrollProgress position="inline" variant="track" tone="neutral" progress={0.45} />
		</div>
	);
}
