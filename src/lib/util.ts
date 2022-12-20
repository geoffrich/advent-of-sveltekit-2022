import { goto } from '$app/navigation';

// the SvelteKit router will handle this automatically, but we'll implement ourselves so we can use `replaceState`
// alternatively, don't handle the submit and accept the new history entries and focus reset
// https://kit.svelte.dev/docs/form-actions#get-vs-post
export function submitReplaceState(e: SubmitEvent) {
	const form = e.target as HTMLFormElement;
	const url = new URL(form.action);
	// @ts-expect-error
	const params = new URLSearchParams(new FormData(form));
	url.search = params.toString();
	goto(url, { replaceState: true, keepFocus: true });
}
