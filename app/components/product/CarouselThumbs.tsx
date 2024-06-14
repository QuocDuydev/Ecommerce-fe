import type { Gallery } from "@/app/types";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarouselThumbsProps {
	gallery: Gallery[];
}

export default function CarouselThumbs({ gallery }: CarouselThumbsProps) {
	return (
		<div className="relative mx-auto mt-5 max-w-md lg:mt-8 lg:pb-2">
			<Swiper
				spaceBetween={20}
				slidesPerView={4}
				watchSlidesProgress={true}
				freeMode={true}
				observer={true}
				observeParents={true}
			>
				{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
				{gallery?.map((item: { id: any; imgUrl: string | StaticImport }) => (
					<SwiperSlide
						key={`product-thumb-gallery-${item.id}`}
						className="border-border-200 flex 
						cursor-pointer items-center justify-center 
						overflow-hidden rounded border border-opacity-75 
						hover:opacity-75"
					>
						<Image
							src={item.imgUrl}
							alt={`Product thumb gallery ${item.id}`}
							width={80}
							height={80}
							priority
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
