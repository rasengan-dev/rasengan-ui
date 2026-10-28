export const cardStyles = {
	root: "flex flex-col gap-6 rounded-xl border-village bg-card py-6 text-card-foreground shadow-sm backdrop-blur-surface",
	header: "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
	title: "font-display text-lg leading-tight font-semibold tracking-display case-heading",
	description: "text-sm leading-snug text-muted-foreground",
	action: "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
	content: "px-6",
	footer: "flex items-center gap-2 px-6",
};
