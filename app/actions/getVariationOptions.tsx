import { URL_API, type Variation } from "@/app/types";
import qs from "qs";

type ResponseVariationOptions = {
	data: Variation[];
};

export default async function getVariationOptions(): Promise<ResponseVariationOptions> {
	const _query = qs.stringify({
		populate: {
			variation_options: "*",
		},
		pagination: {
			pageSize: 100,
		},
	});
	return await fetch(`${URL_API}/api/variations?${_query}`).then((res) =>
		res.json(),
	);
}
