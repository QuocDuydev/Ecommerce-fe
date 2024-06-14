"use client";

import getBrands from "@/app/actions/getBrands";
import getCategories from "@/app/actions/getCategories";
import getVariationOptions from "@/app/actions/getVariationOptions";
import { StarRating } from "@/app/components/StarRating";
import { useBrand } from "@/app/hooks/useBrand";
import { useCategory } from "@/app/hooks/useCategory";
import type { Variation } from "@/app/types";
import {
	Checkbox,
	CheckboxGroup,
	Radio,
	RadioGroup,
	Slider,
	Spacer,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";

export const ProductClientPage = () => {
	const [currentBrands, setCurrentBrands] = useState(-1);
	const [category, setCategory] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<number[] | number>([
		0, 50000000,
	]);
	const params = useSearchParams();
	const route = useRouter();
	const { brands, save_brands } = useBrand();
	const { categories, save_categories } = useCategory();
	const [showAllCategory, setShowAllCategory] = useState(false);
	const [rating, setRating] = useState<number>();
	const [variation, setVariation] = useState<Variation[]>([]);
	const [productConfig, setProductConfig] = useState<any>();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (brands && brands?.length > 0) {
			return;
		}
		getBrands().then((res) => {
			save_brands(res.data);
		});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (variation && variation.length > 0) return;

		getVariationOptions().then((res) => {
			setVariation(res.data);
		});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (categories && categories.length > 0) {
			return;
		}
		getCategories().then((res) => {
			save_categories(res.data);
		});
	}, []);

	// PRICE RANGE
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handler = setTimeout(() => {
			const _priceRange = priceRange as number[];
			if (_priceRange[0] === 0 && _priceRange[1] === 50000000) {
				return;
			}

			let current_query = {};

			if (params) {
				current_query = qs.parse(params.toString());
			}

			current_query = {
				...current_query,
				minPrice: _priceRange[0],
				maxPrice: _priceRange[1],
			};

			const url = qs.stringify(current_query, { skipNulls: true });
			route.push(`/product?${url}`);
		}, 650);

		return () => {
			clearTimeout(handler);
		};
	}, [priceRange]);

	// BRANDS
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (currentBrands === -1) return;
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		current_query = {
			...current_query,
			brand: currentBrands,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [currentBrands]);

	// CATEGORY
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		current_query = {
			...current_query,
			categories: category.length > 0 ? category : null,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [category]);

	// RATING
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}
		current_query = {
			...current_query,
			stars: rating,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [rating]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!productConfig) return;
		let current_query = {};
		const currentVariation: any = [];
		Object.keys(productConfig).forEach((key) => {
			currentVariation.push({
				variation: key,
				option: productConfig[key],
			});
		});

		if (params) {
			current_query = qs.parse(params.toString());
		}
		current_query = {
			...current_query,
			attribute: currentVariation.length > 0 ? currentVariation : null,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [productConfig]);

	return (
		<div className="flex flex-col basis-[235px]">
			{/* Category */}
			<div className="flex flex-col">
				<h3 className="font-bold">Theo danh mục</h3>
				<div className="flex flex-col">
					<CheckboxGroup value={category} onValueChange={setCategory}>
						{categories?.slice(0, 4).map((c) => (
							<Checkbox key={c.id} value={c.id.toString()}>
								{c.attributes.name}
							</Checkbox>
						))}
						{categories && categories?.length > 4 && !showAllCategory && (
							<button onClick={() => setShowAllCategory(true)}>Xem thêm</button>
						)}
						{showAllCategory &&
							categories?.slice(4).map((c) => (
								<Checkbox key={c.id} value={c.id.toString()}>
									{c.attributes.name}
								</Checkbox>
							))}
					</CheckboxGroup>
				</div>
			</div>
			<Spacer />
			{/* Product atributes */}
			<div>
				<h3 className="font-bold">Thuộc tính sản phẩm</h3>
				<div className="flex flex-col">
					{variation?.map((v) => (
						<div key={v.id} className="flex flex-col gap-2">
							<div className="font-bold">{v.attributes.name}</div>
							<RadioGroup>
								{v.attributes.variation_options.data.map((item) => (
									<Radio
										key={item.id}
										aria-label={item.attributes.value}
										value={item.attributes.value}
										onChange={() =>
											setProductConfig({
												...productConfig,
												[v.id]: item.id,
											})
										}
									>
										{item.attributes.value}
									</Radio>
								))}
							</RadioGroup>
						</div>
					))}
				</div>
			</div>
			<Spacer />
			{/* Thương Hiệu */}
			<div>
				<h3 className="font-bold">Thương hiệu</h3>
				<div className="flex flex-col">
					<RadioGroup>
						{brands?.map((b) => (
							<Radio
								key={b.id}
								aria-label={b.attributes.name}
								value={b.attributes.name}
								onChange={() => setCurrentBrands(b.id)}
							>
								{b.attributes.name}
							</Radio>
						))}
					</RadioGroup>
				</div>
			</div>
			<Spacer />
			{/* Price range */}
			<div>
				<Slider
					label="Giá"
					step={1000000}
					minValue={0}
					maxValue={50000000}
					value={priceRange}
					onChange={setPriceRange}
					formatOptions={{ style: "currency", currency: "VND" }}
					className="max-w-md font-bold"
				/>
			</div>
			<Spacer />
			{/* Đánh Giá */}
			<div>
				<h3>Đánh giá</h3>
				<div className="flex flex-col">
					<RadioGroup>
						{[5, 4, 3, 2, 1].map((rating) => (
							<Radio
								key={rating}
								aria-label={rating.toString()}
								value={rating.toString()}
								onChange={() => setRating(rating)}
							>
								<StarRating rating={rating} />
							</Radio>
						))}
					</RadioGroup>
				</div>
			</div>
		</div>
	);
};
