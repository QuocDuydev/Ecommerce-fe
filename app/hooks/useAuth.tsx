"use client";

import { create } from "zustand";
import type { User } from "../types";

type AuthStore = {
	jwt?: string;
	user?: User;
	save_token: (_jwt: string, _user: User) => void;
	logout: () => void;
};

const getJwt = () => {
	if (typeof window === "undefined") return undefined;
	return localStorage.getItem("jwt") ?? undefined;
};

const getUser = () => {
	if (typeof window === "undefined") return undefined;
	const userItem = localStorage.getItem("user");
	if (userItem !== null) {
		return JSON.parse(userItem);
	}
	return undefined;
};

export const useAuth = create<AuthStore>((set) => ({
	jwt: getJwt(),
	user: getUser(),
	save_token: (_jwt: string, _user: User) => {
		localStorage.setItem("jwt", _jwt);
		localStorage.setItem("user", JSON.stringify(_user));
		set({
			jwt: _jwt,
			user: _user,
		});
	},
	logout: () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("user");
		set({
			jwt: "",
			user: undefined,
		});
		window.location.reload();
	},
}));
