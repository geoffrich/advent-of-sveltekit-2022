import type { PageServerLoad } from './$types';

// https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-timezone
const TZ_HEADER = 'x-vercel-ip-timezone';

export const load: PageServerLoad = ({ request }) => {
	const timezone = request.headers.get(TZ_HEADER) ?? 'America/Los_Angeles';
	// get the current date in the timezone of the requester
	const localDateTime = new Date().toLocaleString('en-US', { timeZone: timezone });
	const targetDateTime = new Date(2022, 11, 25).toLocaleString('en-US', { timeZone: timezone });
	return {
		date: new Date(localDateTime),
		target: new Date(targetDateTime),
		timezone
	};
};
