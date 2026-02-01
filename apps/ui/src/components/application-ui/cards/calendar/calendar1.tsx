import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Clock3, Timer, X } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const CalendarCard1 = () => {
	const [date, setDate] = useState<DateRange | undefined>();

	return (
		<article
			className={cn(
				"relative w-full max-w-[400px] md:max-w-[700px] rounded-2xl shadow-md bg-background dark:bg-input/40 border-[1px] border-border"
			)}
		>
			<div className='h-[60px] border-b border-border flex items-center justify-between p-3'>
				<div className='flex items-center gap-2'>
					<div className='size-10 rounded-full flex items-center justify-center border border-border'>
						<Clock3 className='text-muted-foreground' />
					</div>
					<div>
						<h2 className='text-foreground font-bold'>Event Calendar</h2>
						<p className='text-muted-foreground text-sm'>
							Manage your events and schedule
						</p>
					</div>
				</div>
				<Button variant={"outline"} size={"icon"} className='size-8'>
					<X size={14} className='text-foreground' />
				</Button>
			</div>

			<div className='w-full flex flex-col md:flex-row'>
				<div className='w-full md:w-1/2 min-h-[100px] border-b md:border-b-0 md:border-r border-border flex flex-col items-center'>
					<Calendar
						mode='range'
						defaultMonth={new Date()}
						numberOfMonths={1}
						selected={date}
						onSelect={setDate}
						className='w-full dark:bg-transparent'
					/>
				</div>

				<div className='w-full md:w-1/2 min-h-[100px]'>
					<div className='w-full p-4 border-b border-border'>
						<div className='text-foreground'>
							<label htmlFor='name' className='font-medium text-sm'>
								Start Date
							</label>
							<Input
								placeholder='Select start date'
								readOnly
								className='mt-2'
								value={date?.from?.toLocaleDateString()}
							/>
						</div>

						<div className='mt-4 text-foreground'>
							<label htmlFor='name' className='font-medium text-sm'>
								End Date
							</label>
							<Input
								placeholder='Select end date'
								readOnly
								className='mt-2'
								value={date?.to?.toLocaleDateString()}
							/>
						</div>
					</div>

					<div className='w-full p-4'>
						<div className='text-foreground'>
							<label htmlFor='name' className='font-medium text-sm'>
								Maximum Attendees
							</label>
							<Input placeholder='Enter maximum attendees' className='mt-2' />
						</div>

						<div className='flex items-center gap-2 mt-4'>
							<Checkbox />
							<label
								htmlFor='remember-me'
								className='text-sm font-medium text-foreground'
							>
								Open to all departments
							</label>
						</div>
					</div>
				</div>
			</div>

			<div className='h-[60px] border-t border-border flex items-center justify-end p-3 gap-2'>
				<Button variant='outline' className='dark:text-foreground'>
					Cancel
				</Button>
				<Button>Schedule Meeting</Button>
			</div>
		</article>
	);
};
