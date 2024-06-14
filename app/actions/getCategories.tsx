import qs from "qs";
import { type Category, URL_API } from "../types";

type ResponseCategories = {
	data: Category[];
	meta: object;
};

export default async function getCategories(): Promise<ResponseCategories> {
	const _query = qs.stringify({
		fields: ["name"],
		populate: {
			parent_category: {
				fields: ["name"],
			},
		},
	});
	return await fetch(`${URL_API}/api/categories?${_query}`).then((res) =>
		res.json(),
	);
}
