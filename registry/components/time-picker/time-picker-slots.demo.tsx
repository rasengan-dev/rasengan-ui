import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { timeSlots } from "@/components/ui/time-picker";

const slots = timeSlots({ min: "09:00", max: "17:00", interval: 45, locale: "en-US" });
const taken = new Set(["10:30", "13:30", "15:45"]);

export default function TimePickerSlotsDemo() {
	const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 12));
	const [time, setTime] = useState("11:15");
	const day = date ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "Pick a day";
	return (
		<div className="flex flex-col overflow-hidden rounded-xl border-village bg-card shadow-sm sm:flex-row">
			<Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 5)} disabled={{ dayOfWeek: [0, 6] }} />
			<div className="flex flex-col gap-2 border-t-(length:--border-width) p-3 sm:w-40 sm:border-t-0 sm:border-s-(length:--border-width)">
				<p className="px-1 text-sm font-medium" id="slots-day">
					{day}
				</p>
				<div role="group" aria-labelledby="slots-day" className="grid max-h-72 grid-cols-3 gap-1.5 overflow-y-auto p-0.5 sm:grid-cols-1">
					{slots.map((slot) => (
						<Button
							key={slot.value}
							size="sm"
							variant={time === slot.value ? "default" : "outline"}
							aria-pressed={time === slot.value}
							disabled={!date || taken.has(slot.value)}
							onClick={() => setTime(slot.value)}
						>
							{slot.label}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
