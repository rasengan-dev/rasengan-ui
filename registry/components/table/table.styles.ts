import { cva, type VariantProps } from "class-variance-authority";

/*
 * Rows are separated by a line as thick as the village's borders. striped tints every other body row; selected rows
 * (data-state="selected") take the muted fill either way. The size sets the row height from the control heights, so a
 * dense village stays dense; sm is for tables inside cards and panels.
 */
export const tableVariants = cva("group/table w-full caption-bottom text-sm", {
	variants: {
		variant: {
			default: "",
			striped: "[&_tbody_tr:nth-child(even)]:bg-muted/50",
		},
		size: {
			sm: "",
			default: "",
		},
	},
	defaultVariants: { variant: "default", size: "default" },
});

export type TableVariantProps = VariantProps<typeof tableVariants>;

const cell = "px-3 align-middle whitespace-nowrap has-[[role=checkbox]]:pe-0 [&>[role=checkbox]]:translate-y-0.5";

export const tableStyles = {
	container: "relative w-full overflow-x-auto",
	header: "[&_tr]:border-b-(length:--border-width)",
	body: "[&_tr:last-child]:border-0",
	footer: "border-t-(length:--border-width) bg-muted/50 font-medium [&>tr]:last:border-b-0",
	row: "border-b-(length:--border-width) transition-colors duration-fast hover:bg-muted/50 data-[state=selected]:bg-muted",
	head: `${cell} h-control text-start font-medium text-foreground group-data-[size=sm]/table:h-control-sm`,
	cell: `${cell} h-control py-2 group-data-[size=sm]/table:h-control-sm group-data-[size=sm]/table:py-1`,
	caption: "mt-4 text-sm text-muted-foreground",
};
