"use client";

import { type ResponseCart, URL_API } from "../../types";

export function postCart(
	jwt: string,
	quantity: number,
	product_item: number,
): Promise<ResponseCart> | undefined {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/carts`, {
		method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({ data: { quantity, product_item } }),
	}).then((res) => {
		if (res.ok) {
			console.log("create thanh cong");
			alert("Thêm sản phẩm thành công!");
			window.location.reload();
			return res.json();
		}
		console.log(
			`${res.status} - ${res.json().then((res) => res.error.message)}`,
		);
		throw new Error("Failed to fetch data");
	});
}
