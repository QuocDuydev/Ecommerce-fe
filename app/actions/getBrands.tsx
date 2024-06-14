import qs from "qs";
import { type Brand, URL_API } from "../types";

type ResponseBrands = {
	data: Brand[];
};

export default async function getBrands(): Promise<ResponseBrands> {
	const _query = qs.stringify({
		fields: ["name"],
		pagination: {
			pageSize: 100,
		},
	});
	return await fetch(`${URL_API}/api/brands?${_query}`).then((res) =>
		res.json(),
	);
}
