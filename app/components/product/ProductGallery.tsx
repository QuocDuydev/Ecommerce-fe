"use client";

import type { Gallery, ResponseProductDetails } from "@/app/types";
import { type Dispatch, type SetStateAction, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import CarouselThumbs from "./CarouselThumbs";
import ProductImage from "./ProductImage";

interface ProductGalleryProps {
	product: ResponseProductDetails;
	// thumbsSwiper: any;
	// setThumbsSwiper: Dispatch<SetStateAction<null>>;
}

export default function ProductGallery({
	product,
	// thumbsSwiper,
	// setThumbsSwiper,
}: ProductGalleryProps) {
	const galleryItems = [
		{
			id: product.data.attributes.image.data.id,
			imgUrl: product.data.attributes.image.data.attributes.url,
		},
	];

	galleryItems.push(
		...product.data.attributes.product_items.data.map((item): Gallery => {
			return {
				id: item.attributes.image.data[0].id,
				imgUrl: item.attributes.image.data[0].attributes.url,
			};
		}),
	);

	// Create a new Set with unique ids
	const uniqueGalleryItems = Array.from(
		new Set(galleryItems.map((item) => item.id)),
	).map((id) => {
		return galleryItems.find((item) => item.id === id);
	});

	const gallery: Gallery[] = uniqueGalleryItems.filter(
		(item): item is Gallery => item !== undefined,
	);

	return (
		<div>
			<ProductImage gallery={gallery} />
			<CarouselThumbs gallery={gallery} />
		</div>
	);
}
