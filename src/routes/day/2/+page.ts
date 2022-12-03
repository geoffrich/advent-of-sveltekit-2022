import type { PageLoad } from './$types';

interface JokeResponse {
	error: boolean;
	setup: string;
	delivery: string;
	id: number;
}

export const load: PageLoad = async ({ fetch }) => {
	const { setup, delivery, id }: JokeResponse = await fetch(
		'https://v2.jokeapi.dev/joke/christmas'
	).then((r) => r.json());
	return {
		joke: {
			setup,
			delivery,
			id
		}
	};
};
