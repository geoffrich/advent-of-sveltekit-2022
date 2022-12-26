import type { Cookies } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { faker } from '@faker-js/faker';

export const load: PageServerLoad = ({ cookies }) => {
	let names = getNamesFromCookie(cookies);
	if (!names) {
		setNames(cookies, DEFAULT_NAMES);
		names = DEFAULT_NAMES;
	}

	return {
		names,
		fake: {
			name: faker.name.fullName(),
			email: faker.internet.email()
		}
	};
};

export const actions: Actions = {
	add: async ({ request, cookies }) => {
		// uncomment to test race conditions
		// await new Promise((res) => setTimeout(res, 500));
		let names = getNamesFromCookie(cookies) ?? DEFAULT_NAMES;

		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		// TODO: error handling
		const parsed = Name.parse({ name, email });
		names.push({ ...parsed, id: id++ });
		setNames(cookies, names);
	},
	delete: async ({ request, cookies }) => {
		// TODO: try with delay
		// optimistic UI
		let names = getNamesFromCookie(cookies) ?? DEFAULT_NAMES;

		const data = await request.formData();
		const id = z.coerce.number().parse(data.get('id'));

		const toRemove = names.findIndex((n) => n.id === id);
		names.splice(toRemove, 1);
		setNames(cookies, names);
	},
	reset: async ({ request, cookies }) => {
		cookies.delete('names');
	}
};

let id = 6;

const Name = z.object({
	name: z.string(),
	email: z.string().email()
});

const Names = z.array(
	Name.extend({
		id: z.number()
	})
);

const DEFAULT_NAMES = [
	{ name: 'Kevin McCallister', email: 'kevin@homealone.com', id: 1 },
	{ name: 'John McClane', email: 'john@yippeekiyay.com', id: 2 },
	{ name: 'Clark Griswold', email: 'clark@lastfamilyman.com', id: 3 },
	{ name: 'The Grinch', email: 'grinch@mountcrumpit.com', id: 4 },
	{ name: 'Marvin Merchants', email: 'marvin@stickybandits.com', id: 5 }
];

function getNamesFromCookie(cookies: Cookies) {
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

function setNames(cookies: Cookies, names: z.infer<typeof Names>) {
	cookies.set('names', JSON.stringify(names));
}
