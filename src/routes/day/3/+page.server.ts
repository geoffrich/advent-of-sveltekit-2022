import type { PageServerLoad } from './$types';

const TZ_HEADER = 'x-vercel-ip-timezone';

export const load: PageServerLoad = ({ request }) => {
	const timezone = request.headers.get(TZ_HEADER) ?? 'America/New_York';
	// get the current date in the timezone of the requester
	const localDateTime = new Date().toLocaleString('en-US', { timeZone: timezone });
	return {
		date: new Date(localDateTime),
		timezone
	};
};
