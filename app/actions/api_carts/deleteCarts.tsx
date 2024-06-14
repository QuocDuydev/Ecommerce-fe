"use client";

import { type ResponseCart, URL_API } from "../../types";

export function deleteCart(
	id: number,
	jwt: string,
): Promise<ResponseCart> | undefined {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/carts/${id}`, {
		method: "DELETE",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
	}).then((res) => {
		const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm?");
		if (isConfirmed) {
			if (res.ok) {
				console.log("delete thanh cong");
				alert("Xóa sản phẩm thành công!");
				window.location.reload();
				return res.json();
			}
			console.log(
				`${res.status} - ${res.json().then((res) => res.error.message)}`,
			);
			throw new Error("Failed to fetch data");
		}
	});
}
