import type { Actions } from './$types';
import { z, ZodError } from 'zod';

// overkill, but wanted to give zod a try
const schema = z.string().min(2).max(10);

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			let data = await request.formData();
			let guess = data.get('guess');
			const parsed = schema.parse(guess);
			const isCorrect = parsed.toLowerCase() === 'geoff' || parsed.toLowerCase() === 'geoff rich';
			return {
				success: isCorrect,
				error: isCorrect ? null : "Sorry, that's not right."
			};
		} catch (e) {
			if (e instanceof ZodError) {
				return {
					error: e.errors[0].message
				};
			}
		}
	}
};
