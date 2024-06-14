import { type ResponseListingProduct, URL_API } from "@/app/types";
import qs from "qs";

export default function getAutocomplete(
	query: string,
): Promise<ResponseListingProduct> {
	const querySearch = qs.stringify({
		filters: {
			name: {
				$containsi: query,
			},
		},
		fields: ["name"],
		pagination: {
			pageSize: 10,
			page: 1,
		},
	});

	return fetch(`${URL_API}/api/products?${querySearch}`, {
		cache: "reload",
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
