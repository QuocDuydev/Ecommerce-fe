"use client";

import { v4 } from "uuid";
import { URL_API } from "../types";

export const subcribeNewsletters = async (email: string) => {
	return await fetch(`${URL_API}/api/subscribers`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			data: {
				email: email,
				token: v4(),
			},
		}),
	}).then((res) => res.json());
};
