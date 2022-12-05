<script lang="ts">
	import './app.css';
	import { page } from '$app/stores';
	import type { Page } from '@sveltejs/kit';
	import { days } from './days';

	$: day = getDay($page);
	$: dayNum = day && +day;

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
		<a href="/" class="home">Advent of <span class="svelte">SvelteKit</span> 2022</a>
		{#if dayNum && dayNum > 0}
			<a href="/day/{dayNum - 1}" class="page prev">Prev</a>
		{/if}
		{#if (dayNum || dayNum === 0) && dayNum < days.length - 1}
			<a href="/day/{dayNum + 1}" class="page next">Next</a>
		{/if}
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

	footer {
		padding-bottom: 1rem;
	}

	header {
		display: grid;
		grid-template-columns: 2.5rem 1fr 2.5rem;
		grid-template-areas: 'prev home next';
		gap: 0.25rem;
		align-items: baseline;
		justify-content: space-around;
		width: 100%;
		text-align: center;
	}

	.home {
		font-size: var(--font-size-fluid-2);
		font-weight: var(--font-weight-7);
		grid-area: home;
	}

	.prev {
		margin-right: auto;
		grid-area: prev;
	}

	.next {
		margin-left: auto;
		grid-area: next;
	}

	.page {
		grid-row: 1;
	}

	@media screen and (max-width: 400px) {
		header {
			grid-template-columns: auto;
			grid-template-areas: 'home' 'page';
		}
		.home {
			grid-column: 1;
		}
		.page {
			grid-area: page;
		}
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
