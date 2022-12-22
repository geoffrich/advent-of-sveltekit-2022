// this will be returned for non-html requests
// https://kit.svelte.dev/docs/routing#server-content-negotiation
export const GET = () => {
	const now = new Date().getTime();
	return new Response(now.toString());
};
