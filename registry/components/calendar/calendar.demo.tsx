import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDemo() {
	const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 12));
	return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 5)} className="rounded-xl border-village bg-card shadow-sm" />;
}
