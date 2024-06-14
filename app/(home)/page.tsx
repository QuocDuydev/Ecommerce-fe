import getListingProduct from "@/app/actions/getListingProduct";
import ProductCard from "@/app/components/product/ProductCard";
import React, { Suspense } from "react";
import Banners from "@/app/components/banner/Banners";
import Loader from "../components/Loader";

const Home = async () => {
	const products = await getListingProduct();

	return (
		<div className="mt-4">
			<Suspense fallback={<Loader />}>
				<Banners />
			</Suspense>
			<div className="mt-5 grid gap-y-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
				<Suspense fallback={<Loader />}>
					{products.data.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Suspense>
			</div>
		</div>
	);
};

export default Home;
