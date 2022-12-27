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

	return undefined;
}

export const Name = z.object({
	name: z.string(),
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
