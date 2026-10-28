export const checkboxStyles = {
	root: "group/checkbox peer inline-flex size-[1.125rem] shrink-0 cursor-pointer items-center justify-center rounded-check border-village border-input bg-input-bg text-primary-foreground shadow-input outline-none transition-[background-color,border-color] duration-fast ease-out focus-visible:focus-ring ui-checked:border-primary ui-checked:bg-primary ui-indeterminate:border-primary ui-indeterminate:bg-primary ui-invalid:border-destructive ui-disabled:cursor-not-allowed ui-disabled:opacity-50",
	indicator: "flex items-center justify-center text-current [&_svg]:size-3.5 [&_svg]:stroke-[3]",
	check: "group-data-[indeterminate]/checkbox:hidden",
	minus: "hidden group-data-[indeterminate]/checkbox:block",
};
