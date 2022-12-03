<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import type { PageData } from './$types';
	import Spinner from '$lib/Spinner.svelte';
	import animate from './animate';

	export let data: PageData;

	$: joke = data.joke;

	let open = false;

	async function handleSubmit(e: SubmitEvent) {
		const form = e.target as HTMLFormElement;
		await goto(form.action, { invalidateAll: true, replaceState: true });
		open = false; // close the summary
	}

	$: isLoading = $navigating?.to?.url.pathname === $page.url.pathname;
</script>

<h1>Christmas Joke Generator</h1>
<p class="setup">{joke.setup}</p>
<div class="wrapper">
	<details bind:open use:animate>
		<summary>Tell me!</summary>
		<div class="flex content">
			<p class="delivery">{joke.delivery}</p>
			<form on:submit|preventDefault={handleSubmit}>
				<button disabled={isLoading}
					>Another! 🎅
					{#if isLoading}<Spinner />{/if}</button
				>
			</form>
		</div>
	</details>
</div>

<style>
	p,
	details {
		font-size: var(--size-4);
	}

	button,
	summary {
		display: block;
		text-align: center;
		background-color: white;
		padding: var(--size-2) 0;
		border-radius: var(--radius-2);
		cursor: pointer;
		border: var(--border-size-3) solid var(--svelte);
	}

	*:focus-visible {
		--outline-color: black;
	}

	button {
		position: relative;
		--fill: var(--gray-3);
		--bg: black;
	}

	button :global(svg) {
		position: absolute;
		right: 6px;
		top: 0.5em;
	}

	/* Hide marker in Safari */
	summary::-webkit-details-marker {
		display: none;
	}

	form,
	button,
	details {
		width: 100%;
	}

	.setup,
	.delivery {
		background-color: var(--blue-3);
		padding: var(--size-2);
		border-radius: var(--radius-2);
		width: 75%;
	}

	.content {
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.setup {
		align-self: start;
	}

	.delivery {
		align-self: end;
	}

	.wrapper {
		/* This can't go on the details, otherwise we'll get a glitchy animation */
		padding: var(--size-2);
		background: var(--gray-3);
		border-radius: var(--radius-2);
		width: 100%;
	}
</style>
