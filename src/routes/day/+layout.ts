import type { LayoutLoad } from './$types';
import { days } from '$lib/days';

// https://vitejs.dev/guide/features.html#glob-import
const globs = import.meta.glob(`./**/*.svelte`, { as: 'raw' });

export const load: LayoutLoad = async ({ url, route }) => {
	const segments = route.id?.split('/');
	const day = segments?.[segments.length - 1];

	let code: { filename: string; source: string }[] = [];
	const modules = Object.entries(globs)
		.filter(([k, v]) => k.startsWith(`./${day}`))
		.map(([k, v]) =>
			v().then((result) => {
				const segments = k.split('/');
				return { filename: segments[segments.length - 1], source: result };
			})
		);
	code = await Promise.all(modules);

	return {
		day: +day,
		code
	};
};
