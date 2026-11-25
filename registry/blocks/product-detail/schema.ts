import { z } from "zod";

import { product } from "@/lib/block-fields";

export const schema = z.object({
	product: product.describe("The same object as in product-grid: write a product once."),
	shop: z.string().min(1).max(24).optional().describe("The cart it adds to, shared with cart-drawer: 'kaya'. 'shop' when left out."),
	notes: z
		.array(
			z.object({
				icon: z.enum(["truck", "return", "check", "shield", "gift"]).default("check"),
				text: z.string().min(1).max(90).describe("'Delivered in Douala within two days', 'Returns within fourteen days'."),
			}),
		)
		.max(4)
		.optional()
		.describe("Under the button: delivery, returns, what is promised."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	labels: z.object({
		add: z.string().min(1).max(24).describe("'Add to bag'; the price follows it."),
		added: z.string().min(1).max(60).describe("Read and shown once added: 'Added to your bag'."),
		pick: z.string().min(1).max(40).describe("When an option is missing: 'Pick a {name} first' ({name} is the variant's, in lower case)."),
		soldOut: z.string().min(1).max(16).describe("'Sold out'"),
		quantity: z.string().min(1).max(16).describe("'Quantity'"),
		less: z.string().min(1).max(24).describe("'One less'"),
		more: z.string().min(1).max(24).describe("'One more'"),
		was: z.string().min(1).max(16).describe("Before a struck price, for screen readers: 'Was'."),
		reviews: z.string().min(1).max(24).describe("'{count} reviews'"),
		details: z.string().min(1).max(24).describe("The details' heading: 'Details'."),
		photos: z.string().min(1).max(40).describe("Names the gallery: 'Photos of the product'."),
		open: z.string().min(1).max(40).describe("On the large photo: 'Open the photos full screen'."),
		previous: z.string().min(1).max(24),
		next: z.string().min(1).max(24),
		close: z.string().min(1).max(16),
	}),
});

export type ProductDetailContent = z.infer<typeof schema>;
