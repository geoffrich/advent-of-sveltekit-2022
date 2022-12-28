import type { PageServerLoad } from './$types';
import { getNamesFromCookie, Names, Name } from '../util';
import type { z } from 'zod';
import shuffle from 'just-shuffle';

const DATA_KEY = 'app:match';

export const load: PageServerLoad = async ({ cookies, depends }) => {
	const names = getNamesFromCookie(cookies);

	// allow invalidating only this load function
	depends(DATA_KEY);
	return {
		matches: getSecretSantaPairs(names),
		key: DATA_KEY
	};
};

interface SecretSantaMatch {
	giver: z.infer<typeof Name>;
	receiver: z.infer<typeof Name>;
	id: number;
}

function getSecretSantaPairs(names: z.infer<typeof Names>): SecretSantaMatch[] {
	// shuffleAll should guarantee every item is in a new position
	const shuffled = shuffle(names, { shuffleAll: true });
	return names.map((name, idx) => ({ giver: name, receiver: shuffled[idx], id: shuffled[idx].id }));
}
