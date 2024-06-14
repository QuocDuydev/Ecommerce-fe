import ProductCard from "@/app/components/product/ProductCard";
import type { ResponseListingProduct } from "@/app/types";

export const ProductItems = ({
	products,
}: { products: ResponseListingProduct }) => {
	return (
		<div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
			{products.data.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};
