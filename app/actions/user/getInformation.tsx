"use client";

import { URL_API, type User } from "@/app/types";

export const getInformation = async (jwt?: string): Promise<User> => {
	return await fetch(`${URL_API}/api/users/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	}).then((res) => res.json());
};
