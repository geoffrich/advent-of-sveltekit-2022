import type { FormattersInitializer } from 'typesafe-i18n';
import { date } from 'typesafe-i18n/formatters';
import type { Locales, Formatters } from './i18n-types';

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {
	const formatters: Formatters = {
		// add your formatter functions here
		fullDay: date(locale, { dateStyle: 'full' })
	};

	return formatters;
};
