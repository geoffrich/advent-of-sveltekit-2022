<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import debounce from 'just-debounce-it';
	import Spinner from './Spinner.svelte';
	import Products from './Products.svelte';
	export let data: PageData;

	let form: HTMLFormElement;
	// intentionally not reactive - we don't want to clobber the input on subsequent navigations
	let initialValue = data.query;

	const debouncedSubmit = debounce(() => {
		// not supported in all browsers
		if (typeof HTMLFormElement.prototype.requestSubmit == 'function') {
			form.requestSubmit();
		}
	}, 300);

	// the SvelteKit router will handle this automatically, but we'll implement ourselves so we can use `replaceState`
	// alternatively, don't handle the submit and accept the new history entries and focus reset
	// https://kit.svelte.dev/docs/form-actions#get-vs-post
	function handleSubmit(e: SubmitEvent) {
		const form = e.target as HTMLFormElement;
		const url = new URL(form.action);
		// @ts-expect-error
		const params = new URLSearchParams(new FormData(form));
		url.search = params.toString();
		goto(url, { replaceState: true, keepFocus: true });
	}

	$: isLoading = $navigating?.to?.url.pathname === $page.url.pathname;
</script>

<main>
	<h1>Gift Search Bar</h1>
	<form bind:this={form} on:submit|preventDefault={handleSubmit}>
		<label for="q">Query</label>
		<input
			id="q"
			type="text"
			name="q"
			placeholder="Start typing..."
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
			on:input={debouncedSubmit}
			value={initialValue}
		/>
		<div role="status" class="spin">
			{#if isLoading}
				<Spinner />
				<span class="visually-hidden">Loading...</span>
			{/if}
		</div>
	</form>

	{#if data.result}
		<Products data={data.result} query={data.query} />
	{:else if data.error}
		<p class="error">Error: {data.error}</p>
	{/if}
	<p>(To see error handling, try searching for "bad".)</p>
</main>

<style>
	main {
		max-width: var(--size-content-3);
		margin: 0 auto 1rem auto;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	label {
		display: block;
	}

	form {
		position: relative;
	}

	.spin {
		position: absolute;
		right: 4px;
		bottom: 2px;
	}

	.error {
		color: var(--red-7);
		font-weight: 700;
		font-size: var(--font-size-3);
	}
</style>
