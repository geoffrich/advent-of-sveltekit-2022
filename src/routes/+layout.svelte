<script lang="ts">
	import './app.css';
	import { page } from '$app/stores';
	import type { Page } from '@sveltejs/kit';

	$: day = getDay($page);

	function getDay(page: Page) {
		const segments = page.route.id?.split('/');
		return segments?.[segments.length - 1];
	}
</script>

<svelte:head>
	{#if day}
		<title>Advent of SvelteKit - Day {day}</title>
	{:else}
		<title>Advent of SvelteKit</title>
	{/if}
</svelte:head>

<div class="container">
	<header>
		<a href="/">Advent of <span class="svelte">SvelteKit</span> 2022</a>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>Solutions by <a href="https://geoffrich.net">Geoff Rich</a></p>
	</footer>
</div>

<style>
	header,
	footer {
		margin: 0 auto;
		max-width: var(--size-content-3);
	}

	header {
		font-size: var(--font-size-fluid-2);
		font-weight: var(--font-weight-7);
	}

	header a {
		color: black;
	}

	.svelte {
		color: var(--svelte);
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		justify-content: start;
	}

	main {
		max-width: var(--size-content-3);
		margin: 0 auto 1rem auto;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
