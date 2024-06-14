import { URL_API } from "../types";

export default async function getInventoryByProductItem(
	product_item_id: number,
): Promise<{
	id: number;
	quantity: number;
}> {
	return await fetch(
		`${URL_API}/api/inventory/product-item/${product_item_id}`,
		{
			cache: "no-cache",
		},
	).then((res) => res.json());
}
