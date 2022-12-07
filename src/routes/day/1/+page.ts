import type { PageLoad } from './$types';
import type { ProductsResult } from '$lib/types';

export const load: PageLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q') ?? '';
	const skip = url.searchParams.get('skip') ?? '0';
	const search = new URLSearchParams({ q: query, skip, select: 'title,price,id', limit: '30' });
	// API doc: https://dummyjson.com/docs/products
	try {
		if (query === 'bad') {
			throw Error('argh'); // demonstrate error handling
		}
		const result: ProductsResult = query
			? await fetch(`https://dummyjson.com/products/search?${search.toString()}`).then((res) =>
					res.json()
			  )
			: null;
		return {
			result,
			query
		};
	} catch (e) {
		return {
			result: null,
			query,
			error: 'Could not retrieve products'
		};
	}
};
