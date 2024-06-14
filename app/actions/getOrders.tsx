"use client";
import { type ResponseOrder, URL_API } from "../types";

export function getOrders(jwt: string): Promise<ResponseOrder> | undefined {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/orders?`, {
		cache: "no-cache",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
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
