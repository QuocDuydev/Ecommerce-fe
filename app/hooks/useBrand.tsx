import { create } from "zustand";
import type { Brand } from "../types";

type BrandStore = {
	brands?: Brand[];
	save_brands: (_brands: Brand[]) => void;
};

export const useBrand = create<BrandStore>((set) => ({
	brands: undefined,
	save_brands: (_brands: Brand[]) => {
		set({
			brands: _brands,
		});
	},
}));
