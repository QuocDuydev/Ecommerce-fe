"use client";

import { useVoucher } from "@/app/hooks/useDiscount";
import type { ResponseCart } from "@/app/types";
import Image from "next/image";

interface CartItemProps {
	carts: ResponseCart | undefined;
}

export default function CartItem({ carts }: CartItemProps) {
	const { voucher } = useVoucher();
	const calculateTotalPrice = () => {
		if (!carts?.data || !voucher) return 0;
		return carts.data.reduce((total, item) => {
			let price = item.product_item.price;

			if (
				// biome-ignore lint/complexity/useOptionalChain: <explanation>
				voucher &&
				voucher.products &&
				voucher.products.some(
					(product) =>
						(product as { id: number }).id === item.product_item.product.id,
				)
			) {
				price =
					voucher.type === "percentage"
						? item.product_item.price * (1 - voucher.amount)
						: item.product_item.price - voucher.amount;
			}
			return total + price * item.quantity;
		}, 0);
	};
	const calculateTotal = () => {
		if (!carts?.data) return 0;
		return carts.data.reduce((total, item) => {
			return total + item.product_item.price * item.quantity;
		}, 0);
	};

	return (
		<>
			<div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
				<h2 className="text-2xl font-extrabold text-[#f58255]">
					Order Summary
				</h2>
				<div className="space-y-6 mt-10">
					{carts?.data.map((item) => (
						<div
							className="grid sm:grid-cols-2 items-start gap-6"
							key={item.id}
						>
							<div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
								<Image
									width={50}
									height={50}
									src={item.product_item.image[0].formats.thumbnail.url}
									alt="a"
									className="w-full object-contain"
								/>
							</div>
							<div>
								<h3 className="text-base text-[#333]">
									{item.product_item.name}
								</h3>
								<ul className="text-xs text-[#333] space-y-2 mt-2">
									<li className="flex flex-wrap gap-4">
										Quantity <span className="ml-auto">{item.quantity}</span>
									</li>
									{/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
									{voucher &&
									voucher.products &&
									voucher.products.some(
										(product) =>
											(product as { id: number }).id ===
											item.product_item.product.id,
									) ? (
										<>
											<li className="flex flex-wrap gap-4">
												Price{" "}
												<span className="ml-auto line-through">
													{item.product_item.price.toLocaleString()}đ
												</span>
												{voucher.type === "percentage" ? (
													<span className="ml-auto">
														{(
															voucher.amount * item.product_item.price
														).toLocaleString()}
														đ
													</span>
												) : (
													<span className="ml-auto">
														{(
															item.product_item.price - voucher.amount
														).toLocaleString()}
														đ
													</span>
												)}
											</li>
											<li className="flex flex-wrap gap-4">
												Total Price{" "}
												<span className="ml-auto">
													{(
														voucher.amount *
														item.product_item.price *
														item.quantity
													).toLocaleString()}
													đ
												</span>
											</li>
										</>
									) : (
										<>
											<li className="flex flex-wrap gap-4">
												Price{" "}
												<span className="ml-auto">
													{item.product_item.price.toLocaleString()}đ
												</span>
											</li>
											<li className="flex flex-wrap gap-4">
												Total Price{" "}
												<span className="ml-auto">
													{(
														item.product_item.price * item.quantity
													).toLocaleString()}
													đ
												</span>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className=" left-0 bottom-0 bg-gray-200 w-full p-4">
				<h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
					Total{" "}
					<span className="ml-auto">
						{voucher
							? calculateTotalPrice().toLocaleString()
							: calculateTotal().toLocaleString()}
					</span>
					đ
				</h4>
			</div>
		</>
	);
}
