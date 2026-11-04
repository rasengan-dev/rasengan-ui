import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

const booked = [new Date(2026, 5, 4), new Date(2026, 5, 5), new Date(2026, 5, 17), new Date(2026, 5, 18), new Date(2026, 5, 19)];

export default function CalendarBookedDemo() {
	const [date, setDate] = useState<Date | undefined>();
	return (
		<div className="flex flex-col items-center gap-3">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				defaultMonth={new Date(2026, 5)}
				disabled={[...booked, { dayOfWeek: [0, 6] }, { before: new Date(2026, 5, 2) }]}
				modifiers={{ booked }}
				modifiersClassNames={{ booked: "[&>button]:line-through" }}
				className="rounded-xl border-village bg-card shadow-sm"
			/>
			<p className="text-sm text-muted-foreground" aria-live="polite">
				{date ? `Booking ${date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}.` : "Weekends and booked days can't be picked."}
			</p>
		</div>
	);
}
