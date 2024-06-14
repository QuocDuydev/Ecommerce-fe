"use client";

import { URL_API } from "../types";
export function PostCheckOut(
	jwt: string,
	// discount_code: number,
	orderData: {
		quantity: number;
		product_item: number;
		price: number;
		discount_code: number;
	}[],
) {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/orders?`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			data: orderData,
		}),
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
