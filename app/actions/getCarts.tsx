"use client";
import { useAuth } from "../hooks/useAuth";
import { type ResponseCart, URL_API } from "../types";

export function getCartsJwt(jwt: string): Promise<ResponseCart> | undefined {
	if (jwt === undefined) return;

	return fetch(`${URL_API}/api/carts?`, {
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
