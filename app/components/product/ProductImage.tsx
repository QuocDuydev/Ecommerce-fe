import type { Gallery } from "@/app/types";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductImageProps {
	gallery: Gallery[];
}

export default function ProductImage({ gallery }: ProductImageProps) {
	return (
		<div className="relative">
			<Swiper modules={[Thumbs]}>
				{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
				{gallery?.map((item: { id: any; imgUrl: string | StaticImport }) => (
					<SwiperSlide
						key={`product-gallery-${item.id}`}
						className="flex justify-center items-center"
					>
						<Image
							src={item.imgUrl}
							alt={`Product gallery ${item.id}`}
							width={450}
							height={450}
							priority
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
