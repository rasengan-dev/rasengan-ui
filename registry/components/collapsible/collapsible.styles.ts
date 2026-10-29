/* Base UI measures the panel (--collapsible-panel-height); a transition reads it. */
export const collapsibleStyles = {
	panel: "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-base ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
};
