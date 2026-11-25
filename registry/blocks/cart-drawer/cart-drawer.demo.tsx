"use client";

import { CartDrawer } from "@/components/blocks/cart-drawer";
import { Button } from "@/components/ui/button";
import { openCart, useCart } from "@/lib/cart";

/** The drawer's button beside a sample product: add it, and the cart opens with its line, as product-detail does. */
export default function CartDrawerDemo() {
	const cart = useCart("kaya");
	const addCushion = () => {
		cart.add({
			sku: "KAYA-CUSHION",
			title: "Linen cushion",
			variant: "Colour: Rust · Size: 45 × 45 cm",
			price: { amount: 18000, currency: "XAF" },
			quantity: 1,
			image: { src: "/placeholders/shop-cushion.svg", alt: "A rust linen cushion under a white one, on a woven rug", width: 1000, height: 1250 },
			href: "/examples/shop/linen-cushion",
		});
		openCart("kaya");
	};
	return (
		<div className="flex flex-wrap items-center justify-center gap-3 px-4 py-16">
			<Button variant="outline" onClick={addCushion}>
				Add a cushion
			</Button>
			<CartDrawer trigger="inline" />
		</div>
	);
}
