import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';

import type { PageLoad } from './$types';
import { baseLocale } from '$i18n/i18n-util.js';

// based on https://github.com/ivanhofer/typesafe-i18n-demo-sveltekit example
// not using layout loads because I only need it at this route
export const load: PageLoad = async () => {
	await loadLocaleAsync(baseLocale);
	setLocale(baseLocale);
};
