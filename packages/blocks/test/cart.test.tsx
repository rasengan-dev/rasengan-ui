import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToString } from "react-dom/server";

import { lineId, orderText, useCart } from "../src/cart";

/* RFC-0014's cart: a line's identity, the written order, and an empty cart on the server. */

const line = { sku: "ARLO", title: "Arlo side table", variant: "Oak", price: { amount: 85000, currency: "XAF" }, quantity: 2 };

test("a line is the product in its variant", () => {
	assert.equal(lineId(line), "ARLO:Oak");
	assert.equal(lineId({ sku: "ARLO" }), "ARLO");
});

test("the order is written out with quantities and a total", () => {
	const lamp = { ...line, sku: "LAMP", title: "Bellhop lamp", variant: undefined, quantity: 1, price: { amount: 30000, currency: "XAF" } };
	const text = orderText([line, lamp], { intro: "Hello, my order:", total: "Total" }, "en");
	assert.match(text, /^Hello, my order:/);
	assert.match(text, /2 × Arlo side table \(Oak\)/);
	assert.match(text, /1 × Bellhop lamp/);
	assert.match(text, /Total: .*200,000/);
});

test("the cart is empty on the server", () => {
	function Count() {
		return <span>{useCart("test").count}</span>;
	}
	assert.equal(renderToString(<Count />), "<span>0</span>");
});
