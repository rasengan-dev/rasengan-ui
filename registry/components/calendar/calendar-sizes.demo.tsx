import { Calendar } from "@/components/ui/calendar";

const sizes = ["sm", "default", "lg"] as const;

export default function CalendarSizesDemo() {
	return (
		<div className="flex flex-wrap items-start justify-center gap-4">
			{sizes.map((size) => (
				<Calendar key={size} size={size} mode="single" defaultMonth={new Date(2026, 5)} selected={new Date(2026, 5, 12)} className="rounded-xl border-village bg-card shadow-sm" />
			))}
		</div>
	);
}
