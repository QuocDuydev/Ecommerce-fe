"use client";
import { deleteCart } from "@/app/actions/api_carts/deleteCarts";
import {
	Badge,
	Popover,
	PopoverContent,
	PopoverHandler,
	Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgShoppingCart, CgTrash } from "react-icons/cg";
import { getCartsJwt } from "../../actions/api_carts/getCarts";
import { useAuth } from "../../hooks/useAuth";
import type { ResponseCart } from "../../types";
import Counter from "./CounterinCart";

export default function IconCart() {
	const { jwt } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [carts, setCarts] = useState<ResponseCart | null>(null);
	const [quantity, setQuantity] = useState(1);

	const [openPopover, setOpenPopover] = useState(false);
	const handleMouseEnter = () => setOpenPopover(true);
	const handleMouseLeave = () => setOpenPopover(false);
	const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

	const handleQuantityChange = (productId: number, newQuantity: number) => {
		setQuantities((prevQuantities) => ({
			...prevQuantities,
			[productId]: newQuantity,
		}));
	};

	const countTotalQuantity = () => {
		let totalQuantity = 0;
		if (!carts) return;
		carts.data.forEach((item: { quantity: number }) => {
			totalQuantity += item.quantity;
		});
		return totalQuantity;
	};

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		if (carts) {
			carts.data.forEach((item) => {
				const productPrice = item.product_item.price;
				const quantity = quantities[item.id] || item.quantity;
				totalPrice += productPrice * quantity;
			});
		}
		return totalPrice.toLocaleString();
	};

	useEffect(() => {
		if (!carts) return;
		const initialQuantity = carts.data.length > 0 ? carts.data[0].quantity : 1;
		setQuantity(initialQuantity);
	}, [carts]);

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

	const handleDelete = (id: number) => {
		if (!jwt) return;
		deleteCart(id, jwt);
	};

	return (
		<div>
			<Popover open={openPopover} handler={setOpenPopover}>
				<PopoverHandler
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div className="mr-5 -mb-2 cursor-pointer">
						<Link href="/cart">
							<Badge content={countTotalQuantity()} withBorder>
								<CgShoppingCart className="h-8 w-8 text-white" />
							</Badge>
						</Link>
					</div>
				</PopoverHandler>
				<PopoverContent
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className="z-50 fixed h-[500px] lg:w-[400px] md:w-[320px] sm:w-[320px] overflow-auto resize-none"
					placeholder=""
					onPointerEnterCapture={() => {}}
					onPointerLeaveCapture={() => {}}
				>
					{isLoggedIn ? (
						<>
							{carts?.data.map((item) => (
								<div className="flex mb-3" key={item.id}>
									<img
										alt="ecommerce"
										className="block object-cover object-center w-[27%] h-[27%]"
										src={item.product_item.image[0].formats.thumbnail.url}
									/>

									<div className="p-2 w-full">
										<Typography
											color="blue-gray"
											className="text-sm font-bold"
											placeholder=""
											onPointerEnterCapture={() => {}}
											onPointerLeaveCapture={() => {}}
										>
											<span className=" line-clamp-1 w-[200px]">
												{item.product_item.name}
											</span>
										</Typography>

										<div className="flex">
											<Typography
												color="blue-gray"
												className="text-sm mt-2"
												placeholder=""
												onPointerEnterCapture={() => {}}
												onPointerLeaveCapture={() => {}}
											>
												{item.product_item.price.toLocaleString()}đ
											</Typography>
											<CgTrash
												onClick={() => handleDelete(item.id)}
												className="text-sm ml-auto text-red-500 h-6 w-6 cursor-pointer mt-3"
											/>
										</div>
										<Counter
											cartId={item.id}
											quantity={quantities[item.id] || item.quantity}
											onQuantityChange={(newQuantity: number) =>
												handleQuantityChange(item.id, newQuantity)
											}
											productitem={item.product_item.id}
										/>
										<Typography
											color="blue-gray"
											className="text-sm font-bold mt-3 text-black flex justify-end"
											placeholder=""
											onPointerEnterCapture={() => {}}
											onPointerLeaveCapture={() => {}}
										>
											Tổng:{" "}
											{(
												item.product_item.price *
												(quantities[item.id] || item.quantity)
											).toLocaleString()}
											đ
										</Typography>
									</div>
								</div>
							))}
						</>
					) : (
						<div>
							<h3 className="px-4 py-3 text-center text-red-600 font-semibold">
								Vui lòng đăng nhập để có thể thêm sản phẩm vào giỏ hàng!
							</h3>
						</div>
					)}
					<div className="mt-3 justify-center gap-8 border-t border-blue-50 pt-4">
						<Typography
							className="flex  gap-2 text-sm font-bold text-red-600 text-center"
							placeholder=""
							onPointerEnterCapture={() => {}}
							onPointerLeaveCapture={() => {}}
						>
							Tổng tiền: {calculateTotalPrice()}đ
						</Typography>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
