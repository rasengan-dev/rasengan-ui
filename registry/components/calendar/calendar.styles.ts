import { cva, type VariantProps } from "class-variance-authority";

/*
 * DayPicker's parts, in the village's tokens. A cell is as tall as the village's small control (--control-sm), so Iwa's
 * grid is dense and Kiri's airy without a size prop; size scales it from there. Selected days take the primary, the
 * days between a range's ends the accent; today is set in bold on the muted fill.
 */
export const calendarVariants = cva("group/calendar w-fit p-3 [--cell-radius:calc(var(--control-radius)*0.75)]", {
	variants: {
		size: {
			sm: "[--cell-size:calc(var(--control-sm)*0.85)]",
			default: "[--cell-size:var(--control-sm)]",
			lg: "[--cell-size:var(--control)]",
		},
	},
	defaultVariants: { size: "default" },
});

export type CalendarVariantProps = VariantProps<typeof calendarVariants>;

export const calendarStyles = {
	months: "relative flex flex-col gap-4 sm:flex-row",
	month: "flex w-full flex-col gap-3",
	nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
	navButton: "size-(--cell-size) p-0 select-none aria-disabled:pointer-events-none aria-disabled:opacity-50",
	monthCaption: "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
	captionLabel: "font-display text-sm font-semibold tracking-display select-none",
	captionDropdownLabel:
		"flex h-(--cell-size) items-center gap-1 px-2 font-sans text-sm font-medium select-none [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
	dropdowns: "flex h-(--cell-size) w-full items-center justify-center gap-1.5",
	dropdownRoot:
		"relative rounded-(--cell-radius) border-village border-input bg-input-bg shadow-input transition-[border-color,outline-color] duration-fast has-focus-visible:border-primary has-focus-visible:focus-ring",
	dropdown: "absolute inset-0 cursor-pointer bg-popover text-popover-foreground opacity-0",
	monthGrid: "w-full border-collapse",
	weekdays: "flex",
	weekday: "w-(--cell-size) flex-1 text-[0.8rem] font-normal text-muted-foreground select-none",
	week: "mt-1.5 flex w-full",
	weekNumberHeader: "w-(--cell-size) select-none",
	weekNumber: "text-[0.8rem] text-muted-foreground select-none",
	day: "group/day relative aspect-square size-(--cell-size) p-0 text-center select-none",
	rangeStart: "rounded-s-(--cell-radius) bg-accent",
	rangeMiddle: "rounded-none bg-accent",
	rangeEnd: "rounded-e-(--cell-radius) bg-accent",
	outside: "text-muted-foreground",
	disabled: "text-muted-foreground opacity-50",
	hidden: "invisible",
	chevron: "size-4 rtl:rotate-180",
	dayButton:
		"relative flex size-(--cell-size) cursor-pointer flex-col items-center justify-center rounded-(--cell-radius) text-sm leading-none text-current tabular-nums outline-none transition-colors duration-fast hover:bg-accent hover:text-accent-foreground focus-visible:z-10 focus-visible:focus-ring disabled:pointer-events-none data-[today=true]:bg-muted data-[today=true]:font-semibold data-[today=true]:text-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-accent-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
	weekNumberCell: "flex size-(--cell-size) items-center justify-center text-center",
};
