import type { LayoutLoad } from './$types';
import seedrandom from 'seedrandom';

export const load: LayoutLoad = ({ data }) => {
	return {
		// expose random number generator to be used in Day 11
		// we generate the seed on the server because the universal load runs twice
		rng: seedrandom(data.seed.toString())
	};
};
