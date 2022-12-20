<script lang="ts">
	import type { PageData } from './$types';
	import { page, navigating } from '$app/stores';
	import debounce from 'just-debounce-it';
	import Spinner from '$lib/Spinner.svelte';
	import { submitReplaceState } from '$lib/util';
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

	$: isLoading = $navigating?.to?.url.pathname === $page.url.pathname;
</script>

<h1>Gift Search Bar</h1>
<form bind:this={form} on:submit|preventDefault={submitReplaceState}>
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

<style>
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
