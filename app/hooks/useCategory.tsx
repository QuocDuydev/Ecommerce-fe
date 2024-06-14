import { create } from "zustand";
import type { Category } from "../types";

type CategoryStore = {
	categories?: Category[];
	save_categories: (_categories: Category[]) => void;
};

export const useCategory = create<CategoryStore>((set) => ({
	categories: undefined,
	save_categories: (_categories: Category[]) => {
		set({
			categories: _categories,
		});
	},
}));
