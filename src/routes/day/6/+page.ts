import type { PageLoad } from './$types';
import type { ProductsResult } from '$lib/types';

export const load: PageLoad = async () => {
	// https://dummyjson.com/docs/products
	const result: ProductsResult = await fetch('https://dummyjson.com/products').then((res) =>
		res.json()
	);
	return { ...result };
};
