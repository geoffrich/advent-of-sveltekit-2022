import { fail, redirect, type Cookies } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z, ZodError } from 'zod';
import { faker } from '@faker-js/faker';
import { getNamesFromCookie, hasDuplicateNames, Name, Names } from './util';

export const load: PageServerLoad = ({ cookies }) => {
	let names = getNamesFromCookie(cookies);

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
		let names = getNamesFromCookie(cookies);
		const nextId = Math.max(...names.map((n) => n.id)) + 1;

		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		try {
			const parsed = Name.parse({ name, email });
			// add at front to get visible feedback
			names.unshift({ ...parsed, id: nextId });
		} catch (e) {
			return fail(400, {
				error: e instanceof ZodError ? e.errors[0].message : 'Something went wrong',
				name,
				email
			});
		}

		if (hasDuplicateNames(names)) {
			return fail(400, {
				error: 'Name already exists',
				name,
				email
			});
		}

		setNames(cookies, names);
		throw redirect(302, '/day/14');
	},
	delete: async ({ request, cookies }) => {
		// await new Promise((res) => setTimeout(res, 500));
		let names = getNamesFromCookie(cookies);

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

function setNames(cookies: Cookies, names: z.infer<typeof Names>) {
	cookies.set('names', JSON.stringify(names));
}
