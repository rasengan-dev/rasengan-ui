import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "reviews-rating",
	title: "Reviews, rating",
	family: "storefront",
	category: "testimonials",
	status: "beta",
	added: "2026-11-08",
	summary: "The average rating written large with its stars, the count and where reviews were left, beside a masonry of starred reviews.",
	useWhen: "A business with a good public rating and real reviews to quote: restaurants, salons, garages.",
	avoidWhen: "A handful of long testimonials with photos: testimonials-carousel. No real rating to show.",
	layout: { columns: "split" },
	content: { images: 0, minWords: 60, maxWords: 400 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["menu-cards", "booking-form"],
} as const satisfies BlockMeta;
