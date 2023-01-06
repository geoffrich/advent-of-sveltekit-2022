import type { PageServerLoad } from './$types';
import dateFnsTz from 'date-fns-tz';

const { zonedTimeToUtc } = dateFnsTz;

// https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-timezone
const TZ_HEADER = 'x-vercel-ip-timezone';

export const load: PageServerLoad = ({ request }) => {
	const timezone = request.headers.get(TZ_HEADER) ?? 'America/Los_Angeles';
	// get Christmas in the local time and convert to UTC
	// technically this will be wrong the last week of the year but ¯\_(ツ)_/¯
	const targetDateTime = zonedTimeToUtc(`${new Date().getFullYear()}-12-25 00:00:00`, timezone);

	return {
		target: targetDateTime
	};
};
