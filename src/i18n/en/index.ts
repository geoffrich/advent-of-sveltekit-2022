import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	language: 'English',
	happyHolidays: 'Happy Holidays!',
	christmasIsComing: '{ date|fullDay } is in { time }',
	day: '{{ one day | ?? days}}' // not sure if there's a way to name this parameter
};

export default en;
