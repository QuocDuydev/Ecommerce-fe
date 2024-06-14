"use client";

import { URL_API } from "../types";

export function PostUserAddress(
	jwt: string,
	address_line_1: string,
	city: string,
	country: string,
	phone: number,
	postal_code: number,
) {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/user-addresses`, {
		method: "POST",
		cache: "reload",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			data: { address_line_1, city, country, phone, postal_code },
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
