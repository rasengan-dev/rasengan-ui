import { useState } from "react";
import * as chrono from "chrono-node";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const longDate = (date: Date) => date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

export default function DatePickerNaturalLanguageDemo() {
	const [text, setText] = useState("June 12 2026 at 9am");
	const [date, setDate] = useState<Date | null>(chrono.parseDate("June 12 2026 at 9am"));
	const [open, setOpen] = useState(false);
	return (
		<Field className="w-full max-w-sm">
			<FieldLabel>Schedule the post</FieldLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<InputGroup>
					<InputGroupInput
						value={text}
						placeholder="Tomorrow at 9am, next friday…"
						onChange={(event) => {
							setText(event.target.value);
							setDate(chrono.parseDate(event.target.value));
						}}
						onKeyDown={(event) => {
							if (event.key === "ArrowDown") {
								event.preventDefault();
								setOpen(true);
							}
						}}
					/>
					<InputGroupAddon align="inline-end">
						<PopoverTrigger render={<InputGroupButton size="icon-xs" aria-label="Choose a date" />}>
							<CalendarIcon />
						</PopoverTrigger>
					</InputGroupAddon>
				</InputGroup>
				<PopoverContent align="end" className="w-auto p-0">
					<Calendar
						mode="single"
						selected={date ?? undefined}
						defaultMonth={date ?? undefined}
						autoFocus
						onSelect={(day) => {
							if (!day) return;
							const next = new Date(day);
							if (date) next.setHours(date.getHours(), date.getMinutes());
							setDate(next);
							setText(longDate(next));
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
			<FieldDescription aria-live="polite">{date ? `The post goes out on ${longDate(date)}.` : "Write a date in words: in 3 days, next monday at noon…"}</FieldDescription>
		</Field>
	);
}
