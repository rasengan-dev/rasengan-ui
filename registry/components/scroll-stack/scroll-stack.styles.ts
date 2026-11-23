/*
 * RFC-0010. Static (no JavaScript, reduced motion, `final`, intensity 0): a plain list of cards with a gap.
 *
 * `data-layout="sticky"`: every item takes one screen of scroll and sticks to the top, its card set lower by its index
 * times --stack-gap, so the next item slides over it and the cards pile up. The root follows the scroll over the whole
 * stack (`range: "pin"`): with n items it is n screens tall and pinned for n - 1 of them, so --scroll-progress × (n - 1)
 * counts the cards that have landed.
 *
 * `data-layout="still"` (a fixed `progress`, for demos and screenshots): the same moment drawn in place, without
 * scrolling. The items share one grid cell; each sits at its stacked offset, or below the pile, clipped, by how much it
 * has yet to arrive (--arrive).
 *
 * --depth is how many cards now cover an item: `shrink` scales its card down by that much, `tilt` (intensity 3) also
 * tips it back. No dimming: a `filter` on the card would break a glass village's backdrop (Kiri) and its contrast.
 */
const depth = "[--depth:clamp(0,calc(var(--scroll-progress,0)_*_(var(--count,1)_-_1)_-_var(--i,0)),calc(var(--count,1)_-_1_-_var(--i,0)))]";
const arrive = "[--arrive:clamp(0,calc(var(--scroll-progress,0)_*_(var(--count,1)_-_1)_-_var(--i,0)_+_1),1)]";

export const scrollStackStyles = {
	root: [
		"m-0 flex list-none flex-col gap-6 p-0 [--stack-gap:1rem] [--stack-top:5rem]",
		"data-[layout=sticky]:gap-0",
		"data-[layout=still]:grid data-[layout=still]:gap-0 data-[layout=still]:overflow-clip",
		"data-[layout=still]:pb-[calc((var(--count,1)_-_1)_*_var(--stack-gap))]",
	].join(" "),
	item: [
		"relative",
		depth,
		// Sticky: one screen each, the card lower by its index.
		"in-data-[layout=sticky]:pointer-events-none in-data-[layout=sticky]:sticky in-data-[layout=sticky]:top-0 in-data-[layout=sticky]:h-svh",
		"in-data-[layout=sticky]:pt-[calc(var(--stack-top)_+_var(--i,0)_*_var(--stack-gap))]",
		"in-data-[layout=sticky]:[&>*]:pointer-events-auto",
		// Still: one grid cell, each at its offset, or still on its way up.
		arrive,
		"in-data-[layout=still]:[grid-area:1/1] in-data-[layout=still]:self-start",
		"in-data-[layout=still]:[translate:0_calc(var(--i,0)_*_var(--stack-gap)_+_(1_-_var(--arrive))_*_150%)]",
		// A focused card comes above the ones that cover it.
		"focus-within:z-10",
		"[&>*]:origin-top",
		"in-data-[effect=shrink]:[&>*]:[scale:calc(1_-_var(--depth)_*_0.05)]",
		"in-data-[effect=tilt]:[&>*]:[transform:perspective(1200px)_rotateX(calc(var(--depth)_*_4deg))_scale(calc(1_-_var(--depth)_*_0.05))]",
	].join(" "),
};
