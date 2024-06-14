import getListingProductWithFilter from "@/app/actions/getListingProductWithFilter";
import Loader from "@/app/components/Loader";
import type { SearchParams } from "@/app/types";
import qs from "qs";
import { Suspense } from "react";
import { ProductClientPage } from "./ProductClient";
import { ProductFilterStatic } from "./ProductFilterStatic";
import { ProductItems } from "./ProductItems";

interface ProductsPageProps {
	searchParams?: string;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
	const parsedParams: SearchParams = qs.parse(searchParams ?? "") as any;
	const products = await getListingProductWithFilter({
		page: 1,
		pageSize: 10,
		query: parsedParams?.query,
		minPrice: parsedParams?.minPrice,
		maxPrice: parsedParams?.maxPrice,
		brand: parsedParams?.brand,
		categories: parsedParams?.categories,
		stars: parsedParams?.stars,
		attribute: parsedParams?.attribute,
	});

	return (
		<Suspense fallback={<Loader />}>
			<div className="flex gap-5 pt-4">
				<ProductClientPage />
				<div className="flex flex-col gap-4 w-full">
					<ProductFilterStatic meta={products.meta.pagination} />
					{parsedParams?.query && (
						<div>
							<span>Kết quả tìm kiếm cho từ khoá `{parsedParams.query}`</span>
						</div>
					)}
					<div>
						<span>Có {products.meta.pagination.total} kết quả tìm kiếm</span>
					</div>
					<ProductItems products={products} />
				</div>
			</div>
		</Suspense>
	);
};

export default ProductsPage;
