import { type ResponseProductDetails, URL_API } from "@/app/types";
import qs from "qs";

export default async function getProductDetails(
	id: string,
): Promise<ResponseProductDetails> {
	const query = qs.stringify({
		populate: {
			image: {
				fields: ["name", "url"],
			},
			brand: {
				fields: ["name"],
			},
			category: {
				fields: ["name"],
				populate: {
					parent_category: {
						fields: ["name"],
					},
				},
			},
			product_items: {
				fields: ["quantity", "price", "name"],
				populate: {
					image: {
						fields: ["name", "url"],
					},
					product_config: {
						fields: ["value"],
						populate: {
							variation: {
								fields: ["name"],
							},
						},
					},
				},
			},
		},
	});

	return fetch(`${URL_API}/api/products/${id}?${query}`, {
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
