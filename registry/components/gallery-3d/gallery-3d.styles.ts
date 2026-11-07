/*
 * A 3D stage: perspective on the stage, preserve-3d on the scene and on every card, each absolutely centred and placed
 * by its transform. A card has two faces: its content in front, and a back in the village's secondary surface with its
 * name, so a card turned away shows its back rather than vanishing. Moving between positions or layouts uses the
 * village's slow duration and ease-out; while dragged, transforms follow the pointer without transition. Below
 * intensity 2 (Iwa) or with motion off, the gallery is a flat, wrapping grid of the same buttons.
 */
export const galleryStyles = {
	root: "relative w-full touch-pan-y select-none outline-none",
	stage: "relative h-(--gallery-height) w-full overflow-clip [perspective:1200px]",
	// The scene is an empty plane at z = 0: it must not take the pointer, or it hides every card behind it from clicks.
	scene: "pointer-events-none absolute inset-0 [transform-style:preserve-3d]",
	item: "pointer-events-auto absolute top-1/2 left-1/2 -ms-[calc(var(--gallery-item)/2)] -mt-[calc(var(--gallery-item)*0.65)] h-[calc(var(--gallery-item)*1.3)] w-(--gallery-item) cursor-pointer rounded-lg outline-none [transform-style:preserve-3d] focus-visible:focus-ring",
	moving: "transition-[transform,opacity] duration-slow ease-out",
	front: "absolute inset-0 overflow-hidden rounded-lg border-village bg-card shadow-md [backface-visibility:hidden]",
	back: "absolute inset-0 flex items-end overflow-hidden rounded-lg border-village bg-secondary p-3 text-start shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]",
	backLabel: "font-display text-sm font-semibold tracking-display text-secondary-foreground",
	flat: "grid grid-cols-[repeat(auto-fill,minmax(var(--gallery-item),1fr))] gap-4",
	flatItem: "relative aspect-[1/1.3] cursor-pointer overflow-hidden rounded-lg border-village bg-card shadow-sm outline-none focus-visible:focus-ring",
	caption: "absolute inset-x-0 bottom-0 bg-background/85 px-3 py-2 text-start text-sm font-medium text-foreground backdrop-blur-sm",
	media: "size-full object-cover",
};
