export const URL_API = "http://localhost:1337";

export type ResponseAuth = {
	jwt: string;
	user: User;
};

export type ResponseError = {
	data: string;
	error: {
		status: number;
		name: string;
		message: string;
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
		details: {};
	};
};

export type ResponseCart = {
	data: [
		{
			id: number;
			quantity: number;
			product_item: ProductItemsCart;
		},
	];
	error: {
		status: number;
		name: string;
		message: string;
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
		details: {};
	};
};

export type ResponseOrder = {
	data: [
		{
			id: number;
			total: number;
			status: string;
			createdAt: string;
			order_lines: [Order_line];
		},
	];
};

export type Order_line = {
	id: number;
	price: number;
	quantity: number;
	product_item: ProductItemsCart;
};

export type ResponseDiscount = {
	data: [
		{
			id: number;
			discount_code: string;
			discount_amount: number;
			expiration_date: Date;
			type: string;
			products: [
				{
					id: number;
					name: string;
				},
			];
		},
	];
};

export type GetAccessTokenResponse = {
	jwt: string;
	user: User;
};

export type User = {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	phone: string | null;
};

export type ResponseListingProduct = {
	data: Product[];
	meta: { pagination: Pagination };
};

export type ResponseProductDetails = {
	data: ProductDetails;
	meta: { pagination: Pagination };
};

export type ProductDetails = {
	id: number;
	attributes: {
		name: string;
		description: string;
		attributes: object;
		brand: { data: Brand };
		category: { data: Category };
		image: { data: Image };
		product_items: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			id(jwt: string, quantity: number, id: any): unknown;
			data: ProductItems[];
		};
	};
};
export type ProductItemsCart = {
	id: number;
	price: number;
	name: string;
	product: {
		id: number;
	};
	image: [
		{
			formats: {
				small: ImageFormats;
				medium: ImageFormats;
				thumbnail: ImageFormats;
			};
		},
	];
};

export type ProductItems = {
	id: number;
	attributes: {
		name: string;
		price: number;
		quantity: number;
		image: { data: Image[] };
		product_config: { data: ProductConfig[] };
	};
};

export type ProductConfig = {
	id: number;
	attributes: {
		value: string;
		variation: {
			data: {
				id: number;
				attributes: {
					name: string;
				};
			};
		};
	};
};

export type Product = {
	id: number;
	attributes: {
		name: string;
		physical_product: boolean;
		featured: string;
		category: { data: Category };
		brand: { data: Brand };
		product_items: { data: ProductItems[] };
		image: { data: Image };
	};
};

export type Category = {
	id: number;
	attributes: {
		name: string;
		locale: string;
		parent_category: Category;
		variations: { data: Variation[] };
	};
};

export type Variation = {
	id: number;
	attributes: {
		name: string;
		variation_options: { data: VariationOptions[] };
	};
};

export type VariationOptions = {
	id: number;
	attributes: {
		value: string;
	};
};

export type Brand = {
	id: number;
	attributes: {
		name: string;
	};
};

export type Discount = {
	id: number;
	attributes: {
		discount_code: string;
		discount_amount: number;
	};
};

export type Image = {
	id: number;
	attributes: {
		name: string;
		url: string;
		formats: {
			small: ImageFormats;
			medium: ImageFormats;
			thumbnail: ImageFormats;
		};
	};
};

export type ImageFormats = {
	url: string;
	name: string;
	width: number;
	height: number;
};

export type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

export type Gallery = {
	id: number;
	imgUrl: string;
};

export type SearchParams = {
	query?: string;
	minPrice?: number;
	maxPrice?: number;
	brand?: number;
	categories?: number[];
	stars?: number;
	attribute?: string;
	sort?: number;
};
