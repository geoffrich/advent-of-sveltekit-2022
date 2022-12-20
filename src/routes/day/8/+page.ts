import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';

import type { PageLoad } from './$types';
import { baseLocale } from '$i18n/i18n-util.js';
import type { Locales } from '$i18n/i18n-types';

const locales: Locales[] = ['en', 'de', 'ja-JP'];

// based on https://github.com/ivanhofer/typesafe-i18n-demo-sveltekit example
// not using layout loads because I only need it at this route
export const load: PageLoad = async ({ data, url }) => {
	let locale = (url.searchParams.get('locale') as Locales) ?? baseLocale;
	if (!locales.includes(locale)) {
		locale = baseLocale;
	}
	const nextLocaleIdx = (locales.indexOf(locale) + 1) % locales.length;
	await loadLocaleAsync(locale);
	setLocale(locale);
	return {
		...data,
		locale,
		nextLocale: locales[nextLocaleIdx]
	};
};
