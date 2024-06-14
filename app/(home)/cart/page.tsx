import Loader from "@/app/components/Loader";
import React, { Suspense } from "react";
import ListCart from "../../components/cart/ListCart";

const CartPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<div>
				<ListCart />
			</div>
		</Suspense>
	);
};

export default CartPage;
