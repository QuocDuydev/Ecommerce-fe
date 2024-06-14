"use client";

import { PostCheckOut } from "@/app/actions/PostCheckOut";
import { PostUserAddress } from "@/app/actions/PostUserAddress";
import Failure from "@/app/components/message/failure";
import Success from "@/app/components/message/success";
import { useAuth } from "@/app/hooks/useAuth";
import { useVoucher } from "@/app/hooks/useDiscount";
import type { ResponseCart } from "@/app/types";
import { useState } from "react";
interface CartItemProps {
	carts: ResponseCart | undefined;
}
export default function CheckOutForm({ carts }: CartItemProps) {
	const { jwt } = useAuth();
	const { voucher, clearVoucher } = useVoucher();
	const [showBill, setShowBill] = useState(false);
	const [postSuccess, setPostSuccess] = useState(false);
	const [postFailure, setFailure] = useState(false);
	const [checkoutInfo, setCheckOutInfo] = useState({
		name: "",
		address: "",
		country: "",
		city: "",
		phone: 0,
		postal_code: 0,
	});

	const handleConfirmPayment = () => {
		setShowBill(true);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCheckOutInfo({ ...checkoutInfo, [name]: value });
	};
	const handleMessage = () => {
		window.location.href = "/order";
	};

	const handlePostCheckOut = async () => {
		try {
			if (!jwt) return;
			if (carts?.data && carts.data.length > 0 && voucher) {
				const orderLineData = carts?.data.map((item) => ({
					quantity: item.quantity,
					product_item: item.product_item.id,
					price: item.product_item.price,
					discount_code: voucher.id,
				}));

				// Sử dụng voucher.id ở đây
				await PostCheckOut(jwt, orderLineData);
				setShowBill(false);
				setPostSuccess(true);
				clearVoucher();
			} else if (carts?.data && carts.data.length > 0 && !voucher) {
				const orderLineData = carts?.data.map((item) => ({
					quantity: item.quantity,
					product_item: item.product_item.id,
					price: item.product_item.price,
					discount_code: 0,
				}));

				// Sử dụng voucher.id ở đây
				await PostCheckOut(jwt, orderLineData);
				setShowBill(false);
				setPostSuccess(true);
			}
		} catch (error) {
			setShowBill(false);
			setFailure(true);
		}
	};

	const handlePostAddress = async () => {
		if (!jwt) return;
		try {
			await PostUserAddress(
				jwt,
				checkoutInfo.address,
				checkoutInfo.city,
				checkoutInfo.country,
				checkoutInfo.phone,
				checkoutInfo.postal_code,
			);
		} catch (error) {}
	};
	const handleCombinedActions = () => {
		if (
			checkoutInfo.name &&
			checkoutInfo.address &&
			checkoutInfo.city &&
			checkoutInfo.country &&
			checkoutInfo.phone &&
			checkoutInfo.postal_code
		) {
			handlePostAddress();
			handlePostCheckOut();
		} else {
			console.log("Missing shipping information");
			alert("Please provide shipping information");
			setFailure(true);
		}
	};
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
	return (
		<>
			{postSuccess && (
				<>
					<Success message="Checkout" handleMessage={handleMessage} />
				</>
			)}
			{postFailure && (
				<>
					<Failure message="Checkout" handleMessage={handleMessage} />
				</>
			)}
			<div className="text-center max-lg:hidden">
				<h2 className="text-3xl font-extrabold text-[#f58255] inline-block border-b-4 border-[#333] pb-1">
					Checkout
				</h2>
			</div>
			<form className="lg:mt-12">
				<div>
					<h2 className="text-2xl font-extrabold text-[#f58255]">
						Shipping info
					</h2>
					<div className="grid grid-cols-2 gap-6 mt-8">
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="text"
							name="address"
							placeholder="Address"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="text"
							placeholder="City"
							name="city"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="text"
							placeholder="Country"
							name="country"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="number"
							placeholder="Phone number"
							name="phone"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="number"
							placeholder="Postal code"
							name="postal_code"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
					</div>
					<div className="flex flex-wrap gap-4 mt-8 justify-center">
						<button
							type="button"
							className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
						>
							Back
						</button>
						<button
							type="button"
							className="min-w-[150px] px-6 py-3.5 text-sm bg-[#f58255] text-white rounded-md hover:bg-[#111]"
							onClick={handleConfirmPayment}
						>
							Confirm payment{" "}
						</button>
					</div>
				</div>
			</form>

			{showBill && (
				<div
					className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
					onClick={() => setShowBill(false)}
				>
					<div
						className="absolute bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8 flex flex-col"
						style={{ width: "500px", maxHeight: "80vh" }}
						onClick={(e) => e.stopPropagation()}
					>
						<h1 className="font-bold text-2xl my-4 text-center text-blue-600">
							E-commerce Services
						</h1>
						<hr className="mb-2" />
						<div className="overflow-y-auto ">
							<div className="flex justify-between mb-6">
								<h1 className="text-lg font-bold">Invoice</h1>
								<div className="text-gray-700">
									<div>Date: {new Date(Date.now()).toLocaleDateString()}</div>
								</div>
							</div>
							<div className="mb-8">
								<h2 className="text-lg font-bold mb-4">Bill To:</h2>
								<div className="text-gray-700 mb-2">
									<span>Name:</span>
									{"  "}
									{checkoutInfo.name}
								</div>
								<div className="text-gray-700 mb-2">
									<span>Address:</span>
									{"  "}
									{checkoutInfo.address}
								</div>
								<div className="text-gray-700 mb-2">
									<span>City:</span>
									{"  "}
									{checkoutInfo.city}
								</div>
								<div className="text-gray-700 mb-2">
									<span>Country:</span>
									{"  "}
									{checkoutInfo.country}
								</div>
								<div className="text-gray-700 mb-2">
									<span>Phone:</span>
									{"  "}
									{checkoutInfo.phone}
								</div>
								<div className="text-gray-700">
									<span>Postalcode:</span>
									{"  "}
									{checkoutInfo.postal_code}
								</div>
							</div>
							<table className="w-full mb-8">
								<thead>
									<tr>
										<th className="text-left font-bold text-gray-700">
											Description
										</th>
										<th className="text-right font-bold text-gray-700">
											Amount
										</th>
									</tr>
								</thead>
								<tbody>
									{carts?.data.map((item) => (
										<tr key={item.product_item.id}>
											<td className="text-left text-gray-700">
												{item.product_item.name}{" "}
											</td>
											<td className="text-right text-gray-700">
												{
													// Check if voucher is applied
													// biome-ignore lint/complexity/useOptionalChain: <explanation>
													(voucher &&
													voucher.products &&
													voucher.products.some(
														(product) =>
															(product as { id: number }).id ===
															item.product_item.product.id,
													)
														? // Calculate price after discount
															voucher.type === "percentage"
															? item.product_item.price *
																(1 - voucher.amount) *
																item.quantity // Percentage discount
															: item.product_item.price * item.quantity -
																voucher.amount // Fixed amount discount
														: // If voucher not applied, display original price
															item.product_item.price * item.quantity
													).toLocaleString()
												}{" "}
												đ
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<td className="text-left font-bold text-gray-700">Total</td>
										<td className="text-right font-bold text-gray-700">
											{calculateTotalPrice().toLocaleString()}đ đ
										</td>
									</tr>
								</tfoot>
							</table>
						</div>

						<div className="text-gray-700 text-sm text-center">
							Have you confirmed checkout for this order?
						</div>
						<div className="btn-bill flex justify-between">
							<button
								className="bg-[#f58255] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => setShowBill(false)}
							>
								Cancel
							</button>
							<button
								className="bg-[#f58255] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={handleCombinedActions}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
