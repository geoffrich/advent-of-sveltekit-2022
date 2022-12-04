import type { PageServerLoad } from './$types';
import { zonedTimeToUtc } from 'date-fns-tz';

// https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-timezone
const TZ_HEADER = 'x-vercel-ip-timezone';

export const load: PageServerLoad = ({ request }) => {
	const timezone = request.headers.get(TZ_HEADER) ?? 'America/Los_Angeles';
	// get the current date in the timezone of the requester
	const localDateTime = new Date().toLocaleString('en-US', { timeZone: timezone });
	// get Christmas in the local time and convert to UTC
	const targetDateTime = zonedTimeToUtc('2022-12-25 00:00:00', timezone);

	return {
		// tried returning dates, but something got lost over the wire
		date: new Date(localDateTime).getTime(),
		target: new Date(targetDateTime).getTime(),
		timezone
	};
};
