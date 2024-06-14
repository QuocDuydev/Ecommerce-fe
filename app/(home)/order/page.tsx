"use client";
import { getOrders } from "@/app/actions/getOrders";
import { updateOrder } from "@/app/actions/updateOrder";
import Failure from "@/app/components/message/failure";
import Success from "@/app/components/message/success";
import { useAuth } from "@/app/hooks/useAuth";
import type { ResponseOrder } from "@/app/types";
import { useEffect, useState } from "react";
export default function OrderPage() {
	const [order, setOrders] = useState<ResponseOrder | undefined>();
	const [postSuccess, setPostSuccess] = useState(false);
	const [postError, setError] = useState(false);
	const { jwt } = useAuth();
	useEffect(() => {
		if (!jwt) return;
		getOrders(jwt)?.then((res) => {
			setOrders(res);
		});
	}, [jwt]);

	const handleCancel = async (id: number) => {
		if (!jwt) return;
		try {
			const response = await updateOrder(id, jwt, "canceled");
			setPostSuccess(true);
		} catch (error) {
			setError(true);
		}
	};
	const handleMessage = () => {
		window.location.reload();
	};
	return (
		<>
			{postSuccess && (
				<>
					<Success message="Cancel" handleMessage={handleMessage} />
				</>
			)}
			{postError && (
				<>
					<Failure message="Cancel" handleMessage={handleMessage} />
				</>
			)}
			<div className="bg-white">
				<main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
					<h1 className="text-2xl text-center font-bold tracking-tight text-[#f58255] sm:text-3xl">
						Order history
					</h1>

					<section aria-labelledby="recent-heading" className="mt-16">
						<h2 id="recent-heading" className="sr-only">
							Recent orders
						</h2>
						<div className="space-y-20">
							{order?.data.map((item) => (
								<div key={item.id}>
									<div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
										<dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
											<div className="flex justify-between sm:block">
												<dt className="font-medium text-gray-900">
													Date Order
												</dt>

												<dd className="sm:mt-1">
													<time dateTime="2021-01-22">
														{item.createdAt.split("T")[0]}
													</time>
												</dd>
											</div>
											<div className="flex justify-between pt-6 sm:block sm:pt-0">
												<dt className="font-medium text-gray-900">
													Order number
												</dt>
												<dd className="sm:mt-1">{item.id}</dd>
											</div>

											<div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
												<dt>Total amount</dt>
												<dd className="sm:mt-1">
													{item.total.toLocaleString()}đ
												</dd>
											</div>
											<div className="flex justify-between pt-6 sm:block sm:pt-0">
												<dt className="font-medium text-gray-900">Status</dt>
												<dd className="sm:mt-1"> {item.status}</dd>
											</div>
										</dl>
										<div className="flex">
											<button className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#f58255] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto p-2">
												View Bill
												<span className="sr-only">for order WU88191111</span>
											</button>
											{item.status !== "canceled" && (
												<button
													onClick={() => handleCancel(item.id)}
													className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#f58255] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto p-2"
												>
													Cancel
												</button>
											)}
										</div>
									</div>

									<table className="mt-4 w-full text-gray-500 sm:mt-6">
										<caption className="sr-only">Products</caption>
										<thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
											<tr>
												<th
													scope="col"
													className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
												>
													Product
												</th>
												<th
													scope="col"
													className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
												>
													Price
												</th>
												<th
													scope="col"
													className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
												>
													Quantity
												</th>
												{/* <th
													scope="col"
													className="hidden py-3 pr-8 font-normal sm:table-cell"
												>
													Status
												</th> */}

												<th
													scope="col"
													className="w-0 py-3 text-right font-normal"
												>
													Info
												</th>
											</tr>
										</thead>
										{item.order_lines.map((items) => (
											<tbody
												className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
												key={items.id}
											>
												<tr>
													<td className="py-6 pr-8">
														<div className=" flex items-center">
															<img
																src={
																	items.product_item.image[0].formats.thumbnail
																		.url
																}
																alt="Black tee with intersecting red, white, and green curved lines on front."
																className="mr-6 h-16 w-16 rounded object-cover object-center"
															/>

															<div>
																<div className="font-medium text-gray-900">
																	{items.product_item.name}
																</div>
																<div className="mt-1 sm:hidden">
																	{items.product_item.price}
																</div>
															</div>
														</div>
													</td>

													<td className="hidden py-6 pr-8 sm:table-cell">
														{items.price.toLocaleString()}đ
													</td>

													<td className="hidden py-6 pr-8 sm:table-cell">
														{items.quantity}
													</td>

													{/* <td className="hidden py-6 pr-8 sm:table-cell">
														{item.status}
													</td> */}

													<td className="whitespace-nowrap py-6 text-right font-medium">
														<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
															<a
																href={`/product/${items.product_item.id}`}
																className="text-[#f58255]"
															>
																View
																<span className="hidden lg:inline">
																	{" "}
																	Product
																</span>
																<span className="sr-only">
																	, Men's 3D Glasses Artwork Tee
																</span>
															</a>
														</button>
													</td>
												</tr>
											</tbody>
										))}
									</table>
								</div>
							))}
						</div>
					</section>
				</main>
			</div>
		</>
	);
}
