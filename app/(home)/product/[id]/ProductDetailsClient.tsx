"use client";

import { getCartsJwt } from "@/app/actions/api_carts/getCarts";
import { postCart } from "@/app/actions/api_carts/postCart";
import getInventoryByProductItem from "@/app/actions/getInventoryByProductItem";
import MyButton from "@/app/components/Button";
import InputCounter from "@/app/components/InputCounter";
import ProductGallery from "@/app/components/product/ProductGallery";
import { E_InputCounter } from "@/app/enum";
import { useAuth } from "@/app/hooks/useAuth";
import type { ResponseCart, ResponseProductDetails } from "@/app/types";
import getMinMaxPrice from "@/app/utility/getMinMaxPrice";
import { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";

type variationOptions = {
	id: number;
	option: string;
	value: [
		{
			id: number;
			value: string;
		},
	];
};

type variationSelected = {
	id: number;
	value: number;
};

export default function ProductDetailsClient({
	product,
}: { product: ResponseProductDetails }) {
	const [variationOptions, setVariationOptions] = useState<variationOptions[]>(
		[],
	);
	const [selectedVariation, setSelectedVariation] = useState<
		variationSelected[]
	>([]);
	const [productItem, setProductItem] = useState(-1);
	const [inventory, setInventory] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(0);
	const { minPrice, maxPrice } = getMinMaxPrice(
		product.data.attributes.product_items.data,
	);
	const { jwt } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [carts, setCarts] = useState<ResponseCart | null>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!variationOptions) return;
		const _: variationOptions[] = [];
		// biome-ignore lint/complexity/noForEach: <explanation>
		product.data.attributes.product_items?.data.forEach((item) => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			item.attributes.product_config?.data.forEach((variation) => {
				const variation_id = variation.attributes.variation.data.id;
				const element = _.find((item) => item.id === variation_id);
				if (!element) {
					_.push({
						id: variation_id,
						option: variation.attributes.variation.data.attributes.name,
						value: [
							{
								id: variation.id,
								value: variation.attributes.value,
							},
						],
					});
					return;
				}
				if (!element.value.find((item) => item.id === variation.id)) {
					element.value.push({
						id: variation.id,
						value: variation.attributes.value,
					});
				}
			});
		});

		setVariationOptions(_);
	}, []);

	const handleQuantity = (type: E_InputCounter) => {
		if (type === E_InputCounter.DECREMENT) {
			if (quantity > 1) {
				setQuantity(quantity - 1);
			}
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleSelectVariation = (variation: variationSelected) => {
		const _: variationSelected[] = [...selectedVariation];
		const find = _.find((item) => item.id === variation.id);

		if (find) {
			_.splice(_.indexOf(find), 1);
		}
		_.push(variation);

		if (_.length !== variationOptions.length) {
			setSelectedVariation(_);
			return;
		}

		let match = 0;
		const product_items = product.data.attributes.product_items.data;
		for (let i = 0; i < product_items.length; i++) {
			const _item = product_items[i];
			match = 0;
			for (let j = 0; j < _item.attributes.product_config.data.length; j++) {
				const _config = _item.attributes.product_config.data[j];
				// biome-ignore lint/complexity/noForEach: <explanation>
				_.forEach((item) => {
					if (
						item.id === _config.attributes.variation.data.id &&
						item.value === _config.id
					) {
						match++;
					}
				});
			}

			if (match === _.length) {
				setPrice(_item.attributes.price);
				setProductItem(_item.id);
				break;
			}
		}

		if (match !== _.length) {
			setPrice(0);
		}

		setSelectedVariation(_);
	};

	useEffect(() => {
		if (productItem === -1) return;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		getInventoryByProductItem(productItem).then((quantity: any) => {
			setInventory(quantity.quantity);
		});
	}, [productItem]);

	const isSelectedVariation = (variation: variationSelected) => {
		return selectedVariation.find(
			(item) => item.id === variation.id && item.value === variation.value,
		);
	};
	useEffect(() => {
		if (!jwt) {
			console.log("JWT is undefined. Please log in to make a purchase.");
			return;
		}
		setIsLoggedIn(!!jwt);

		getCartsJwt(jwt)?.then((res) => {
			setCarts(res);
		});
	}, [jwt]);
	const isProductExist = async (productItem_id: number) => {
		const inventory = await getInventoryByProductItem(productItem_id);
		return !!inventory.quantity;
	};
	const handleAddCart = async () => {
		if (isLoggedIn) {
			if (!carts || !carts.data) {
				return;
			}

			if (productItem === null) {
				alert("Sản phẩm không tồn tại.");
				return;
			}

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const isItemInCart = carts.data.some((item: any) => {
				return item.product_item.id === productItem;
			});

			if (isItemInCart) {
				alert("Sản phẩm đã có trong giỏ hàng");
				return;
			}
			const isExist = await isProductExist(productItem);
			console.log("handleAddCart  productItem:", productItem);

			if (!isExist) {
				alert("Sản phẩm không tồn tại.");
				return;
			}

			if (!jwt) return;

			postCart(jwt, quantity, productItem);
		} else {
			alert("Vui lòng đăng nhập trước khi thêm sản phẩm!");
		}
	};

	return (
		<div className="flex gap-5">
			<div className="w-[450px] ml-5">
				<ProductGallery
					product={product}
					// thumbsSwiper={thumbsSwiper}
					// setThumbsSwiper={setThumbsSwiper}
				/>
			</div>
			<div className="w-full">
				<h1 className="text-2xl line-clamp-2">
					{product.data.attributes.name}
				</h1>
				<span>
					{price !== 0
						? `đ${price.toLocaleString()}`
						: minPrice === maxPrice
							? `đ${minPrice.toLocaleString()}`
							: `đ${minPrice.toLocaleString()} - đ${maxPrice.toLocaleString()}`}
				</span>
				{variationOptions.map((variation) => (
					<div key={variation.id}>
						<div>{variation.option}</div>
						<div className="flex gap-2">
							{variation.value.map((option) => (
								<MyButton
									key={option.id}
									label={option.value}
									className={
										isSelectedVariation({
											id: variation.id,
											value: option.id,
										})
											? "bg-neutral-600"
											: ""
									}
									onClick={() => {
										handleSelectVariation({
											id: variation.id,
											value: option.id,
										});
									}}
								/>
							))}
						</div>
					</div>
				))}
				<div className="pt-2 flex gap-4 items-end">
					<div>
						<InputCounter quantity={quantity} setQuantity={handleQuantity} />
					</div>
					{inventory > 0 ? <div>Còn {inventory} sản phẩm</div> : <></>}
				</div>
				<div className="pt-2 flex items-center">
					<MyButton
						className="m-2 bg-[#ee4d2d] bg-opacity-10 
						text-medium text-[#FF5722] outline-1
						outline-offset-0 outline-[#ee4d2d]"
						label="Thêm vào giỏ hàng"
						icon={<BsCartPlus />}
						onClick={handleAddCart}
					/>
					<MyButton
						className="bg-[#ee4d2d] text-medium text-white
						outline-none outline-1"
						label="Mua ngay"
					/>
				</div>
			</div>
		</div>
	);
}
