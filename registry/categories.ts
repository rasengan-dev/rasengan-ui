/**
 * The component categories (RFC-0007, "Organisation"), in the order the site lists them. Every `meta.ts` names one;
 * `pnpm registry` refuses an unknown one and publishes it in the item's `meta.category`.
 *
 * `motion` is for components whose motion is their purpose: without the animation they make no sense (marquee,
 * typewriter). A component that still works without it (carousel, dialog) belongs to another category.
 */
export const categories = {
	forms: { title: "Forms", description: "Buttons, fields and the controls that take input." },
	dates: { title: "Dates and times", description: "Calendars and pickers for dates, ranges and times." },
	overlays: { title: "Overlays", description: "What opens above the page: dialogs, sheets, menus, popovers, toasts." },
	navigation: { title: "Navigation", description: "Moving between pages and sections." },
	display: { title: "Display", description: "Showing content: cards, tables, badges, avatars, carousels." },
	feedback: { title: "Feedback", description: "Status, progress, loading and empty states." },
	motion: { title: "Motion", description: "Components whose motion is the point, following the village's motion." },
} as const;

export type Category = keyof typeof categories;
