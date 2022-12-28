import { z } from 'zod';
import type { Cookies } from '@sveltejs/kit';

export function getNamesFromCookie(cookies: Cookies) {
	const names = cookies.get('names');
	if (names) {
		try {
			const parsed = Names.parse(JSON.parse(names));
			return parsed;
		} catch (e) {
			console.error(e);
		}
	}

	return [
		{ name: 'Kevin McCallister', email: 'kevin@homealone.com', id: 1 },
		{ name: 'John McClane', email: 'john@yippeekiyay.com', id: 2 },
		{ name: 'Clark Griswold', email: 'clark@lastfamilyman.com', id: 3 },
		{ name: 'The Grinch', email: 'grinch@mountcrumpit.com', id: 4 },
		{ name: 'Marvin Merchants', email: 'marvin@stickybandits.com', id: 5 }
	];
}

export const Name = z.object({
	name: z.string().min(1),
	email: z.string().email()
});

export const Names = z.array(
	Name.extend({
		id: z.number()
	})
);

export function hasDuplicateNames(names: z.infer<typeof Names>) {
	return new Set(names.map((n) => n.name)).size !== names.length;
}
