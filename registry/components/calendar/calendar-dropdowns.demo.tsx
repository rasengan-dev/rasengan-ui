import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDropdownsDemo() {
	const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 12));
	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			captionLayout="dropdown"
			showWeekNumber
			defaultMonth={new Date(2026, 5)}
			startMonth={new Date(1950, 0)}
			endMonth={new Date(2030, 11)}
			className="rounded-xl border-village bg-card shadow-sm"
		/>
	);
}
