import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		seed: new Date().getTime()
	};
};
