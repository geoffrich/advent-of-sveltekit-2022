import type { PageLoad } from './$types';
import seedrandom from 'seedrandom';
import { hydrated } from '$lib/hydrated';

export const load: PageLoad = async ({ fetch }) => {
	let seed: string;
	if (hydrated) {
		// after hydration, just return the seed directly instead of fetching
		// we can't use browser because that will be true when the load function is run the second time after SSR
		// alternatively, could just prerender, though that will lock in a single random seed.
		seed = new Date().getTime().toString();
	} else {
		// we need to fetch the seed for SSR so that it is stable between server render and hydration
		// SvelteKit caches the result of fetch, so it will be the same value
		// we could put this in a +page.server.js, but then we couldn't skip the network call on client-side navigations
		seed = await fetch('/day/11').then((n) => n.text());
	}
	return {
		rng: seedrandom(seed)
	};
};
