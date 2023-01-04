import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const params = url.searchParams;
	const change = Number(params.get('change'));
	const current = Number(params.get('current'));

	return {
		change,
		current
	};
};
