import { type ResponseListingProduct, URL_API } from "@/app/types";
import qs from "qs";

interface ProductFilter {
	page?: number;
	pageSize?: number;
	minPrice?: number;
	maxPrice?: number;
	brand?: number;
	query?: string;
	categories?: number[];
	stars?: number;
	attribute?: string;
	sort?: number;
}

export default async function getListingProductWithFilter({
	page = 1,
	pageSize = 10,
	minPrice = 0,
	maxPrice = 0,
	brand,
	query,
	categories,
	stars,
	attribute,
	sort,
}: ProductFilter): Promise<ResponseListingProduct> {
	const attributes = attribute as unknown as {
		variation: number;
		option: number;
	}[];
	const _query = qs.stringify({
		fields: ["name", "physical_product", "featured"],
		filters: {
			...(query === undefined ? {} : { name: { $containsi: query } }),
			...(brand === undefined ? {} : { brand: { id: { $eq: brand } } }),
			...(categories === undefined
				? {}
				: { category: { id: { $in: categories } } }),
			product_items: {
				$and: [
					...(minPrice === 0 ? [] : [{ price: { $gte: minPrice } }]),
					...(maxPrice === 0 ? [] : [{ price: { $lte: maxPrice } }]),
				],
				...(!attributes
					? {}
					: {
							$or: [
								...attributes.map((item) => {
									return {
										product_config: {
											id: {
												$eq: item.option,
											},
											variation: {
												id: {
													$eq: item.variation,
												},
											},
										},
									};
								}),
							],
						}),
			},
		},
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
				sort: [`price:${sort === 1 ? "asc" : "desc"}`],
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
		pagination: {
			pageSize: pageSize,
			page: page,
		},
		// sort: ["updatedAt:desc"],
	});

	return fetch(`${URL_API}/api/products?${_query}`, {
		cache: "reload",
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		// console.log(
		// 	`${res.status} - ${res.json().then((res) => res.error.message)}`,
		// );
		// console.log(_query);
		throw new Error("Failed to fetch data");
	});
}
