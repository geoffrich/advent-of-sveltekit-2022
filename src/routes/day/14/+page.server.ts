import { fail, redirect, type Cookies } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z, ZodError } from 'zod';
import { faker } from '@faker-js/faker';
import { getNamesFromCookie, hasDuplicateNames, Name, Names, getDefaultNames } from './util';

export const load: PageServerLoad = ({ cookies }) => {
	let names = getNamesFromCookie(cookies) ?? getDefaultNames();

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
		let names = getNamesFromCookie(cookies) ?? getDefaultNames();
		const nextId = Math.max(...names.map((n) => n.id)) + 1;

		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		try {
			const parsed = Name.parse({ name, email });
			// add at front to get visible feedback
			names.unshift({ ...parsed, id: nextId });
		} catch (e) {
			if (e instanceof ZodError) {
				return fail(400, {
					error: e.errors[0].message,
					name,
					email
				});
			}
			return fail(500, {
				error: 'Something went wrong',
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
		let names = getNamesFromCookie(cookies);
		if (!names) {
			// need to return name/email to prevent type error
			// not sure if there's a more elegant way
			return fail(500, { error: 'No names to delete', name: '', email: '' });
		}

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
