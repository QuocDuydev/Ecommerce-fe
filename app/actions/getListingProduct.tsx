import { type ResponseListingProduct, URL_API } from "@/app/types";
import qs from "qs";

export default async function getListingProduct(): Promise<ResponseListingProduct> {
	const query = qs.stringify({
		fields: ["name", "physical_product", "featured"],
		populate: {
			brand: {
				fields: ["name"],
			},
			image: {
				populate: {
					format: "*",
				},
			},
			product_items: {
				fields: ["id", "price"],
			},
			category: {
				fields: ["id", "name", "locale"],
				populate: {
					promotions: "*",
					parent_category: {
						fields: ["id", "name", "locale"],
					},
				},
			},
		},
	});

	return fetch(`${URL_API}/api/products?${query}`, {
		cache: "no-cache",
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		console.log(
			`${res.status} - ${res.json().then((res) => res.error.message)}`,
		);
		throw new Error("Failed to fetch data");
	});
}
