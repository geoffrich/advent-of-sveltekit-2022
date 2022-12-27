import { fail, redirect, type Cookies } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z, ZodError } from 'zod';
import { faker } from '@faker-js/faker';
import { getNamesFromCookie, hasDuplicateNames, Name, Names } from './util';

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
		try {
			const parsed = Name.parse({ name, email });
			names.push({ ...parsed, id: id++ });
		} catch (e) {
			if (e instanceof ZodError) {
				return fail(400, {
					error: e.errors[0].message
				});
			}
			return fail(500, {
				error: 'Something went wrong'
			});
		}

		if (hasDuplicateNames(names)) {
			return fail(400, {
				error: 'Name already exists'
			});
		}

		setNames(cookies, names);
		throw redirect(302, '/day/14');
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
		throw redirect(302, '/day/14');
	},
	reset: async ({ cookies }) => {
		cookies.delete('names');
		throw redirect(302, '/day/14');
	}
};

let id = 6;

const DEFAULT_NAMES = [
	{ name: 'Kevin McCallister', email: 'kevin@homealone.com', id: 1 },
	{ name: 'John McClane', email: 'john@yippeekiyay.com', id: 2 },
	{ name: 'Clark Griswold', email: 'clark@lastfamilyman.com', id: 3 },
	{ name: 'The Grinch', email: 'grinch@mountcrumpit.com', id: 4 },
	{ name: 'Marvin Merchants', email: 'marvin@stickybandits.com', id: 5 }
];

function setNames(cookies: Cookies, names: z.infer<typeof Names>) {
	cookies.set('names', JSON.stringify(names));
}
