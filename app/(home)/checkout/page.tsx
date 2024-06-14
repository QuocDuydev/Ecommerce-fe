"use client";

import { getCartsJwt } from "@/app/actions/getCarts";
import Loader from "@/app/components/Loader";
import { useAuth } from "@/app/hooks/useAuth";
import type { ResponseCart } from "@/app/types";
import { useEffect, useState } from "react";
import React, { Suspense } from "react";
import CartItem from "./CartItems";
import CheckOutForm from "./CheckoutForm";

export default function CheckoutPage() {
	const [carts, setCarts] = useState<ResponseCart | undefined>();
	const { jwt } = useAuth();
	useEffect(() => {
		if (!jwt) return;
		getCartsJwt(jwt)?.then((res) => {
			setCarts(res);
		});
	}, [jwt]);

	return (
		<Suspense fallback={<Loader />}>
			<div className="font-[sans-serif] bg-white">
				<div className="max-lg:max-w-xl mx-auto w-full">
					<div className="grid lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
							<CheckOutForm carts={carts} />
						</div>
						<div className=" bg-gray-100 h-full">
							<CartItem carts={carts} />
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
