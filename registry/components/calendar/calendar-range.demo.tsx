import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarRangeDemo() {
	const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 5, 9), to: new Date(2026, 5, 20) });
	return (
		<Calendar
			mode="range"
			selected={range}
			onSelect={setRange}
			numberOfMonths={2}
			defaultMonth={new Date(2026, 5)}
			className="rounded-xl border-village bg-card shadow-sm"
		/>
	);
}
