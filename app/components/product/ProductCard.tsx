"use client";

import type { Product } from "@/app/types";
import getMinMaxPrice from "@/app/utility/getMinMaxPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductCardProps = {
	product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
	const { minPrice, maxPrice } = getMinMaxPrice(
		product.attributes.product_items.data,
	);

	if (!product.attributes.image.data) {
		return;
	}

	return (
		<div
			className="w-[190px] h-[286px] cursor-pointer rounded-sm 
		bg-white text-sm outline-none outline-1
		transition-all duration-300 hover:outline-red-500"
		>
			<Link href={`/product/${product.id}`}>
				<div className="h-full">
					<div className="w-full">
						<Image
							className="object-cover"
							src={product.attributes.image.data.attributes.url}
							alt={product.attributes.image.data.attributes.name}
							width={190}
							height={190}
							priority={true}
						/>
					</div>
					<div className="p-2">
						{product.attributes.featured ? (
							<div className="text-white w-fit rounded-lg p-1 line-clamp-1 bg-gradient-to-r from-[#ef3006] to-[#c60004]">
								{product.attributes.featured}
							</div>
						) : (
							<div className="h-[28px]"></div>
						)}
						<span className="line-clamp-2">{product.attributes.name}</span>
						{/* <div>Voucher</div> */}
						<div className="flex justify-between">
							<span className="line-clamp-1 align-baseline text-sm text-[#EE4D2D]">
								{minPrice === maxPrice
									? `đ${minPrice.toLocaleString()}`
									: `đ${minPrice.toLocaleString()} - đ${maxPrice.toLocaleString()}`}
							</span>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
