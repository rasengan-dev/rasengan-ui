/* Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines"). */
export const tooltipStyles = {
	positioner: "z-50",
	popup:
		"w-fit max-w-xs origin-(--transform-origin) rounded-[calc(var(--control-radius)*0.7)] bg-tooltip px-2.5 py-1.5 font-control text-xs font-medium tracking-control text-balance text-tooltip-foreground case-control duration-fast ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95 data-[instant]:animate-none",
	arrow:
		"size-2.5 rotate-45 rounded-[min(2px,var(--control-radius))] bg-tooltip data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1",
};
