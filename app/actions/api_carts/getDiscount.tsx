"use client";

import { type ResponseDiscount, URL_API } from "../../types";

export function getDiscount(
	jwt: string,
): Promise<ResponseDiscount> | undefined {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/discount-codes/`, {
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
