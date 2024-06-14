"use client";

import { URL_API } from "../types";
export function updateOrder(id: number, jwt: string, status: string) {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/orders/${id}`, {
		method: "PUT",
		cache: "reload",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			data: { id, status },
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
