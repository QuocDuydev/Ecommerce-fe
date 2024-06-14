import type { ProductItems } from "../types";

export default function getMinMaxPrice(product: ProductItems[]) {
	const minPrice = product.reduce(
		(min, item) => Math.min(min, item.attributes.price),
		Number.POSITIVE_INFINITY,
	);
	const maxPrice = product.reduce(
		(max, item) => Math.max(max, item.attributes.price),
		0,
	);
	return { minPrice, maxPrice };
}
