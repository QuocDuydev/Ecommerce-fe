import { URL_API } from "@/app/types";
import qs from "qs";

export default async function getBanners() {
	const query = qs.stringify({
		populate: {
			BannerItem: {
				fields: "*",
				populate: {
					image: {
						fields: "*",
					},
				},
			},
		},
	});

	return await fetch(`${URL_API}/api/banner?${query}`).then((res) =>
		res.json(),
	);
}
