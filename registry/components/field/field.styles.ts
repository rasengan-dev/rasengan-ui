/* A Field's size (data-size) tightens or loosens the gap and the texts around its control. */
export const fieldStyles = {
	root: "group/field flex w-full min-w-0 flex-col gap-2 data-[size=lg]:gap-2.5 data-[size=sm]:gap-1.5",
	label: "group-data-[size=lg]/field:text-control-lg group-data-[size=sm]/field:text-control-sm",
	description: "text-sm leading-snug text-muted-foreground group-data-[size=sm]/field:text-[0.8125rem]",
	error: "text-sm leading-snug font-medium text-destructive group-data-[size=sm]/field:text-[0.8125rem]",
};
