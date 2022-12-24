import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const stepParam = url.searchParams.get('nstep') ?? url.searchParams.get('step') ?? '1';
	const numPresentsParam = url.searchParams.get('presents') ?? '22';
	const numPresents = +numPresentsParam;
	const step = Math.min(+stepParam, numPresents - 1);
	let presents: boolean[] = Array(numPresents).fill(false);

	// there's probably a more efficient way
	// ¯\_(ツ)_/¯
	let pIdx = 1;
	for (let i = 0; i < step; i++) {
		let eliminated = pIdx % presents.length;
		while (presents[eliminated] && eliminated < presents.length) {
			eliminated = (eliminated + 1) % presents.length;
		}
		presents[eliminated] = true;
		pIdx += 2;
	}

	return {
		presents,
		step
	};
};
