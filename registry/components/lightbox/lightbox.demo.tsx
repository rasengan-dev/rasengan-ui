import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";

const photos = [
	{ src: "/placeholders/restaurant-room.svg", alt: "The dining room, wooden tables set for dinner", caption: "The room upstairs seats forty.", width: 1200, height: 800 },
	{ src: "/placeholders/kitchen.svg", alt: "A cook plating in the open kitchen", caption: "The kitchen is open: watch your plate made.", width: 1200, height: 800 },
	{ src: "/placeholders/dish-plantain.svg", alt: "Fried ripe plantain on a plate", width: 1200, height: 800 },
	{ src: "/placeholders/dish-fish.svg", alt: "Grilled fish with a tomato and onion sauce", caption: "Braised every evening.", width: 1200, height: 800 },
	{ src: "/placeholders/dish-dessert.svg", alt: "A dessert with fruit", width: 1200, height: 800 },
];

/** Each thumbnail opens the lightbox at its photo; arrows, the arrow keys and a swipe move between them. */
export default function LightboxDemo() {
	return (
		<Lightbox images={photos}>
			<ul className="m-0 grid w-full max-w-xl list-none grid-cols-3 gap-2 p-0">
				{photos.map((photo, index) => (
					<li key={photo.src} className={index === 0 ? "col-span-2 row-span-2" : undefined}>
						<LightboxTrigger index={index} className="block size-full cursor-zoom-in overflow-hidden rounded-lg border-village outline-none focus-visible:focus-ring">
							<img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] size-full object-cover" />
						</LightboxTrigger>
					</li>
				))}
			</ul>
			<LightboxContent />
		</Lightbox>
	);
}
